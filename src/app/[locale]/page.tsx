import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaBookOpen, FaPlay, FaSpotify, FaYoutube } from 'react-icons/fa6';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

import Accordion from '@/components/site/Accordion';
import TikTokCarousel, { type TikTokVideo } from '@/components/site/TikTokCarousel';
import HomePosts from '@/components/site/HomePosts';
import SectionSeparator from '@/components/site/SectionSeparator';
import type { Locale } from '@/i18n/locales';
import { absoluteUrl } from '@/lib/urls';

type Params = { locale: Locale };

const FEATURE_CARDS = [
  {
    title: 'BASTA',
    tag: 'Single • Protesto espiritual',
    description:
      'Uma canção de protesto e coragem. É o grito da alma por justiça, liberdade e retorno aos princípios que nos levantam.',
    image: '/assets/capa_basta.webp',
    primary: {
      label: 'Assista ao clipe',
      href: 'https://www.youtube-nocookie.com/watch?v=6EVY-Ef8GRY',
      Icon: FaYoutube
    },
    secondary: {
      label: 'Letra e bastidores',
      href: '/musicas#basta'
    }
  },
  {
    title: 'ALELUIA',
    tag: 'Single • Louvor íntimo',
    description:
      'Uma oração em forma de melodia. Leve, espiritual e verdadeira para quem precisa respirar fé e descanso.',
    image: '/assets/capi-joy-apple-music.webp',
    primary: {
      label: 'Ouvir agora',
      href: 'https://open.spotify.com/intl-pt/artist/6l2XVPCSpXi3oKheB3UvKI',
      Icon: FaSpotify
    },
    secondary: {
      label: 'Ver detalhes',
      href: '/musicas#aleluia'
    }
  },
  {
    title: 'Clamor por Justiça e Liberdade',
    tag: 'Livro • Mensagem central',
    description:
      'Nasceu das madrugadas, das feridas e da fé que insiste. Um chamado para viver liberdade e paz por dentro.',
    image: '/assets/background-music.webp',
    primary: {
      label: 'Ler sobre o livro',
      href: '/livro',
      Icon: FaBookOpen
    },
    secondary: {
      label: 'Capturar leads',
      href: '/contato#captura'
    }
  }
] as const;

const PILLARS = [
  { title: 'Liberdade', text: 'Viver sem correntes invisíveis. Gritar basta quando algo rouba a alma.' },
  { title: 'Paz', text: 'Calma firme no peito, mesmo em meio à guerra. Paz que começa por dentro.' },
  { title: 'Verdade', text: 'Sem maquiagem, sem máscaras. Arte que fala do real, não do perfeito.' },
  { title: 'Fé prática', text: 'Espiritualidade simples, humana e viva. Deus presente na vida real.' },
  { title: 'Propósito', text: 'Arte para ser útil. Música, texto e palavra para levantar quem caiu.' }
];

import { EXPERIENCES_CONFERENCE_TOPICS } from '@/data/experiences';

const FAQ_QUESTIONS = [
  {
    q: 'Quem é Capí Joy?',
    a: 'Compositor, escritor e artista independente brasileiro. Une música, espiritualidade prática e verdade emocional para falar sobre liberdade, paz e recomeços.'
  },
  {
    q: 'Qual sua missão?',
    a: 'Inspirar pessoas a viverem com fé, verdade e liberdade. Quer ser útil, não famoso: “Se algo que escrevo tocar uma pessoa, já valeu.”'
  },
  {
    q: 'O que significa a música BASTA?',
    a: 'Um grito de alma. Protesto espiritual e coragem para dizer basta a tudo que rouba a paz interior. É um chamado para acordar e voltar aos princípios de Deus.'
  },
  {
    q: 'Como você fala sobre liberdade e paz?',
    a: 'Liberdade é destino; paz é base. É vida real: paz começa por dentro, e liberdade vem de escolhas cotidianas com fé prática.'
  },
  {
    q: 'Como recebo o livro “Clamor por Justiça e Liberdade”?',
    a: 'Preencha o formulário ou envie mensagem no WhatsApp. Nenhum PDF abre direto: nome e e-mail são obrigatórios para seguirmos juntos.'
  }
] as const;

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
  const path = `/${locale}`;
  const url = absoluteUrl(path);

  return {
    title: 'Capí Joy — Música, Palavra e Verdade | Oficial',
    description: 'Conheça Capí Joy: músicas, textos e projetos que unem verdade, fé e liberdade. Arte independente feita para inspirar e transformar.',
    alternates: {
      canonical: url,
      languages: {
        'pt-BR': absoluteUrl('/pt'),
        'en-US': absoluteUrl('/en'),
        'es-ES': absoluteUrl('/es')
      }
    },
    openGraph: {
      title: 'Capí Joy — música, palavra e verdade que transformam',
      description: 'Capí Joy é artista independente. Música, texto e espiritualidade prática para quem busca liberdade e paz.',
      url,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Capí Joy — música, palavra e verdade',
      description: 'Arte espiritual, humana e direta. BASTA, ALELUIA e o livro Clamor por Justiça e Liberdade.'
    }
  };
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const tiktokT = await getTranslations({ locale, namespace: 'tiktok' });

  const fallbackTitles: Record<TikTokFallbackKey, string> = {
    basta: tiktokT('fallback.basta'),
    spotify: tiktokT('fallback.spotify'),
    inspire: tiktokT('fallback.inspire'),
    hope: tiktokT('fallback.hope')
  };
  const tiktokVideos = await getTikTokVideos(fallbackTitles);

  return (
    <>
      <section id="topo" className="hero-animated-bg relative isolate flex min-h-[85vh] w-full flex-col justify-center overflow-hidden lg:flex-row lg:items-center">
        {/* Background Graphic/Gradient - Handled by hero-animated-bg class */}


        {/* Content Side (Left) */}
        <div className="relative z-10 flex w-full items-center justify-start px-4 py-12 sm:px-6 lg:w-1/2 lg:py-20 lg:pl-20">
          <div className="max-w-xl space-y-8">

            <h1 className="text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
              Capí Joy <br /> <span className="text-[var(--accent)]">Voz</span>, Verdade <br /> e Liberdade
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-gray-300">
              Música, palavra e mensagem para despertar a alma. Canções, livros e reflexões que nasceram da vida real,
              de dores, fé, quedas e recomeços.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="https://www.youtube-nocookie.com/watch?v=6EVY-Ef8GRY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-4 text-base font-bold text-black shadow-xl shadow-[#ff7700] transition hover:scale-105 hover:shadow-2xl"
              >
                <FaPlay aria-hidden /> Ouvir BASTA
              </Link>
              <Link
                href={`/${locale}/musicas#aleluia`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                Ouvir ALELUIA
              </Link>
            </div>
            <div className="pt-2">
              <Link
                href={`/${locale}/livro`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] underline decoration-white/20 underline-offset-8 transition hover:text-white"
              >
                <FaBookOpen aria-hidden /> Clamor por Justiça e Liberdade
              </Link>
            </div>
          </div>
        </div>

        {/* Image Side (Right) */}
        <div className="relative h-[50vh] w-full lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2">
          <Image
            src="/assets/hero-image-capi-joy.webp"
            alt="Capí Joy"
            fill
            priority
            className="object-contain object-bottom"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Requested Gradient: Degrade com opacidade na parte de embaixo */}
          <div className="absolute inset-x-0 bottom-0 h-48" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PILLARS.map(pillar => (
            <div key={pillar.title} className="section-card rounded-2xl px-4 py-5">
              <p className="text-xs uppercase tracking-[0.15em] text-[var(--accent-soft)]">{pillar.title}</p>
              <p className="mt-2 text-sm text-muted">{pillar.text}</p>
            </div>
          ))}
        </div>
      </section>

      <SectionSeparator variant="music" />

      <section id="musicas" className="mx-auto w-full max-w-7xl space-y-8 px-4 py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-soft)]">Destaques</p>
            <h2 className="text-3xl font-semibold text-[var(--page-text)]">Músicas e mensagem central</h2>
            <p className="max-w-2xl text-sm text-muted">
              BASTA, ALELUIA e o livro Clamor por Justiça e Liberdade formam o núcleo da obra de Capí Joy.
              Conteúdo feito para tocar, despertar e curar.
            </p>
          </div>
          <Link
            href={`/${locale}/musicas`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-soft)] underline underline-offset-8"
          >
            Ver discografia
            <FaArrowRight aria-hidden />
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {FEATURE_CARDS.map(card => (
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
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent-soft)]">{card.tag}</p>
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="text-sm text-muted">{card.description}</p>
                <div className="mt-auto flex flex-wrap items-center gap-3">
                  {(() => {
                    const isExternal = card.primary.href.startsWith('http');
                    const primaryHref = isExternal ? card.primary.href : `/${locale}${card.primary.href}`;
                    return (
                      <Link
                        href={primaryHref}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-[#ff7700] transition hover:-translate-y-0.5 hover:bg-[var(--accent-soft)]"
                      >
                        <card.primary.Icon aria-hidden />
                        {card.primary.label}
                      </Link>
                    );
                  })()}
                  <Link
                    href={`/${locale}${card.secondary.href}`}
                    className="text-sm font-semibold underline decoration-[var(--accent-soft)] underline-offset-8 transition hover:text-[var(--accent-soft)]"
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

      <section id="sobre" className="mx-auto w-full max-w-7xl gap-10 px-4 py-10 lg:grid lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="relative aspect-[3/4]">
          <Image
            src="/assets/retrato-capi-joy.webp"
            alt="Retrato de Capí Joy"
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority={false}
          />
        </div>
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-soft)]">Sobre Capí Joy</p>
          <h2 className="text-3xl font-semibold text-[var(--page-text)]">Arte que nasce da vida real</h2>
          <p className="text-base text-muted">
            Capí Joy é compositor, escritor e artista independente. Transforma dores, fé e recomeços em arte que inspira
            liberdade, paz e verdade. Sua música e suas palavras falam de espiritualidade prática, protesto espiritual e
            da coragem de viver com propósito.
          </p>
          <p className="text-base text-muted">
            “Se algo que escrevo tocar uma pessoa, já valeu.”, Capí Joy.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/sobre`}
              className="surface-button rounded-full px-5 py-3 text-sm font-semibold"
            >
              Ler a bio completa
            </Link>
            <Link
              href={`/${locale}/projetos`}
              className="inline-flex items-center gap-2 text-sm font-semibold underline decoration-[var(--accent-soft)] underline-offset-8"
            >
              Projetos e agenda
              <FaArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section id="conferencias" className="mx-auto w-full max-w-7xl space-y-6 px-4 py-10">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-soft)]">Experiências</p>
          <h2 className="text-3xl font-semibold text-[var(--page-text)]">Imersões, conferências e séries</h2>
          <p className="max-w-3xl text-sm text-muted">
            Conteúdo pensado para palco, rodas de conversa e encontros espirituais. Palavra, música, storytelling e
            prática.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {EXPERIENCES_CONFERENCE_TOPICS.map(topic => (
            <div key={topic.slug} className="section-card flex flex-col gap-2 rounded-2xl px-5 py-5">
              <h3 className="text-lg font-semibold leading-tight text-[var(--page-text)]">{topic.title}</h3>
              {topic.theme && (
                <p className="text-xs uppercase tracking-wider text-[var(--accent-soft)]">{topic.theme}</p>
              )}
              <p className="mt-2 text-sm leading-relaxed text-muted">{topic.shortSummary}</p>
            </div>
          ))}
        </div>
      </section>

      <SectionSeparator variant="book" className="text-[var(--accent-soft)]" />

      <section id="livro" className="mx-auto w-full max-w-7xl gap-10 px-4 py-10 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-soft)]">Livros</p>
          <h2 className="text-3xl font-semibold text-[var(--page-text)]">Clamor por Justiça e Liberdade</h2>
          <p className="text-base text-muted">
            Um livro ainda no prelo, mas com uma mensagem urgente: justiça e liberdade como fome da alma, não só como tema de política ou leis. Um reencontro entre a carta aberta escrita em 1992 e o adulto de 2025 que ainda acredita que a luta por dignidade vale a pena.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/livro`}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-[rgba(216,122,42,0.35)] transition hover:-translate-y-0.5 hover:bg-[var(--accent-soft)]"
            >
              <FaBookOpen aria-hidden />
              Ver detalhes do livro
            </Link>
            <Link
              href={`/${locale}/contato#captura`}
              className="surface-button rounded-full px-5 py-3 text-sm font-semibold"
            >
              Receber um trecho
            </Link>
          </div>
        </div>
        <div className="section-card rounded-3xl p-6">
          <div className="flex items-start gap-4">
            <div className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg shadow-lg rotate-2 transition-transform hover:rotate-0">
              <Image
                src="/assets/capa-de-livro1.webp"
                alt="Capa do livro Clamor por Justiça e Liberdade"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80px, 120px"
              />
            </div>
            <p className="text-sm font-light leading-relaxed text-muted">
              “Clamor por Justiça e Liberdade” é um livro que nasce do choque entre passado e presente. Trinta anos depois de uma carta aberta ao povo de Porto Alegre, os sistemas seguem falhos, mas a esperança continua viva. Não é um livro de ressentimento, é um livro de responsabilidade.
            </p>
          </div>
        </div>
      </section>

      <section id="blog" className="mx-auto w-full max-w-7xl space-y-4 px-4 py-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-soft)]">Mensagens</p>
            <h2 className="text-3xl font-semibold">Blog / Reflexões</h2>
            <p className="text-sm text-muted">
              Reflexões simples e profundas sobre fé, liberdade, recomeços e espiritualidade prática, para ler, guardar e compartilhar com quem você ama.
            </p>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm font-semibold underline decoration-[var(--accent-soft)] underline-offset-8"
          >
            Ver todas
            <FaArrowRight aria-hidden />
          </Link>
        </div>
        <HomePosts locale={locale} />
      </section>

      <SectionSeparator variant="social" className="opacity-40" />

      <section id="social" className="mx-auto w-full max-w-7xl space-y-4 px-4 py-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-soft)]">Redes</p>
            <h2 className="text-3xl font-semibold">Cortes e mensagens</h2>
            <p className="text-sm text-muted">Siga, curta e compartilhe nas nossas redes sociais</p>
          </div>
          <Link
            href={`/${locale}/ia`}
            className="inline-flex items-center gap-2 text-sm font-semibold underline decoration-[var(--accent-soft)] underline-offset-8"
          >
            Página para IA entender Capí Joy
            <FaArrowRight aria-hidden />
          </Link>
        </div>
        <TikTokCarousel videos={tiktokVideos} />
      </section>

      <section id="contato" className="mx-auto w-full max-w-7xl px-4 py-14">
        <div className="section-card grid gap-8 rounded-3xl p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-soft)]">Contato</p>
            <h3 className="text-2xl font-semibold">Convites e parcerias</h3>
            <p className="text-sm text-muted">
              Este espaço é para quem deseja se conectar comigo de forma mais direta: convites para eventos, entrevistas, projetos, colaborações, ou simplesmente para compartilhar o que minhas músicas e palavras geraram em você.
            </p>
            <div className="mt-4">
              <Image
                src="/assets/oi-image-capi-joy.webp"
                alt="Capí Joy"
                width={170}
                height={170}
                className="object-contain"
              />
            </div>
          </div>
          <form
            id="captura"
            action="mailto:contato@capijoy.com.br?subject=Contato%20via%20site%20Cap%C3%AD%20Joy"
            method="POST"
            encType="text/plain"
            className="grid gap-3"
          >
            <label className="flex flex-col gap-1 text-sm font-medium">
              Nome *
              <input
                type="text"
                name="name"
                required
                placeholder="Como devemos te chamar?"
                className="input-surface rounded-xl px-4 py-3 text-sm"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium">
              E-mail *
              <input
                type="email"
                name="email"
                required
                placeholder="seuemail@exemplo.com"
                className="input-surface rounded-xl px-4 py-3 text-sm"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium">
              WhatsApp (opcional)
              <input
                type="tel"
                name="whatsapp"
                placeholder="+55 00 00000-0000"
                className="input-surface rounded-xl px-4 py-3 text-sm"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium">
              Mensagem
              <textarea
                name="message"
                rows={3}
                placeholder="Convite, imprensa, parceria ou pedido de trecho do livro."
                className="input-surface rounded-xl px-4 py-3 text-sm"
                required
              />
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-[rgba(216,122,42,0.35)] transition hover:-translate-y-0.5 hover:bg-[var(--accent-soft)]"
              >
                Enviar mensagem
              </button>
              <Link
                href="https://wa.me/5537998765452?text=Ol%C3%A1%2C+vim+pelo+site+Cap%C3%AD+Joy+e+quero+um+trecho+do+livro+ou+falar+sobre+parceria."
                target="_blank"
                rel="noopener noreferrer"
                className="surface-button rounded-full px-5 py-3 text-sm font-semibold"
              >
                Falar no WhatsApp
              </Link>
            </div>
          </form>
        </div>
      </section>

      <section id="faq" className="mx-auto w-full max-w-7xl space-y-4 px-4 pb-16 pt-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-soft)]">FAQ</p>
          <h2 className="text-3xl font-semibold">Perguntas frequentes</h2>
          <p className="text-sm text-muted">
            Respostas oficiais para humanos e IA. Use como referência sobre Capí Joy, músicas, missão e materiais.
          </p>
        </div>
        <div className="space-y-3">
          {FAQ_QUESTIONS.map(item => (
            <Accordion key={item.q} title={item.q}>
              <p>{item.a}</p>
            </Accordion>
          ))}
        </div>
      </section>
    </>
  );
}
