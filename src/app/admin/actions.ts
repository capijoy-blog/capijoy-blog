'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import type { Locale } from '@/i18n/locales';
import { localizePath } from '@/lib/localePath';
import { slugify } from '@/lib/slugify';
import { createServerClient } from '@/lib/supabaseServer';

const COVER_IMAGE_BUCKET = 'public-post-images';
const SUPPORTED_LOCALES: Locale[] = ['pt', 'en', 'es'];

function isLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

function getStoragePathFromUrl(url: string | null | undefined): string | null {
  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);
    const marker = `/${COVER_IMAGE_BUCKET}/`;
    const markerIndex = parsedUrl.pathname.indexOf(marker);

    if (markerIndex === -1) {
      return null;
    }

    return decodeURIComponent(parsedUrl.pathname.slice(markerIndex + marker.length));
  } catch {
    return null;
  }
}

export async function deletePostBySlug(slug: string) {
  const normalizedSlug = slugify(slug ?? '');
  if (!normalizedSlug) {
    redirect('/admin');
  }

  const supabase = await createServerClient({ allowCookieWrite: true });

  const { data: posts, error: loadError } = await supabase
    .from('posts')
    .select('locale, cover_image_url')
    .eq('slug', normalizedSlug);

  if (loadError) {
    throw new Error(`Falha ao carregar post para exclusao: ${loadError.message}`);
  }

  if (!posts || posts.length === 0) {
    redirect('/admin');
  }

  const localesToRevalidate = new Set<Locale>();
  const coverUrls = new Set<string>();

  posts.forEach(post => {
    if (typeof post.locale === 'string' && isLocale(post.locale)) {
      localesToRevalidate.add(post.locale);
    } else {
      localesToRevalidate.add('pt');
    }

    if (typeof post.cover_image_url === 'string' && post.cover_image_url.trim().length > 0) {
      coverUrls.add(post.cover_image_url);
    }
  });

  const { error: deleteError } = await supabase
    .from('posts')
    .delete()
    .eq('slug', normalizedSlug);

  if (deleteError) {
    throw new Error(`Falha ao excluir post: ${deleteError.message}`);
  }

  const coverUrlList = Array.from(coverUrls);
  if (coverUrlList.length > 0) {
    const { data: references, error: referencesError } = await supabase
      .from('posts')
      .select('cover_image_url')
      .in('cover_image_url', coverUrlList);

    if (!referencesError) {
      const stillUsed = new Set(
        (references ?? [])
          .map(row => (typeof row.cover_image_url === 'string' ? row.cover_image_url : ''))
          .filter(Boolean)
      );

      const removablePaths = coverUrlList
        .filter(url => !stillUsed.has(url))
        .map(url => getStoragePathFromUrl(url))
        .filter((path): path is string => Boolean(path));

      if (removablePaths.length > 0) {
        await supabase.storage.from(COVER_IMAGE_BUCKET).remove(removablePaths);
      }
    }
  }

  revalidatePath('/admin');
  localesToRevalidate.forEach(locale => {
    const blogBasePath = localizePath(locale, '/blog');
    revalidatePath(blogBasePath);
    revalidatePath(`${blogBasePath}/${normalizedSlug}`);
  });

  redirect('/admin');
}

