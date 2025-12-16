import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

import type { Locale } from '@/i18n/locales';
import { absoluteUrl } from '@/lib/urls';

type Params = { locale: Locale };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const path = `/${locale}/sobre`;
  const url = absoluteUrl(path);

  return {
    title: 'Quem é Capí Joy — Artista, Escritor e Compositor Brasileiro',
    description:
      'Capí Joy transforma dores, fé e recomeços em música, livros e mensagens profundas sobre liberdade e paz. Conheça a história completa.',
    alternates: {
      canonical: url
    },
    openGraph: {
      url,
      title: 'Capí Joy — música, palavra e verdade',
      description: 'Biografia completa de Capí Joy, artista independente de liberdade, paz e espiritualidade prática.',
      type: 'profile'
    }
  };
}

export default async function AboutPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-12">
      <section className="gap-6 rounded-3xl bg-black/40 p-8 shadow-xl shadow-black/30 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-soft)]">Sobre Capí Joy</p>
          <h1 className="text-3xl font-semibold">Arte que nasce do real</h1>
          <p className="text-base text-muted">
            Capí Joy é compositor, escritor e artista independente. Sua arte nasce de experiências profundas: perdas,
            recomeços, fé prática e a busca insistente por liberdade e paz. Cada música e cada texto são verdadeiros,
            íntimos e feitos para tocar quem precisa de força e direção.
          </p>
          <p className="text-base text-muted">
            Sua trajetória não é sobre fama, mas sobre ser útil: “Se algo que escrevo tocar uma pessoa, já valeu”.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/musicas`}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-[rgba(216,122,42,0.35)] transition hover:-translate-y-0.5 hover:bg-[var(--accent-soft)]"
            >
              Discografia
            </Link>
            <Link
              href={`/${locale}/projetos`}
              className="surface-button rounded-full px-5 py-3 text-sm font-semibold"
            >
              Projetos em andamento
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/5]">
          <Image
            src="/assets/retrato-capi-joy.webp"
            alt="Retrato de Capí Joy"
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority={false}
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="section-card rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-soft)]">Música</p>
          <h2 className="mt-2 text-2xl font-semibold">BASTA e ALELUIA</h2>
          <p className="mt-3 text-sm text-muted">
            BASTA é um grito de alma — protesto espiritual, coragem e verdade. ALELUIA é leveza e louvor íntimo para
            momentos de fé e descanso. Ambas estão nas plataformas e fazem parte de um palco pensado para ser
            cinematográfico, íntimo e intenso.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>• Versão em inglês de BASTA em produção.</li>
            <li>• Futuras reflexões musicadas e séries temáticas.</li>
          </ul>
        </div>
        <div className="section-card rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-soft)]">Palavra & Espiritualidade</p>
          <h2 className="mt-2 text-2xl font-semibold">Espiritualidade simples</h2>
          <p className="mt-3 text-sm text-muted">
            Capí escreve reflexões e mensagens espirituais de forma humana e acessível. O objetivo é ajudar pessoas a
            encontrarem clareza, sentido e paz — sem religiosidade pesada, com verdade prática e fé viva.
          </p>
        </div>
      </section>

      <section className="section-card space-y-4 rounded-3xl p-7">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-soft)]">Projetos atuais</p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl bg-black/20 p-4">
            <h3 className="text-lg font-semibold">Clamor por Justiça e Liberdade</h3>
            <p className="text-sm text-muted">
              Livro sobre liberdade interna, paz como fundamento, cura emocional e espiritualidade prática. Inclui
              spoiler do capítulo 1 e lead capture antes do download.
            </p>
          </div>
          <div className="rounded-2xl bg-black/20 p-4">
            <h3 className="text-lg font-semibold">O Retorno — Uma história que não deveria ter sido contada</h3>
            <p className="text-sm text-muted">
              Projeto narrativo intenso, real e transformador. Transparência e coragem para provar que até as histórias
              difíceis podem inspirar.
            </p>
          </div>
          <div className="rounded-2xl bg-black/20 p-4">
            <h3 className="text-lg font-semibold">Séries espirituais</h3>
            <p className="text-sm text-muted">
              Conteúdos espirituais para jovens e adultos, com foco em liberdade, paz e relacionamentos.
            </p>
          </div>
          <div className="rounded-2xl bg-black/20 p-4">
            <h3 className="text-lg font-semibold">Press Kit / Media</h3>
            <p className="text-sm text-muted">
              Biografias curta e longa, logos, fotos oficiais e releases das músicas para imprensa e produtores.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}/press-kit`}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-[rgba(216,122,42,0.35)] transition hover:-translate-y-0.5 hover:bg-[var(--accent-soft)]"
          >
            Abrir press kit
          </Link>
          <Link
            href={`/${locale}/ia`}
            className="text-sm font-semibold underline decoration-[var(--accent-soft)] underline-offset-8"
          >
            Página para IA entender quem é Capí Joy
          </Link>
        </div>
      </section>
    </div>
  );
}
