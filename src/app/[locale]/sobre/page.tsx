import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

import type { Locale } from '@/i18n/locales';
import { localizePath } from '@/lib/localePath';
import { absoluteUrl } from '@/lib/urls';

type Params = { locale: Locale };

type AboutCopy = {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    discographyCta: string;
    projectsCta: string;
    imageAlt: string;
  };
  music: {
    eyebrow: string;
    title: string;
    paragraph: string;
    bullet1: string;
    bullet2: string;
  };
  spirituality: {
    eyebrow: string;
    title: string;
    paragraph: string;
  };
  currentProjects: {
    eyebrow: string;
    project1Title: string;
    project1Text: string;
    project2Title: string;
    project2Text: string;
    project3Title: string;
    project3Text: string;
    project4Title: string;
    project4Text: string;
    pressCta: string;
  };
};

const ABOUT_COPY: Record<Locale, AboutCopy> = {
  pt: {
    meta: {
      title: 'Quem e Capi Joy - Artista, escritor e compositor brasileiro',
      description:
        'Capi Joy transforma dores, fe e recomecos em musica, livros e mensagens profundas sobre liberdade e paz. Conheca a historia completa.',
      ogTitle: 'Capi Joy - musica, palavra e verdade',
      ogDescription: 'Biografia completa de Capi Joy, artista independente de liberdade, paz e espiritualidade pratica.'
    },
    hero: {
      eyebrow: 'Sobre Capi Joy',
      title: 'Arte que nasce do real',
      paragraph1:
        'Capi Joy e compositor, escritor e artista independente. Sua arte nasce de experiencias profundas: perdas, recomecos, fe pratica e a busca insistente por liberdade e paz. Cada musica e cada texto sao verdadeiros, intimos e feitos para tocar quem precisa de forca e direcao.',
      paragraph2: 'Sua trajetoria nao e sobre fama, mas sobre ser util: "Se algo que escrevo tocar uma pessoa, ja valeu".',
      discographyCta: 'Discografia',
      projectsCta: 'Projetos em andamento',
      imageAlt: 'Retrato de Capi Joy'
    },
    music: {
      eyebrow: 'Musica',
      title: 'BASTA e ALELUIA',
      paragraph:
        'BASTA e um grito de alma, protesto espiritual, coragem e verdade. ALELUIA traz leveza e louvor intimo para momentos de fe e descanso. As duas faixas fazem parte de um palco cinematografico, intimo e intenso.',
      bullet1: 'Versao em ingles de BASTA em producao.',
      bullet2: 'Futuras reflexoes musicadas e series tematicas.'
    },
    spirituality: {
      eyebrow: 'Palavra e espiritualidade',
      title: 'Espiritualidade simples',
      paragraph:
        'Capi escreve reflexoes e mensagens espirituais de forma humana e acessivel. O objetivo e ajudar pessoas a encontrarem clareza, sentido e paz, sem religiosidade pesada, com verdade pratica e fe viva.'
    },
    currentProjects: {
      eyebrow: 'Projetos atuais',
      project1Title: 'Clamor por Justica e Liberdade',
      project1Text:
        'Livro sobre liberdade interna, paz como fundamento, cura emocional e espiritualidade pratica. Inclui trecho inicial e captura de lead antes do download.',
      project2Title: 'O Retorno - Uma historia que nao deveria ter sido contada',
      project2Text:
        'Projeto narrativo intenso, real e transformador. Transparencia e coragem para mostrar que ate historias dificeis podem inspirar.',
      project3Title: 'Series espirituais',
      project3Text: 'Conteudos para jovens e adultos, com foco em liberdade, paz e relacionamentos.',
      project4Title: 'Press Kit / Media',
      project4Text: 'Biografias curta e longa, logos, fotos oficiais e releases para imprensa e produtores.',
      pressCta: 'Abrir press kit'
    }
  },
  en: {
    meta: {
      title: 'Who is Capi Joy - Brazilian artist, writer and songwriter',
      description:
        'Capi Joy transforms pain, faith and restarts into music, books and deep messages about freedom and peace. Discover the full story.',
      ogTitle: 'Capi Joy - music, message and truth',
      ogDescription: 'Complete biography of Capi Joy, independent artist focused on freedom, peace and practical spirituality.'
    },
    hero: {
      eyebrow: 'About Capi Joy',
      title: 'Art born from what is real',
      paragraph1:
        'Capi Joy is a songwriter, writer and independent artist. His art is born from deep experiences: losses, restarts, practical faith and a constant search for freedom and peace. Every song and text is honest, intimate and created to strengthen people who need direction.',
      paragraph2: 'His journey is not about fame, but about being useful: "If something I write touches one person, it is already worth it".',
      discographyCta: 'Discography',
      projectsCta: 'Current projects',
      imageAlt: 'Portrait of Capi Joy'
    },
    music: {
      eyebrow: 'Music',
      title: 'BASTA and ALELUIA',
      paragraph:
        'BASTA is a cry of the soul, a spiritual protest, courage and truth. ALELUIA brings lightness and intimate worship for moments of faith and rest. Both songs are part of a cinematic, intimate and intense live concept.',
      bullet1: 'English version of BASTA in production.',
      bullet2: 'Upcoming musical reflections and themed series.'
    },
    spirituality: {
      eyebrow: 'Message and spirituality',
      title: 'Simple spirituality',
      paragraph:
        'Capi writes reflections and spiritual messages in a human and accessible way. The goal is to help people find clarity, meaning and peace, with practical truth and living faith.'
    },
    currentProjects: {
      eyebrow: 'Current projects',
      project1Title: 'Cry for Justice and Freedom',
      project1Text:
        'A book about inner freedom, peace as foundation, emotional healing and practical spirituality. Includes an early excerpt and lead capture before download.',
      project2Title: 'The Return - A story that should not have been told',
      project2Text:
        'An intense, real and transformative narrative project. Transparency and courage to show that even hard stories can inspire.',
      project3Title: 'Spiritual series',
      project3Text: 'Content for youth and adults focused on freedom, peace and relationships.',
      project4Title: 'Press Kit / Media',
      project4Text: 'Short and long bios, logos, official photos and releases for media and producers.',
      pressCta: 'Open press kit'
    }
  },
  es: {
    meta: {
      title: 'Quien es Capi Joy - Artista, escritor y compositor brasileño',
      description:
        'Capi Joy transforma dolor, fe y recomienzos en musica, libros y mensajes profundos sobre libertad y paz. Conoce su historia completa.',
      ogTitle: 'Capi Joy - musica, palabra y verdad',
      ogDescription: 'Biografia completa de Capi Joy, artista independiente enfocado en libertad, paz y espiritualidad practica.'
    },
    hero: {
      eyebrow: 'Sobre Capi Joy',
      title: 'Arte que nace de lo real',
      paragraph1:
        'Capi Joy es compositor, escritor y artista independiente. Su arte nace de experiencias profundas: perdidas, recomienzos, fe practica y una busqueda constante de libertad y paz. Cada cancion y cada texto es honesto, intimo y hecho para fortalecer a quien necesita direccion.',
      paragraph2: 'Su trayectoria no es sobre fama, sino sobre ser util: "Si algo que escribo toca a una persona, ya valio la pena".',
      discographyCta: 'Discografia',
      projectsCta: 'Proyectos en curso',
      imageAlt: 'Retrato de Capi Joy'
    },
    music: {
      eyebrow: 'Musica',
      title: 'BASTA y ALELUIA',
      paragraph:
        'BASTA es un grito del alma, protesta espiritual, coraje y verdad. ALELUIA trae ligereza y alabanza intima para momentos de fe y descanso. Ambas canciones forman parte de un concepto de escenario cinematografico, intimo e intenso.',
      bullet1: 'Version en ingles de BASTA en produccion.',
      bullet2: 'Proximas reflexiones musicalizadas y series tematicas.'
    },
    spirituality: {
      eyebrow: 'Palabra y espiritualidad',
      title: 'Espiritualidad simple',
      paragraph:
        'Capi escribe reflexiones y mensajes espirituales de manera humana y accesible. El objetivo es ayudar a encontrar claridad, sentido y paz, con verdad practica y fe viva.'
    },
    currentProjects: {
      eyebrow: 'Proyectos actuales',
      project1Title: 'Clamor por Justicia y Libertad',
      project1Text:
        'Libro sobre libertad interior, paz como fundamento, sanidad emocional y espiritualidad practica. Incluye fragmento inicial y captura de lead antes de la descarga.',
      project2Title: 'El Regreso - Una historia que no deberia haber sido contada',
      project2Text:
        'Proyecto narrativo intenso, real y transformador. Transparencia y coraje para mostrar que incluso las historias dificiles pueden inspirar.',
      project3Title: 'Series espirituales',
      project3Text: 'Contenido para jovenes y adultos, con foco en libertad, paz y relaciones.',
      project4Title: 'Press Kit / Media',
      project4Text: 'Biografias corta y larga, logos, fotos oficiales y releases para prensa y productores.',
      pressCta: 'Abrir press kit'
    }
  }
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = ABOUT_COPY[locale] ?? ABOUT_COPY.pt;
  const path = localizePath(locale, '/sobre');
  const url = absoluteUrl(path);

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: {
      canonical: url
    },
    openGraph: {
      url,
      title: copy.meta.ogTitle,
      description: copy.meta.ogDescription,
      type: 'profile'
    }
  };
}

export default async function AboutPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const copy = ABOUT_COPY[locale] ?? ABOUT_COPY.pt;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-12">
      <section className="gap-6 rounded-3xl bg-cj-surface p-8 shadow-xl shadow-black/50 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">{copy.hero.eyebrow}</p>
          <h1 className="text-3xl font-semibold">{copy.hero.title}</h1>
          <p className="text-base text-cj-textMuted">{copy.hero.paragraph1}</p>
          <p className="text-base text-cj-textMuted">{copy.hero.paragraph2}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={localizePath(locale, '/musicas')}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-cj-textSoft"
            >
              {copy.hero.discographyCta}
            </Link>
            <Link href={localizePath(locale, '/projetos')} className="surface-button rounded-full px-5 py-3 text-sm font-semibold">
              {copy.hero.projectsCta}
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/5]">
          <Image
            src="/assets/retrato-capi-joy.webp"
            alt={copy.hero.imageAlt}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority={false}
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="section-card rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">{copy.music.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold">{copy.music.title}</h2>
          <p className="mt-3 text-sm text-cj-textMuted">{copy.music.paragraph}</p>
          <ul className="mt-3 space-y-2 text-sm text-cj-textMuted">
            <li>- {copy.music.bullet1}</li>
            <li>- {copy.music.bullet2}</li>
          </ul>
        </div>
        <div className="section-card rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">{copy.spirituality.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold">{copy.spirituality.title}</h2>
          <p className="mt-3 text-sm text-cj-textMuted">{copy.spirituality.paragraph}</p>
        </div>
      </section>

      <section className="section-card space-y-4 rounded-3xl p-7">
        <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">{copy.currentProjects.eyebrow}</p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl bg-white/5 p-4">
            <h3 className="text-lg font-semibold">{copy.currentProjects.project1Title}</h3>
            <p className="text-sm text-cj-textMuted">{copy.currentProjects.project1Text}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <h3 className="text-lg font-semibold">{copy.currentProjects.project2Title}</h3>
            <p className="text-sm text-cj-textMuted">{copy.currentProjects.project2Text}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <h3 className="text-lg font-semibold">{copy.currentProjects.project3Title}</h3>
            <p className="text-sm text-cj-textMuted">{copy.currentProjects.project3Text}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <h3 className="text-lg font-semibold">{copy.currentProjects.project4Title}</h3>
            <p className="text-sm text-cj-textMuted">{copy.currentProjects.project4Text}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={localizePath(locale, '/press-kit')}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-cj-textSoft"
          >
            {copy.currentProjects.pressCta}
          </Link>
        </div>
      </section>
    </div>
  );
}