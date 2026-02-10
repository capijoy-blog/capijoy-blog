/// <reference path="../types.d.ts" />
import type { Handler } from "https://deno.land/std@0.168.0/http/server.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.44.4";

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const SUPPORTED_LOCALES = ['pt', 'en', 'es'] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

const translate = async (text: string, lang: SupportedLocale, sourceLang: SupportedLocale): Promise<string> => {
  if (!text) return "";
  const apiKey = Deno.env.get("GOOGLE_API_KEY");
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY is not set");
  }
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: text,
      target: lang,
      source: sourceLang,
    }),
  });
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to translate text: ${response.status} ${response.statusText} - ${errorBody}`);
  }
  const json = await response.json();
  return json.data.translations[0].translatedText;
};

const handler: Handler = async (req) => {
  const payload = await req.json() as { record?: Record<string, unknown> };
  const post = payload.record as {
    locale?: string;
    title?: string;
    slug?: string;
    original_slug?: string;
    excerpt?: string;
    content_html?: string;
    [key: string]: unknown;
  };

  if (!post) {
    return new Response(JSON.stringify({ message: 'Missing post data' }), { status: 400 });
  }

  const sourceLocale =
    typeof post.locale === 'string' && SUPPORTED_LOCALES.includes(post.locale as SupportedLocale)
      ? (post.locale as SupportedLocale)
      : null;

  if (!sourceLocale) {
    return new Response(JSON.stringify({ message: 'Unsupported post locale for translation' }), { status: 400 });
  }

  if (!post.slug || typeof post.slug !== 'string') {
    return new Response(JSON.stringify({ message: 'Post slug is required for translation' }), { status: 400 });
  }

  const slug = post.slug;
  const originalSlug =
    typeof post.original_slug === 'string' && post.original_slug.trim().length > 0
      ? post.original_slug
      : slug;

  const targetLanguages = SUPPORTED_LOCALES.filter(locale => locale !== sourceLocale);
  const baseStatus = typeof post.status === 'string' && post.status.toLowerCase() === 'published' ? 'published' : 'draft';
  const basePublishedAt =
    typeof post.published_at === 'string' && post.published_at ? post.published_at : null;
  const timestampNow = new Date().toISOString();
  const candidateSlugs = Array.from(new Set([slug, originalSlug]));

  try {
    for (const lang of targetLanguages) {
      // Add a delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 200));

      const [translatedTitle, translatedExcerpt, translatedContent] = await Promise.all([
        translate(post.title ?? '', lang, sourceLocale),
        translate(post.excerpt ?? '', lang, sourceLocale),
        translate(post.content_html ?? '', lang, sourceLocale)
      ]);

      const normalizedExcerpt = translatedExcerpt ? translatedExcerpt : null;
      const normalizedStatus = baseStatus === 'published' ? 'published' : 'draft';
      const normalizedPublishedAt = normalizedStatus === 'published' ? (basePublishedAt ?? timestampNow) : null;
      const coverImageInput = post.cover_image_url as string | null | undefined;
      let normalizedCoverImage: string | null | undefined;

      if (coverImageInput === undefined) {
        normalizedCoverImage = undefined;
      } else if (coverImageInput === null) {
        normalizedCoverImage = null;
      } else {
        normalizedCoverImage = coverImageInput;
      }

      const basePayload = {
        slug,
        title: translatedTitle,
        excerpt: normalizedExcerpt,
        content_html: translatedContent,
        status: normalizedStatus,
        published_at: normalizedPublishedAt,
        updated_at: timestampNow
      } as Record<string, unknown>;

      if (normalizedCoverImage !== undefined) {
        basePayload.cover_image_url = normalizedCoverImage;
      }

      let didPersistTranslation = false;
      const upsertPayload = {
        locale: lang,
        ...basePayload
      };

      if (!('cover_image_url' in upsertPayload)) {
        upsertPayload.cover_image_url = normalizedCoverImage ?? null;
      }

      const { error: upsertError } = await supabaseAdmin
        .from('posts')
        .upsert(upsertPayload, {
          onConflict: 'slug,locale'
        });

      if (!upsertError) {
        didPersistTranslation = true;
      } else {
        console.error(`Failed to upsert translated post for ${lang}, trying fallback flow:`, upsertError);

        const { data: existingPosts, error: fetchError } = await supabaseAdmin
          .from('posts')
          .select('id, slug')
          .eq('locale', lang)
          .in('slug', candidateSlugs)
          .order('updated_at', { ascending: false });

        if (fetchError) {
          console.error(`Failed to check existing translated post for ${lang}:`, fetchError);
          continue;
        }

        const preferredPost =
          (existingPosts ?? []).find(candidate => candidate.slug === slug) ??
          (existingPosts ?? []).find(candidate => candidate.slug === originalSlug) ??
          null;

        if (preferredPost) {
          const { error: updateError } = await supabaseAdmin
            .from('posts')
            .update(basePayload)
            .eq('id', preferredPost.id);

          if (updateError) {
            console.error(`Failed to update translated post for ${lang}:`, updateError);
            continue;
          }

          const duplicateIds = (existingPosts ?? [])
            .filter(candidate => candidate.id !== preferredPost.id)
            .map(candidate => candidate.id);

          if (duplicateIds.length > 0) {
            const { error: duplicateDeleteError } = await supabaseAdmin
              .from('posts')
              .delete()
              .in('id', duplicateIds);

            if (duplicateDeleteError) {
              console.error(`Failed to clean duplicate translated posts for ${lang}:`, duplicateDeleteError);
            }
          }

          didPersistTranslation = true;
        } else {
          const insertPayload = {
            locale: lang,
            slug,
            ...basePayload
          } as Record<string, unknown>;

          if (!('cover_image_url' in insertPayload)) {
            insertPayload.cover_image_url = normalizedCoverImage ?? null;
          }

          const { error: insertError } = await supabaseAdmin
            .from('posts')
            .insert(insertPayload);

          if (insertError) {
            console.error(`Failed to insert translated post for ${lang}:`, insertError);
            continue;
          }

          didPersistTranslation = true;
        }
      }

      if (didPersistTranslation && originalSlug !== slug) {
        const { error: oldSlugCleanupError } = await supabaseAdmin
          .from('posts')
          .delete()
          .eq('locale', lang)
          .eq('slug', originalSlug);

        if (oldSlugCleanupError) {
          console.error(`Failed to clean old slug translation for ${lang}:`, oldSlugCleanupError);
        }
      }
    }

    return new Response(JSON.stringify({ message: 'Post translated successfully' }), { status: 200 });

  } catch (error) {
    console.error('Translation process failed:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ message }), { status: 500 });
  }
};

serve(handler);
