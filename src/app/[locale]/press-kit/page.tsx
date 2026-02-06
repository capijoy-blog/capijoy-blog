import Link from 'next/link';
import type { Metadata } from 'next';

import type { Locale } from '@/i18n/locales';
import { absoluteUrl } from '@/lib/urls';

type Params = { locale: Locale };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const path = `/${locale}/press-kit`;
  const url = absoluteUrl(path);

  return {
    title: 'Press Kit — Capí Joy',
    description:
      'Biografias, releases, fotos e links oficiais de Capí Joy para imprensa, curadores e produtores.',
    alternates: {
      canonical: url
    }
  };
}

export default async function PressKitPage({ params }: { params: Promise<Params> }) {
  await params;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-12">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">Press Kit</p>
        <h1 className="text-3xl font-semibold">Materiais oficiais</h1>
        <p className="text-base text-cj-textMuted">
          Conteúdo organizado para imprensa, curadores e produtores. Use estes textos para apresentações, fichas técnicas
          e releases. Fotos em alta podem ser adicionadas na área de mídia.
        </p>
      </header>

      <section className="section-card space-y-3 rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">Biografia curta</h2>
        <p className="text-sm text-cj-textMuted">
          Capí Joy é compositor, escritor e artista independente. Sua arte nasce de dores reais, fé, liberdade e
          recomeços — transformadas em músicas e palavras que inspiram paz, propósito e verdade.
        </p>
      </section>

      <section className="section-card space-y-3 rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">Biografia longa</h2>
        <p className="text-sm text-cj-textMuted">
          Capí Joy é um artista independente brasileiro que carrega nas suas músicas e textos a essência da verdade
          emocional. Suas obras falam sobre liberdade, paz, espiritualidade simples e a busca por sentido em meio às
          dores e recomeços da vida. Com uma trajetória marcada por processos internos profundos, Capí encontrou na arte
          a forma mais sincera de expressar fé, luta, cura e esperança.
        </p>
        <p className="text-sm text-cj-textMuted">
          Suas principais canções, “BASTA” e “ALELUIA”, já estão disponíveis no Spotify. Além da música, Capí desenvolve o
          livro “Clamor por Justiça e Liberdade” e o projeto narrativo “O Retorno — Uma história que não deveria ter sido
          contada”. Sua missão é simples: tocar vidas e inspirar transformação por meio da verdade — sem complicações,
          sem máscaras, apenas com Deus e autenticidade.
        </p>
      </section>

      <section className="section-card space-y-3 rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">Releases</h2>
        <ul className="space-y-2 text-sm text-cj-textMuted">
          <li>• BASTA — Protesto espiritual e coragem.</li>
          <li>• ALELUIA — Louvor íntimo e leveza.</li>
          <li>• Clamor por Justiça e Liberdade — Livro e lead magnet.</li>
          <li>• Versão em inglês de BASTA — em produção.</li>
        </ul>
      </section>

      <section className="section-card space-y-3 rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">Links oficiais</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <Link
            href="https://open.spotify.com/intl-pt/artist/6l2XVPCSpXi3oKheB3UvKI"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-cj-surface px-4 py-3 text-sm font-semibold text-cj-textMuted hover:text-cj-accent"
          >
            Spotify
          </Link>
          <Link
            href="https://www.youtube.com/@dicapijoy"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-cj-surface px-4 py-3 text-sm font-semibold text-cj-textMuted hover:text-cj-accent"
          >
            YouTube
          </Link>
          <Link
            href="https://www.instagram.com/capijoy/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-cj-surface px-4 py-3 text-sm font-semibold text-cj-textMuted hover:text-cj-accent"
          >
            Instagram
          </Link>
          <Link
            href="https://music.apple.com/br/artist/cap%C3%AD-joy/1831439555"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-cj-surface px-4 py-3 text-sm font-semibold text-cj-textMuted hover:text-cj-accent"
          >
            Apple Music
          </Link>
          <Link
            href="mailto:contato@capijoy.com.br"
            className="rounded-2xl bg-cj-surface px-4 py-3 text-sm font-semibold text-cj-textMuted hover:text-cj-accent"
          >
            contato@capijoy.com.br
          </Link>
        </div>
      </section>

      <section className="section-card space-y-3 rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">Mídia</h2>
        <p className="text-sm text-cj-textMuted">
          Sugestão de fotos: fundo preto, luz quente, estilo cinematográfico. Inclua 3 a 5 arquivos em alta para
          produtores e imprensa. Para logos, use a versão em texto “Capí Joy” ou assinatura manuscrita.
        </p>
      </section>
    </div>
  );
}
