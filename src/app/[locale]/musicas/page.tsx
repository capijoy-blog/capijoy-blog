import Link from 'next/link';
import type { Metadata } from 'next';

import Accordion from '@/components/site/Accordion';
import type { Locale } from '@/i18n/locales';
import { absoluteUrl } from '@/lib/urls';

type Params = { locale: Locale };

const SONGS = [
  {
    id: 'basta',
    title: 'BASTA',
    tag: 'Protesto espiritual',
    description:
      'Grito de alma, coragem e mudança. Um chamado para despertar e retornar aos princípios que curam.',
    video: 'https://www.youtube-nocookie.com/embed/6EVY-Ef8GRY',
    spotifyEmbed: 'https://open.spotify.com/embed/artist/6l2XVPCSpXi3oKheB3UvKI?utm_source=generator',
    lyrics: [
      'Letra oficial disponível no press kit. Use este espaço para publicar a versão final sem abrir PDF direto.',
      'Mensagem central: basta de tudo que rouba a alma. Liberdade e paz são destino.'
    ]
  },
  {
    id: 'aleluia',
    title: 'ALELUIA',
    tag: 'Louvor íntimo',
    description:
      'Uma canção espiritual, leve e verdadeira para momentos de fé e descanso. Perfeita para quem precisa respirar.',
    video: null,
    spotifyEmbed: 'https://open.spotify.com/embed/artist/6l2XVPCSpXi3oKheB3UvKI?utm_source=generator',
    lyrics: [
      'Letra oficial em preparação. Publicar quando estiver finalizada para manter a página sempre atualizada.',
      'Enquanto isso, mantenha a mensagem: fé acessível, luz em meio à noite e gratidão que acalma.'
    ]
  }
] as const;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const path = `/${locale}/musicas`;
  const url = absoluteUrl(path);

  return {
    title: 'Músicas de Capí Joy — BASTA, ALELUIA e novos lançamentos',
    description: 'Ouça as músicas de Capí Joy: BASTA, ALELUIA e projetos futuros. Sons de verdade, alma e fé, disponíveis no Spotify e YouTube.',
    alternates: {
      canonical: url
    },
    openGraph: {
      title: 'Discografia Capí Joy',
      description: 'Singles, letras e mensagens centrais de Capí Joy.',
      url
    }
  };
}

export default async function MusicasPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-10 px-4 py-12">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">Discografia</p>
        <h1 className="text-3xl font-semibold">Músicas de Capí Joy</h1>
        <p className="max-w-3xl text-base text-cj-textMuted">
          Canções que nascem da alma. Verdadeiras, intensas e cheias de propósito. Cada música carrega uma história, uma
          dor, um recomeço e uma mensagem.
        </p>
      </header>

      <div className="space-y-8">
        {SONGS.map(song => (
          <article key={song.id} id={song.id} className="section-card overflow-hidden rounded-3xl">
            <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.18em] text-cj-accent">{song.tag}</p>
                <h2 className="text-2xl font-semibold">{song.title}</h2>
                <p className="text-sm text-cj-textMuted">{song.description}</p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="https://open.spotify.com/intl-pt/artist/6l2XVPCSpXi3oKheB3UvKI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-cj-textSoft"
                  >
                    Ouvir no Spotify
                  </Link>
                  <Link
                    href="https://www.youtube.com/@dicapijoy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="surface-button rounded-full px-4 py-2 text-sm font-semibold"
                  >
                    YouTube
                  </Link>
                </div>
                <Accordion title="Ver letra / conceito" defaultOpen={song.id === 'basta'}>
                  {song.lyrics.map(line => (
                    <p key={line}>{line}</p>
                  ))}
                </Accordion>
              </div>
              <div className="space-y-4">
                {song.video ? (
                  <div className="overflow-hidden rounded-2xl">
                    <iframe
                      width="100%"
                      height="280"
                      src={song.video}
                      title={`${song.title} - YouTube`}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
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
        ))}
      </div>

      <section className="section-card space-y-4 rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">Próximos lançamentos</p>
        <ul className="grid gap-3 md:grid-cols-2">
          <li className="rounded-2xl bg-white/5 p-4 text-sm text-cj-textMuted">
            • Versão em inglês de “BASTA” em produção.
          </li>
          <li className="rounded-2xl bg-white/5 p-4 text-sm text-cj-textMuted">• Novas reflexões musicadas e conteúdos exclusivos.</li>
          <li className="rounded-2xl bg-white/5 p-4 text-sm text-cj-textMuted">• Materiais para shows, conferências e encontros.</li>
          <li className="rounded-2xl bg-white/5 p-4 text-sm text-cj-textMuted">• Letras completas serão publicadas aqui assim que finalizadas.</li>
        </ul>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}/contato`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-cj-textSoft"
          >
            Chamar para shows e agenda
          </Link>
          <Link
            href={`/${locale}/press-kit`}
            className="text-sm font-semibold underline decoration-cj-accent underline-offset-8"
          >
            Press kit atualizado
          </Link>
        </div>
      </section>
    </div>
  );
}
