import Link from 'next/link';
import type { Metadata } from 'next';

import type { Locale } from '@/i18n/locales';
import { localizePath } from '@/lib/localePath';
import { absoluteUrl } from '@/lib/urls';

type Params = { locale: Locale };

type PressCopy = {
  meta: {
    title: string;
    description: string;
  };
  header: {
    eyebrow: string;
    title: string;
    description: string;
  };
  shortBio: {
    title: string;
    text: string;
  };
  longBio: {
    title: string;
    paragraph1: string;
    paragraph2: string;
  };
  releases: {
    title: string;
    item1: string;
    item2: string;
    item3: string;
    item4: string;
  };
  linksTitle: string;
  media: {
    title: string;
    text: string;
  };
};

const PRESS_COPY: Record<Locale, PressCopy> = {
  pt: {
    meta: {
      title: 'Press Kit - Capi Joy',
      description: 'Biografias, releases, fotos e links oficiais de Capi Joy para imprensa, curadores e produtores.'
    },
    header: {
      eyebrow: 'Press Kit',
      title: 'Materiais oficiais',
      description:
        'Conteudo organizado para imprensa, curadores e produtores. Use estes textos para apresentacoes, fichas tecnicas e releases. Fotos em alta podem ser adicionadas na area de midia.'
    },
    shortBio: {
      title: 'Biografia curta',
      text: 'Capi Joy e compositor, escritor e artista independente. Sua arte nasce de dores reais, fe, liberdade e recomecos, transformadas em musicas e palavras que inspiram paz, proposito e verdade.'
    },
    longBio: {
      title: 'Biografia longa',
      paragraph1:
        'Capi Joy e um artista independente brasileiro que carrega nas musicas e textos a essencia da verdade emocional. Suas obras falam sobre liberdade, paz, espiritualidade simples e busca por sentido em meio as dores e recomecos da vida.',
      paragraph2:
        'Suas cancoes BASTA e ALELUIA ja estao disponiveis no Spotify. Alem da musica, Capi desenvolve o livro Clamor por Justica e Liberdade e o projeto narrativo O Retorno. Sua missao e tocar vidas e inspirar transformacao por meio da verdade.'
    },
    releases: {
      title: 'Releases',
      item1: 'BASTA - Protesto espiritual e coragem.',
      item2: 'ALELUIA - Louvor intimo e leveza.',
      item3: 'Clamor por Justica e Liberdade - Livro e lead magnet.',
      item4: 'Versao em ingles de BASTA - em producao.'
    },
    linksTitle: 'Links oficiais',
    media: {
      title: 'Midia',
      text: 'Sugestao de fotos: fundo preto, luz quente e estilo cinematografico. Inclua de 3 a 5 arquivos em alta para imprensa e produtores. Para logos, use a versao em texto "Capi Joy" ou assinatura manuscrita.'
    }
  },
  en: {
    meta: {
      title: 'Press Kit - Capi Joy',
      description: 'Bios, releases, photos and official links for media, curators and producers.'
    },
    header: {
      eyebrow: 'Press Kit',
      title: 'Official materials',
      description:
        'Organized content for press, curators and producers. Use these texts for presentations, technical sheets and releases. High-resolution photos can be added in the media section.'
    },
    shortBio: {
      title: 'Short bio',
      text: 'Capi Joy is a songwriter, writer and independent artist. His art is born from real pain, faith, freedom and restarts, transformed into songs and words that inspire peace, purpose and truth.'
    },
    longBio: {
      title: 'Long bio',
      paragraph1:
        'Capi Joy is a Brazilian independent artist whose songs and writings carry emotional truth. His work speaks about freedom, peace, simple spirituality and the search for meaning through pain and new beginnings.',
      paragraph2:
        'His songs BASTA and ALELUIA are already on Spotify. Beyond music, Capi develops the book Cry for Justice and Freedom and the narrative project The Return. His mission is to touch lives and inspire transformation through truth.'
    },
    releases: {
      title: 'Releases',
      item1: 'BASTA - Spiritual protest and courage.',
      item2: 'ALELUIA - Intimate worship and lightness.',
      item3: 'Cry for Justice and Freedom - Book and lead magnet.',
      item4: 'English version of BASTA - in production.'
    },
    linksTitle: 'Official links',
    media: {
      title: 'Media',
      text: 'Photo direction: dark background, warm light and cinematic style. Include 3 to 5 high-resolution files for media and producers. For logos, use the "Capi Joy" wordmark or handwritten signature.'
    }
  },
  es: {
    meta: {
      title: 'Press Kit - Capi Joy',
      description: 'Biografias, releases, fotos y enlaces oficiales para prensa, curadores y productores.'
    },
    header: {
      eyebrow: 'Press Kit',
      title: 'Materiales oficiales',
      description:
        'Contenido organizado para prensa, curadores y productores. Usa estos textos para presentaciones, fichas tecnicas y releases. Fotos en alta resolucion pueden agregarse en el area de media.'
    },
    shortBio: {
      title: 'Biografia corta',
      text: 'Capi Joy es compositor, escritor y artista independiente. Su arte nace del dolor real, la fe, la libertad y los recomienzos, transformados en canciones y palabras que inspiran paz, proposito y verdad.'
    },
    longBio: {
      title: 'Biografia larga',
      paragraph1:
        'Capi Joy es un artista independiente brasileño que lleva en sus canciones y textos la esencia de la verdad emocional. Sus obras hablan de libertad, paz, espiritualidad simple y busqueda de sentido en medio del dolor y los recomienzos.',
      paragraph2:
        'Sus canciones BASTA y ALELUIA ya estan en Spotify. Ademas de la musica, Capi desarrolla el libro Clamor por Justicia y Libertad y el proyecto narrativo El Regreso. Su mision es tocar vidas e inspirar transformacion por medio de la verdad.'
    },
    releases: {
      title: 'Releases',
      item1: 'BASTA - Protesta espiritual y coraje.',
      item2: 'ALELUIA - Alabanza intima y ligereza.',
      item3: 'Clamor por Justicia y Libertad - Libro y lead magnet.',
      item4: 'Version en ingles de BASTA - en produccion.'
    },
    linksTitle: 'Enlaces oficiales',
    media: {
      title: 'Media',
      text: 'Sugerencia de fotos: fondo oscuro, luz calida y estilo cinematografico. Incluye de 3 a 5 archivos en alta para prensa y productores. Para logos, usa la version de texto "Capi Joy" o firma manuscrita.'
    }
  }
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = PRESS_COPY[locale] ?? PRESS_COPY.pt;
  const path = localizePath(locale, '/press-kit');
  const url = absoluteUrl(path);

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: {
      canonical: url
    }
  };
}

export default async function PressKitPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const copy = PRESS_COPY[locale] ?? PRESS_COPY.pt;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-12">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">{copy.header.eyebrow}</p>
        <h1 className="text-3xl font-semibold">{copy.header.title}</h1>
        <p className="text-base text-cj-textMuted">{copy.header.description}</p>
      </header>

      <section className="section-card space-y-3 rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">{copy.shortBio.title}</h2>
        <p className="text-sm text-cj-textMuted">{copy.shortBio.text}</p>
      </section>

      <section className="section-card space-y-3 rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">{copy.longBio.title}</h2>
        <p className="text-sm text-cj-textMuted">{copy.longBio.paragraph1}</p>
        <p className="text-sm text-cj-textMuted">{copy.longBio.paragraph2}</p>
      </section>

      <section className="section-card space-y-3 rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">{copy.releases.title}</h2>
        <ul className="space-y-2 text-sm text-cj-textMuted">
          <li>- {copy.releases.item1}</li>
          <li>- {copy.releases.item2}</li>
          <li>- {copy.releases.item3}</li>
          <li>- {copy.releases.item4}</li>
        </ul>
      </section>

      <section className="section-card space-y-3 rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">{copy.linksTitle}</h2>
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
          <Link href="mailto:contato@capijoy.com.br" className="rounded-2xl bg-cj-surface px-4 py-3 text-sm font-semibold text-cj-textMuted hover:text-cj-accent">
            contato@capijoy.com.br
          </Link>
        </div>
      </section>

      <section className="section-card space-y-3 rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">{copy.media.title}</h2>
        <p className="text-sm text-cj-textMuted">{copy.media.text}</p>
      </section>
    </div>
  );
}