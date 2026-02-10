import Image from 'next/image';
import Link from 'next/link';
import { FaApple, FaArrowRight, FaBookOpen, FaPlay, FaSpotify, FaYoutube } from 'react-icons/fa6';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Accordion from '@/components/site/Accordion';
import HomePosts from '@/components/site/HomePosts';
import SectionSeparator from '@/components/site/SectionSeparator';
import TikTokCarousel, { type TikTokVideo } from '@/components/site/TikTokCarousel';
import { getExperienceTopics } from '@/data/experiences';
import { HOME_COPY } from '@/data/homeCopy';
import type { Locale } from '@/i18n/locales';
import { localizePath } from '@/lib/localePath';
import { absoluteUrl } from '@/lib/urls';

type TikTokFallbackKey = 'basta' | 'spotify' | 'inspire' | 'hope';

interface TikTokOEmbedResponse {
  title?: string;
  thumbnail_url?: string;
}

async function getTikTokVideos(fallbacks: Record<TikTokFallbackKey, string>): Promise<TikTokVideo[]> {
  const sources = [
    {
      url: 'https://www.tiktok.com/@capijoyoficial/video/7554336621676563723',
      lang: 'pt-BR',
      fallbackKey: 'basta' as const
    },
    {
      url: 'https://www.tiktok.com/@capijoyoficial/video/7548814698758540549',
      lang: 'pt-BR',
      fallbackKey: 'spotify' as const
    },
    {
      url: 'https://www.tiktok.com/@capijoyoficial/video/7546906338732068152',
      lang: 'pt-BR',
      fallbackKey: 'inspire' as const
    },
    {
      url: 'https://www.tiktok.com/@capijoyoficial/video/7161962857809054982',
      lang: 'pt-BR',
      fallbackKey: 'hope' as const
    }
  ] as const;

  try {
    const results = await Promise.all(
      sources.map(async source => {
        const fallbackTitle = fallbacks[source.fallbackKey] ?? source.fallbackKey;
        try {
          const response = await fetch(
            `https://www.tiktok.com/oembed?url=${encodeURIComponent(source.url)}`,
            { next: { revalidate: 3600 } }
          );

          if (!response.ok) {
            return { url: source.url, lang: source.lang, title: fallbackTitle };
          }

          const data = (await response.json()) as TikTokOEmbedResponse;

          return {
            url: source.url,
            lang: source.lang,
            title: typeof data.title === 'string' ? data.title : fallbackTitle,
            cover: typeof data.thumbnail_url === 'string' ? data.thumbnail_url : undefined
          };
        } catch {
          return { url: source.url, lang: source.lang, title: fallbackTitle };
        }
      })
    );

    return results;
  } catch {
    return sources.map(source => ({
      url: source.url,
      lang: source.lang,
      title: fallbacks[source.fallbackKey] ?? source.fallbackKey
    }));
  }
}

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const home = HOME_COPY[locale] ?? HOME_COPY.pt;
  const path = localizePath(locale, '/');
  const url = absoluteUrl(path);

  return {
    title: home.metadata.title,
    description: home.metadata.description,
    alternates: {
      canonical: url,
      languages: {
        'pt-BR': absoluteUrl(localizePath('pt', '/')),
        'en-US': absoluteUrl(localizePath('en', '/')),
        'es-ES': absoluteUrl(localizePath('es', '/'))
      }
    },
    openGraph: {
      title: home.metadata.ogTitle,
      description: home.metadata.ogDescription,
      url,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: home.metadata.twitterTitle,
      description: home.metadata.twitterDescription
    }
  };
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const home = HOME_COPY[locale] ?? HOME_COPY.pt;
  const tiktokT = await getTranslations({ locale, namespace: 'tiktok' });
  const tMusic = await getTranslations({ locale, namespace: 'musicas' });
  const topics = getExperienceTopics(locale);

  const featureCards = [
    {
      title: 'BASTA',
      tag: home.music.cards.basta.tag,
      description: home.music.cards.basta.description,
      image: '/assets/capa_basta.webp',
      primary: {
        label: home.music.cards.basta.primary,
        href: 'https://www.youtube.com/watch?v=6EVY-Ef8GRY',
        Icon: FaYoutube
      },
      secondary: {
        label: home.music.cards.basta.secondary,
        href: '/musicas#basta'
      }
    },
    {
      title: 'ALELUIA',
      tag: home.music.cards.aleluia.tag,
      description: home.music.cards.aleluia.description,
      image: '/assets/capi-joy-spotify.webp',
      primary: {
        label: home.music.cards.aleluia.primary,
        href: 'https://open.spotify.com/intl-pt/artist/6l2XVPCSpXi3oKheB3UvKI',
        Icon: FaSpotify
      },
      secondary: {
        label: home.music.cards.aleluia.secondary,
        href: '/musicas#aleluia'
      }
    },
    {
      title: home.music.cards.book.title,
      tag: home.music.cards.book.tag,
      description: home.music.cards.book.description,
      image: '/assets/banner-capi-joy-livro.webp',
      primary: {
        label: home.music.cards.book.primary,
        href: '/livro',
        Icon: FaBookOpen
      },
      secondary: {
        label: home.music.cards.book.secondary,
        href: '/contato#captura'
      }
    },
    {
      title: tMusic('appleCard.title'),
      tag: tMusic('appleCard.tag'),
      description: tMusic('appleCard.description'),
      image: '/assets/capi-joy-apple-music.webp',
      primary: {
        label: tMusic('appleCard.cta'),
        href: 'https://music.apple.com/br/artist/cap%C3%AD-joy/1831439555',
        Icon: FaApple
      },
      secondary: {
        label: tMusic('appleCard.secondary'),
        href: '/musicas'
      }
    }
  ] as const;

  const fallbackTitles: Record<TikTokFallbackKey, string> = {
    basta: tiktokT('fallback.basta'),
    spotify: tiktokT('fallback.spotify'),
    inspire: tiktokT('fallback.inspire'),
    hope: tiktokT('fallback.hope')
  };
  const tiktokVideos = await getTikTokVideos(fallbackTitles);

  return (
    <>
      <section
        id="topo"
        className="hero-animated-bg relative isolate flex min-h-[85vh] w-full flex-row flex-wrap items-start justify-between overflow-hidden pt-12 md:flex-col md:flex-nowrap md:justify-center md:pt-0 lg:flex-row lg:items-center lg:justify-center"
      >
        <div className="relative z-10 flex w-[60%] items-center justify-start px-4 py-2 sm:px-6 md:w-full lg:w-1/2 lg:justify-start lg:pl-32 lg:py-20">
          <div className="max-w-xl space-y-8">
            <h1 className="text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
              {home.hero.headingPrefix} <br /> <span className="italic">{home.hero.headingEmphasis}</span>
              {home.hero.headingSuffix}
            </h1>
            <p className="hidden max-w-lg text-lg leading-relaxed text-gray-300 md:block">{home.hero.description}</p>
            <div className="hidden flex-wrap items-center gap-4 md:flex">
              <Link
                href="https://www.youtube-nocookie.com/watch?v=6EVY-Ef8GRY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-black shadow-xl shadow-white/10 transition hover:scale-105 hover:bg-cj-textSoft hover:shadow-2xl"
              >
                <FaPlay aria-hidden /> {home.hero.listenBasta}
              </Link>
              <Link
                href={localizePath(locale, '/musicas#aleluia')}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                {home.hero.listenAleluia}
              </Link>
            </div>
            <div className="hidden pt-2 md:block">
              <Link
                href={localizePath(locale, '/livro')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-cj-accent underline decoration-white/20 underline-offset-8 transition hover:text-white"
              >
                <FaBookOpen aria-hidden /> {home.hero.bookCta}
              </Link>
            </div>
          </div>
        </div>

        <div className="relative h-[40vh] w-[38%] md:order-last md:h-[50vh] md:w-full lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2 lg:order-none">
          <Image
            src="/assets/hero-image-capi-joy.webp"
            alt={home.hero.imageAlt}
            fill
            priority
            className="object-contain object-top lg:object-bottom"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-x-0 bottom-0 h-48" />
        </div>

        <div className="relative z-10 flex w-full flex-col items-start gap-6 px-4 pb-12 md:hidden">
          <p className="max-w-lg text-lg leading-relaxed text-gray-300">{home.hero.description}</p>
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="https://www.youtube-nocookie.com/watch?v=6EVY-Ef8GRY"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-black shadow-xl shadow-white/10 transition hover:scale-105 hover:bg-cj-textSoft hover:shadow-2xl sm:w-auto"
            >
              <FaPlay aria-hidden /> {home.hero.listenBasta}
            </Link>
            <Link
              href={localizePath(locale, '/musicas#aleluia')}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 sm:w-auto"
            >
              {home.hero.listenAleluia}
            </Link>
          </div>
          <div className="pt-2">
            <Link
              href={localizePath(locale, '/livro')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-cj-accent underline decoration-white/20 underline-offset-8 transition hover:text-white"
            >
              <FaBookOpen aria-hidden /> {home.hero.bookCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {home.pillars.map(pillar => (
            <div
              key={pillar.title}
              className="section-card rounded-2xl bg-zinc-900 px-4 py-5 transition-colors hover:bg-zinc-800"
            >
              <p className="text-xs uppercase tracking-[0.15em] text-cj-accent">{pillar.title}</p>
              <p className="mt-2 text-sm text-cj-textMuted">{pillar.text}</p>
            </div>
          ))}
        </div>
      </section>

      <SectionSeparator variant="music" />

      <section id="musicas" className="mx-auto w-full max-w-7xl space-y-8 px-4 py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">{home.music.eyebrow}</p>
            <h2 className="text-3xl font-semibold text-cj-text">{home.music.title}</h2>
            <p className="max-w-2xl text-sm text-muted">{home.music.description}</p>
          </div>
          <Link
            href={localizePath(locale, '/musicas')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cj-accent underline underline-offset-8"
          >
            {home.music.viewDiscography}
            <FaArrowRight aria-hidden />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {featureCards.map(card => (
            <article key={card.title} className="section-card flex flex-col overflow-hidden rounded-3xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-cj-accent">{card.tag}</p>
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="text-sm text-cj-textMuted">{card.description}</p>
                <div className="mt-auto flex flex-wrap items-center gap-3">
                  {(() => {
                    const isExternal = card.primary.href.startsWith('http');
                    const primaryHref = isExternal ? card.primary.href : localizePath(locale, card.primary.href);
                    return (
                      <Link
                        href={primaryHref}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-cj-textSoft"
                      >
                        <card.primary.Icon aria-hidden />
                        {card.primary.label}
                      </Link>
                    );
                  })()}
                  <Link
                    href={localizePath(locale, card.secondary.href)}
                    className="text-sm font-semibold underline decoration-cj-accent underline-offset-8 transition hover:text-cj-accent"
                  >
                    {card.secondary.label}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SectionSeparator variant="life" className="opacity-60" />

      <section
        id="sobre"
        className="mx-auto w-full max-w-7xl gap-10 px-4 py-10 lg:grid lg:grid-cols-[1fr_1.2fr] lg:items-center"
      >
        <div className="relative aspect-[3/4]">
          <Image
            src="/assets/retrato-capi-joy.webp"
            alt={home.about.imageAlt}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority={false}
          />
        </div>
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">{home.about.eyebrow}</p>
          <h2 className="text-3xl font-semibold text-cj-text">{home.about.title}</h2>
          <p className="text-base text-cj-textMuted">{home.about.description}</p>
          <p className="text-base text-muted">{home.about.quote}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={localizePath(locale, '/sobre')} className="surface-button rounded-full px-5 py-3 text-sm font-semibold">
              {home.about.bioCta}
            </Link>
            <Link
              href={localizePath(locale, '/projetos')}
              className="inline-flex items-center gap-2 text-sm font-semibold underline decoration-cj-accent underline-offset-8"
            >
              {home.about.projectsCta}
              <FaArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section id="conferencias" className="mx-auto w-full max-w-7xl space-y-6 px-4 py-10">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-soft)]">{home.experiences.eyebrow}</p>
          <h2 className="text-3xl font-semibold text-[var(--page-text)]">{home.experiences.title}</h2>
          <p className="max-w-3xl text-sm text-muted">{home.experiences.description}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {topics.map(topic => (
            <div key={topic.slug} className="section-card flex flex-col gap-2 rounded-2xl px-5 py-5">
              <h3 className="text-lg font-semibold leading-tight text-cj-text">{topic.title}</h3>
              {topic.theme && <p className="text-xs uppercase tracking-wider text-cj-accent">{topic.theme}</p>}
              <p className="mt-2 text-sm leading-relaxed text-cj-textMuted">{topic.shortSummary}</p>
            </div>
          ))}
        </div>
      </section>

      <SectionSeparator variant="book" className="text-cj-accent" />

      <section
        id="livro"
        className="mx-auto w-full max-w-7xl gap-10 px-4 py-10 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
      >
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">{home.book.eyebrow}</p>
          <h2 className="text-3xl font-semibold text-cj-text">{home.book.title}</h2>
          <p className="text-base text-cj-textMuted">{home.book.description}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={localizePath(locale, '/livro')}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-cj-textSoft"
            >
              <FaBookOpen aria-hidden />
              {home.book.detailsCta}
            </Link>
            <Link href={localizePath(locale, '/contato#captura')} className="surface-button rounded-full px-5 py-3 text-sm font-semibold">
              {home.book.excerptCta}
            </Link>
          </div>
        </div>
        <div className="section-card rounded-3xl p-6">
          <div className="flex items-start gap-4">
            <div className="relative h-28 w-20 flex-shrink-0 rotate-2 overflow-hidden rounded-lg shadow-lg transition-transform hover:rotate-0">
              <Image
                src="/assets/capa-de-livro1.webp"
                alt={home.book.coverAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80px, 120px"
              />
            </div>
            <p className="text-sm font-light leading-relaxed text-muted">{home.book.blurb}</p>
          </div>
        </div>
      </section>

      <section id="blog" className="mx-auto w-full max-w-7xl space-y-4 px-4 py-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">{home.blog.title}</h2>
            <p className="text-sm text-cj-textMuted">{home.blog.description}</p>
          </div>
          <Link
            href={localizePath(locale, '/blog')}
            className="inline-flex items-center gap-2 text-sm font-semibold underline decoration-cj-accent underline-offset-8"
          >
            {home.blog.viewAll}
            <FaArrowRight aria-hidden />
          </Link>
        </div>
        <HomePosts locale={locale} />
      </section>

      <SectionSeparator variant="social" className="opacity-40" />

      <section id="social" className="mx-auto w-full max-w-7xl space-y-4 px-4 py-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">{home.social.eyebrow}</p>
            <h2 className="text-3xl font-semibold">{home.social.title}</h2>
            <p className="text-sm text-muted">{home.social.description}</p>
          </div>
          <Link
            href={localizePath(locale, '/ia')}
            className="inline-flex items-center gap-2 text-sm font-semibold underline decoration-cj-accent underline-offset-8"
          >
            {home.social.aiPageCta}
            <FaArrowRight aria-hidden />
          </Link>
        </div>
        <TikTokCarousel videos={tiktokVideos} />
      </section>

      <section id="contato" className="mx-auto w-full max-w-7xl px-4 py-14">
        <div className="section-card grid gap-8 rounded-3xl p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">{home.contact.eyebrow}</p>
            <h3 className="text-2xl font-semibold">{home.contact.title}</h3>
            <p className="text-sm text-cj-textMuted">{home.contact.description}</p>
            <div className="mt-4">
              <Image
                src="/assets/oi-image-capi-joy.webp"
                alt={home.contact.imageAlt}
                width={170}
                height={170}
                className="object-contain"
              />
            </div>
          </div>
          <form
            id="captura"
            action="mailto:contato@capijoy.com.br?subject=Contato%20via%20site%20Capi%20Joy"
            method="POST"
            encType="text/plain"
            className="grid gap-3"
          >
            <label className="flex flex-col gap-1 text-sm font-medium">
              {home.contact.nameLabel}
              <input
                type="text"
                name="name"
                required
                placeholder={home.contact.namePlaceholder}
                className="input-surface rounded-xl px-4 py-3 text-sm"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium">
              {home.contact.emailLabel}
              <input
                type="email"
                name="email"
                required
                placeholder={home.contact.emailPlaceholder}
                className="input-surface rounded-xl px-4 py-3 text-sm"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium">
              {home.contact.whatsappLabel}
              <input
                type="tel"
                name="whatsapp"
                placeholder={home.contact.whatsappPlaceholder}
                className="input-surface rounded-xl px-4 py-3 text-sm"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium">
              {home.contact.messageLabel}
              <textarea
                name="message"
                rows={3}
                placeholder={home.contact.messagePlaceholder}
                className="input-surface rounded-xl px-4 py-3 text-sm"
                required
              />
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-cj-textSoft"
              >
                {home.contact.submit}
              </button>
              <Link
                href="https://wa.me/5537998765452?text=Ol%C3%A1%2C+vim+pelo+site+Cap%C3%AD+Joy+e+quero+um+trecho+do+livro+ou+falar+sobre+parceria."
                target="_blank"
                rel="noopener noreferrer"
                className="surface-button rounded-full px-5 py-3 text-sm font-semibold"
              >
                {home.contact.whatsappCta}
              </Link>
            </div>
          </form>
        </div>
      </section>

      <section id="faq" className="mx-auto w-full max-w-7xl space-y-4 px-4 pb-16 pt-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">{home.faq.eyebrow}</p>
          <h2 className="text-3xl font-semibold">{home.faq.title}</h2>
          <p className="text-sm text-cj-textMuted">{home.faq.description}</p>
        </div>
        <div className="space-y-3">
          {home.faq.items.map(item => (
            <Accordion key={item.q} title={item.q}>
              <p>{item.a}</p>
            </Accordion>
          ))}
        </div>
      </section>
    </>
  );
}
