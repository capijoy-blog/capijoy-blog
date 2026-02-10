import Image from 'next/image';
import Link from 'next/link';
import { FaApple } from 'react-icons/fa6';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import VideoPlayer from '@/components/site/VideoPlayer';
import type { Locale } from '@/i18n/locales';
import { localizePath } from '@/lib/localePath';
import { absoluteUrl } from '@/lib/urls';

type Params = { locale: Locale };

type MusicPageCopy = {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  header: {
    eyebrow: string;
    title: string;
    description: string;
  };
  ctas: {
    spotify: string;
    youtube: string;
  };
  appleAlt: string;
  nextReleases: {
    eyebrow: string;
    items: [string, string, string, string];
    bookingCta: string;
    pressCta: string;
  };
};

const MUSIC_PAGE_COPY: Record<Locale, MusicPageCopy> = {
  pt: {
    meta: {
      title: 'Musicas de Capi Joy - BASTA, ALELUIA e novos lancamentos',
      description:
        'Ouca as musicas de Capi Joy: BASTA, ALELUIA e projetos futuros. Sons de verdade, alma e fe, disponiveis no Spotify e YouTube.',
      ogTitle: 'Discografia Capi Joy',
      ogDescription: 'Singles, letras e mensagens centrais de Capi Joy.'
    },
    header: {
      eyebrow: 'Discografia',
      title: 'Musicas de Capi Joy',
      description:
        'Cancoes que nascem da alma. Verdadeiras, intensas e cheias de proposito. Cada musica carrega uma historia, uma dor, um recomeco e uma mensagem.'
    },
    ctas: {
      spotify: 'Ouvir no Spotify',
      youtube: 'YouTube'
    },
    appleAlt: 'Capi Joy na Apple Music',
    nextReleases: {
      eyebrow: 'Proximos lancamentos',
      items: [
        'Versao em ingles de BASTA em producao.',
        'Novas reflexoes musicadas e conteudos exclusivos.',
        'Materiais para shows, conferencias e encontros.',
        'Letras completas serao publicadas aqui assim que finalizadas.'
      ],
      bookingCta: 'Chamar para shows e agenda',
      pressCta: 'Press kit atualizado'
    }
  },
  en: {
    meta: {
      title: 'Capi Joy Music - BASTA, ALELUIA and new releases',
      description:
        'Listen to Capi Joy songs: BASTA, ALELUIA and upcoming projects. Truthful songs about soul, faith and freedom on Spotify and YouTube.',
      ogTitle: 'Capi Joy discography',
      ogDescription: 'Singles, lyrics and core messages from Capi Joy.'
    },
    header: {
      eyebrow: 'Discography',
      title: 'Capi Joy Songs',
      description:
        'Songs born from the soul. Honest, intense and full of purpose. Each track carries a story, a wound, a restart and a message.'
    },
    ctas: {
      spotify: 'Listen on Spotify',
      youtube: 'YouTube'
    },
    appleAlt: 'Capi Joy on Apple Music',
    nextReleases: {
      eyebrow: 'Next releases',
      items: [
        'English version of BASTA in production.',
        'New musical reflections and exclusive content.',
        'Materials for concerts, conferences and gatherings.',
        'Full lyrics will be published here as soon as they are finished.'
      ],
      bookingCta: 'Book for events and schedule',
      pressCta: 'Updated press kit'
    }
  },
  es: {
    meta: {
      title: 'Musica de Capi Joy - BASTA, ALELUIA y nuevos lanzamientos',
      description:
        'Escucha las canciones de Capi Joy: BASTA, ALELUIA y proyectos futuros. Sonidos de verdad, alma y fe en Spotify y YouTube.',
      ogTitle: 'Discografia de Capi Joy',
      ogDescription: 'Singles, letras y mensajes centrales de Capi Joy.'
    },
    header: {
      eyebrow: 'Discografia',
      title: 'Canciones de Capi Joy',
      description:
        'Canciones que nacen del alma. Verdaderas, intensas y llenas de proposito. Cada cancion trae una historia, una herida, un recomienzo y un mensaje.'
    },
    ctas: {
      spotify: 'Escuchar en Spotify',
      youtube: 'YouTube'
    },
    appleAlt: 'Capi Joy en Apple Music',
    nextReleases: {
      eyebrow: 'Proximos lanzamientos',
      items: [
        'Version en ingles de BASTA en produccion.',
        'Nuevas reflexiones musicalizadas y contenido exclusivo.',
        'Materiales para shows, conferencias y encuentros.',
        'Las letras completas se publicaran aqui cuando esten listas.'
      ],
      bookingCta: 'Invitar para shows y agenda',
      pressCta: 'Press kit actualizado'
    }
  }
};

const SONGS = [
  {
    id: 'basta',
    title: 'BASTA',
    video: 'https://www.youtube.com/watch?v=6EVY-Ef8GRY',
    cover: '/assets/capa_basta.webp',
    spotifyEmbed: 'https://open.spotify.com/embed/artist/6l2XVPCSpXi3oKheB3UvKI?utm_source=generator'
  },
  {
    id: 'aleluia',
    title: 'ALELUIA',
    video: null,
    spotifyEmbed: 'https://open.spotify.com/embed/artist/6l2XVPCSpXi3oKheB3UvKI?utm_source=generator'
  }
] as const;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = MUSIC_PAGE_COPY[locale] ?? MUSIC_PAGE_COPY.pt;
  const path = localizePath(locale, '/musicas');
  const url = absoluteUrl(path);

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: copy.meta.ogTitle,
      description: copy.meta.ogDescription,
      url
    }
  };
}

export default async function MusicasPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const copy = MUSIC_PAGE_COPY[locale] ?? MUSIC_PAGE_COPY.pt;
  const t = await getTranslations({ locale, namespace: 'musicas' });

  return (
    <div className="mx-auto w-full max-w-5xl space-y-10 px-4 py-12">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">{copy.header.eyebrow}</p>
        <h1 className="text-3xl font-semibold">{copy.header.title}</h1>
        <p className="max-w-3xl text-base text-cj-textMuted">{copy.header.description}</p>
      </header>

      <div className="space-y-8">
        {SONGS.map(song => {
          const tag = t(`songs.${song.id}.tag`);
          const description = t(`songs.${song.id}.description`);
          const lyrics = t(`songs.${song.id}.lyrics`);

          return (
            <article key={song.id} id={song.id} className="section-card overflow-hidden rounded-3xl">
              <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-cj-accent">{tag}</p>
                  <h2 className="text-2xl font-semibold">{song.title}</h2>
                  <p className="text-sm text-cj-textMuted">{description}</p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="https://open.spotify.com/intl-pt/artist/6l2XVPCSpXi3oKheB3UvKI"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-cj-textSoft"
                    >
                      {copy.ctas.spotify}
                    </Link>
                    <Link
                      href="https://www.youtube.com/@dicapijoy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="surface-button rounded-full px-4 py-2 text-sm font-semibold"
                    >
                      {copy.ctas.youtube}
                    </Link>
                  </div>
                  {lyrics.trim() && (
                    <div className="mt-4 border-t border-cj-border pt-4">
                      <div className="space-y-4 text-sm leading-relaxed text-cj-textMuted">
                        {lyrics.split('\n').map((line, i) => (line.trim() ? <p key={i}>{line}</p> : <br key={i} />))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  {song.video ? (
                    <VideoPlayer videoUrl={song.video} coverImage={song.cover} title={`${song.title} - YouTube`} />
                  ) : null}
                  <div className="overflow-hidden rounded-2xl">
                    <iframe
                      src={song.spotifyEmbed}
                      width="100%"
                      height="200"
                      loading="lazy"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      title={`${song.title} - Spotify`}
                    />
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        <article className="section-card overflow-hidden rounded-3xl">
          <div className="grid gap-8 p-6 md:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.18em] text-cj-accent">{t('appleCard.tag')}</p>
              <h2 className="text-2xl font-semibold">{t('appleCard.title')}</h2>
              <p className="text-base text-cj-textMuted">{t('appleCard.description')}</p>
              <Link
                href="https://music.apple.com/br/artist/cap%C3%AD-joy/1831439555"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-cj-textSoft"
              >
                <FaApple className="text-xl" />
                {t('appleCard.cta')}
              </Link>
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image src="/assets/capi-joy-apple-music.webp" alt={copy.appleAlt} fill className="object-cover" />
            </div>
          </div>
        </article>
      </div>

      <section className="section-card space-y-4 rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">{copy.nextReleases.eyebrow}</p>
        <ul className="grid gap-3 md:grid-cols-2">
          {copy.nextReleases.items.map(item => (
            <li key={item} className="rounded-2xl bg-white/5 p-4 text-sm text-cj-textMuted">
              - {item}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <Link
            href={localizePath(locale, '/contato')}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-cj-textSoft"
          >
            {copy.nextReleases.bookingCta}
          </Link>
          <Link href={localizePath(locale, '/press-kit')} className="text-sm font-semibold underline decoration-cj-accent underline-offset-8">
            {copy.nextReleases.pressCta}
          </Link>
        </div>
      </section>
    </div>
  );
}