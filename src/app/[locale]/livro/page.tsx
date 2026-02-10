import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

import type { Locale } from '@/i18n/locales';
import { localizePath } from '@/lib/localePath';
import { absoluteUrl } from '@/lib/urls';

type Params = { locale: Locale };

type BookCopy = {
  meta: {
    title: string;
    description: string;
  };
  header: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  presentation: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    paragraph4: string;
    coverAlt: string;
    coverCaption: string;
  };
  historical: {
    title: string;
    item1: string;
    item2: string;
    item3: string;
  };
  structure: {
    title: string;
    description: string;
    chapters: string[];
  };
  spoiler: {
    title: string;
    text: string;
  };
  audience: {
    title: string;
    item1: string;
    item2: string;
    item3: string;
    item4: string;
    excerptCta: string;
    pressCta: string;
    leadNote: string;
  };
};

const BOOK_COPY: Record<Locale, BookCopy> = {
  pt: {
    meta: {
      title: 'Livro "Clamor por Justica e Liberdade" | Capi Joy',
      description: 'Descubra o livro de Capi Joy: liberdade, paz e espiritualidade pratica em uma jornada real de transformacao.'
    },
    header: {
      eyebrow: 'Livro',
      title: 'Clamor por Justica e Liberdade',
      subtitle: 'Um livro entre o grito, a memoria e a responsabilidade.'
    },
    presentation: {
      title: 'Apresentacao',
      paragraph1:
        'Este livro ainda esta no prelo, mas nasce com uma certeza: embora pareca um tema antigo, justica e liberdade sempre serao urgentes. Nao e apenas sobre politica, leis ou sistemas. E sobre a alma humana, que carrega fome permanente de verdade, dignidade e sentido.',
      paragraph2:
        'Mais de trinta anos se passaram desde a carta aberta escrita ao povo de Porto Alegre. O tempo andou, mas muita coisa ficou parada: os sistemas continuam falhos, os discursos mudam e o comportamento repete o mesmo rosto endurecido.',
      paragraph3:
        'Ainda assim, homens e mulheres que acreditam na mudanca seguem lutando. Nao porque e facil, mas porque a esperanca impede a desistenca. Este livro reune eco, memoria, profecia e consciencia.',
      paragraph4: 'Nao e um livro escrito por magoa. E um livro escrito por responsabilidade.',
      coverAlt: 'Capa do livro Clamor por Justica e Liberdade',
      coverCaption:
        'Capa de "Clamor por Justica e Liberdade", obra em prelo de Capi Joy sobre justica, liberdade, dignidade e responsabilidade diante do que precisa mudar.'
    },
    historical: {
      title: 'Contexto historico',
      item1: 'Carta aberta ao povo de Porto Alegre (1992) como ponto de partida.',
      item2: 'Estruturas mudam lentamente, mas a fome por justica permanece.',
      item3: 'Em 2025, continuar lutando e uma escolha de consciencia, nao de orgulho.'
    },
    structure: {
      title: 'Estrutura do livro',
      description: 'Titulos sugeridos para revelar aos poucos e manter curiosidade.',
      chapters: [
        'O Grito Que Ninguem Ouviu',
        'Entre a Justica dos Homens e a Justica de Deus',
        'Quando a Alma Pede Socorro',
        'Verdade Que Liberta',
        'O Preco da Liberdade',
        'Deus nas Fendas da Noite',
        'A Coragem de Ficar de Pe',
        'Paz Que Nao Vem do Mundo',
        'Voz que Nao Cala'
      ]
    },
    spoiler: {
      title: 'Spoiler exclusivo',
      text:
        'Tudo comecou quando percebi que havia coisas dentro de mim que nao podiam mais ficar caladas. O silencio doia. A verdade comecou a gritar, nao contra pessoas, mas contra prisoes invisiveis da alma. Deus nao quer filhos acorrentados; Ele quer filhos livres. E liberdade comeca com coragem.'
    },
    audience: {
      title: 'Para quem e este livro?',
      item1: 'Para quem sente peso no peito.',
      item2: 'Para quem busca respostas e nao suporta mais silencio.',
      item3: 'Para quem quer reencontrar paz no meio da bagunca da vida.',
      item4: 'Para quem quer um guia espiritual simples e verdadeiro.',
      excerptCta: 'Quero receber um trecho',
      pressCta: 'Press kit / releases',
      leadNote: 'Lead obrigatorio: e-mail e nome antes de qualquer download.'
    }
  },
  en: {
    meta: {
      title: 'Book "Cry for Justice and Freedom" | Capi Joy',
      description: 'Discover Capi Joys book: freedom, peace and practical spirituality in a real journey of transformation.'
    },
    header: {
      eyebrow: 'Book',
      title: 'Cry for Justice and Freedom',
      subtitle: 'A book between protest, memory and responsibility.'
    },
    presentation: {
      title: 'Introduction',
      paragraph1:
        'This book is still in press, but it starts with one certainty: even if it sounds like an old topic, justice and freedom are always urgent. It is not only about politics, laws or systems. It is about the human soul, always hungry for truth, dignity and meaning.',
      paragraph2:
        'More than thirty years have passed since an open letter was written to the people of Porto Alegre. Time moved, but much stayed the same: systems are still failing, speeches change and behavior keeps the same hardened face.',
      paragraph3:
        'Even so, men and women who still believe in change continue fighting. Not because it is easy, but because hope refuses surrender. This book gathers echo, memory, prophecy and conscience.',
      paragraph4: 'It is not a book written from bitterness. It is a book written from responsibility.',
      coverAlt: 'Cover of the book Cry for Justice and Freedom',
      coverCaption:
        'Cover of "Cry for Justice and Freedom", a forthcoming work by Capi Joy about justice, freedom, dignity and responsible action.'
    },
    historical: {
      title: 'Historical context',
      item1: 'Open letter to the people of Porto Alegre (1992) as the starting point.',
      item2: 'Structures change slowly, but the hunger for justice remains.',
      item3: 'In 2025, continuing to fight is a conscious choice, not pride.'
    },
    structure: {
      title: 'Book structure',
      description: 'Working chapter titles revealed gradually to sustain curiosity.',
      chapters: [
        'The Cry No One Heard',
        'Between Human Justice and Gods Justice',
        'When the Soul Calls for Help',
        'Truth That Sets Free',
        'The Cost of Freedom',
        'God in the Cracks of Night',
        'The Courage to Stand',
        'Peace That Does Not Come from the World',
        'A Voice That Will Not Be Silenced'
      ]
    },
    spoiler: {
      title: 'Exclusive spoiler',
      text:
        'Everything started when I realized there were things inside me that could no longer stay silent. Silence was hurting. Truth began to cry out, not against people, but against invisible prisons of the soul. God does not want chained children; He wants free children. And freedom begins with courage.'
    },
    audience: {
      title: 'Who is this book for?',
      item1: 'For those who carry pressure in their chest.',
      item2: 'For those seeking answers and tired of silence.',
      item3: 'For those who want to recover peace in the middle of chaos.',
      item4: 'For those who want a simple and true spiritual guide.',
      excerptCta: 'I want an excerpt',
      pressCta: 'Press kit / releases',
      leadNote: 'Lead required: name and email before any download.'
    }
  },
  es: {
    meta: {
      title: 'Libro "Clamor por Justicia y Libertad" | Capi Joy',
      description: 'Descubre el libro de Capi Joy: libertad, paz y espiritualidad practica en una jornada real de transformacion.'
    },
    header: {
      eyebrow: 'Libro',
      title: 'Clamor por Justicia y Libertad',
      subtitle: 'Un libro entre el grito, la memoria y la responsabilidad.'
    },
    presentation: {
      title: 'Presentacion',
      paragraph1:
        'Este libro aun esta en preprensa, pero nace con una certeza: aunque parezca un tema antiguo, justicia y libertad siempre son urgentes. No se trata solo de politica, leyes o sistemas. Se trata del alma humana, con hambre constante de verdad, dignidad y sentido.',
      paragraph2:
        'Han pasado mas de treinta años desde la carta abierta al pueblo de Porto Alegre. El tiempo avanzo, pero mucho quedo igual: los sistemas siguen fallando, los discursos cambian y el comportamiento conserva el mismo rostro endurecido.',
      paragraph3:
        'Aun asi, hombres y mujeres que creen en el cambio siguen luchando. No porque sea facil, sino porque la esperanza impide rendirse. Este libro reune eco, memoria, profecia y conciencia.',
      paragraph4: 'No es un libro escrito desde el resentimiento. Es un libro escrito desde la responsabilidad.',
      coverAlt: 'Portada del libro Clamor por Justicia y Libertad',
      coverCaption:
        'Portada de "Clamor por Justicia y Libertad", obra en preprensa de Capi Joy sobre justicia, libertad, dignidad y responsabilidad frente a lo que debe cambiar.'
    },
    historical: {
      title: 'Contexto historico',
      item1: 'Carta abierta al pueblo de Porto Alegre (1992) como punto de partida.',
      item2: 'Las estructuras cambian lento, pero el hambre de justicia permanece.',
      item3: 'En 2025, seguir luchando es una decision de conciencia, no de orgullo.'
    },
    structure: {
      title: 'Estructura del libro',
      description: 'Titulos sugeridos para revelar poco a poco y mantener curiosidad.',
      chapters: [
        'El Grito que Nadie Escucho',
        'Entre la Justicia de los Hombres y la Justicia de Dios',
        'Cuando el Alma Pide Socorro',
        'Verdad que Libera',
        'El Precio de la Libertad',
        'Dios en las Grietas de la Noche',
        'El Valor de Permanecer de Pie',
        'Paz que No Viene del Mundo',
        'Una Voz que No se Calla'
      ]
    },
    spoiler: {
      title: 'Spoiler exclusivo',
      text:
        'Todo empezo cuando percibi que habia cosas dentro de mi que ya no podian callar. El silencio dolia. La verdad comenzo a gritar, no contra personas, sino contra prisiones invisibles del alma. Dios no quiere hijos encadenados; quiere hijos libres. Y la libertad comienza con valentia.'
    },
    audience: {
      title: 'Para quien es este libro?',
      item1: 'Para quien siente peso en el pecho.',
      item2: 'Para quien busca respuestas y ya no soporta el silencio.',
      item3: 'Para quien quiere recuperar paz en medio del caos.',
      item4: 'Para quien quiere una guia espiritual simple y verdadera.',
      excerptCta: 'Quiero recibir un fragmento',
      pressCta: 'Press kit / releases',
      leadNote: 'Lead obligatorio: nombre y correo antes de cualquier descarga.'
    }
  }
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = BOOK_COPY[locale] ?? BOOK_COPY.pt;
  const path = localizePath(locale, '/livro');
  const url = absoluteUrl(path);

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: {
      canonical: url
    }
  };
}

export default async function LivroPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const copy = BOOK_COPY[locale] ?? BOOK_COPY.pt;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-10 px-4 py-12">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">{copy.header.eyebrow}</p>
        <h1 className="text-3xl font-semibold">{copy.header.title}</h1>
        <h2 className="text-xl font-medium text-cj-textSoft">{copy.header.subtitle}</h2>
      </header>

      <section className="section-card rounded-3xl p-6 lg:p-8">
        <h2 className="mb-6 text-2xl font-semibold">{copy.presentation.title}</h2>
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4 text-base leading-relaxed text-cj-textMuted">
            <p>{copy.presentation.paragraph1}</p>
            <p>{copy.presentation.paragraph2}</p>
            <p>{copy.presentation.paragraph3}</p>
            <p className="font-medium text-cj-text">{copy.presentation.paragraph4}</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="relative aspect-[1/1.4] w-full overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/assets/capa-de-livro1.webp"
                alt={copy.presentation.coverAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <p className="text-xs italic leading-relaxed text-cj-textMuted opacity-80">{copy.presentation.coverCaption}</p>
          </div>
        </div>
      </section>

      <section className="section-card space-y-4 rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">{copy.historical.title}</h2>
        <ul className="space-y-3">
          <li className="flex gap-3 text-sm text-cj-textMuted">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cj-accent" />
            <span>{copy.historical.item1}</span>
          </li>
          <li className="flex gap-3 text-sm text-cj-textMuted">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cj-accent" />
            <span>{copy.historical.item2}</span>
          </li>
          <li className="flex gap-3 text-sm text-cj-textMuted">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cj-accent" />
            <span>{copy.historical.item3}</span>
          </li>
        </ul>
      </section>

      <section className="section-card space-y-3 rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">{copy.structure.title}</h2>
        <p className="text-sm text-cj-textMuted">{copy.structure.description}</p>
        <div className="grid gap-2 md:grid-cols-2">
          {copy.structure.chapters.map(chapter => (
            <div key={chapter} className="rounded-2xl bg-cj-surface px-4 py-3 text-sm text-cj-textMuted">
              {chapter}
            </div>
          ))}
        </div>
      </section>

      <section className="section-card space-y-3 rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">{copy.spoiler.title}</h2>
        <p className="text-sm text-cj-textMuted">{copy.spoiler.text}</p>
      </section>

      <section className="section-card space-y-3 rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">{copy.audience.title}</h2>
        <ul className="space-y-2 text-sm text-cj-textMuted">
          <li>- {copy.audience.item1}</li>
          <li>- {copy.audience.item2}</li>
          <li>- {copy.audience.item3}</li>
          <li>- {copy.audience.item4}</li>
        </ul>
        <div className="flex flex-wrap gap-3">
          <Link
            href={localizePath(locale, '/contato#captura')}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-cj-textSoft"
          >
            {copy.audience.excerptCta}
          </Link>
          <Link href={localizePath(locale, '/press-kit')} className="surface-button rounded-full px-5 py-3 text-sm font-semibold">
            {copy.audience.pressCta}
          </Link>
        </div>
        <p className="text-xs text-cj-textMuted">{copy.audience.leadNote}</p>
      </section>
    </div>
  );
}