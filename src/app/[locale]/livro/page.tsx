import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

import type { Locale } from '@/i18n/locales';
import { absoluteUrl } from '@/lib/urls';

type Params = { locale: Locale };

const CHAPTERS = [
  'O Grito Que Ninguém Ouviu',
  'Entre a Justiça dos Homens e a Justiça de Deus',
  'Quando a Alma Pede Socorro',
  'Verdade Que Liberta',
  'O Preço da Liberdade',
  'Deus nas Fendas da Noite',
  'A Coragem de Ficar de Pé',
  'Paz Que Não Vem do Mundo',
  'Voz que Não Cala'
];

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const path = `/${locale}/livro`;
  const url = absoluteUrl(path);

  return {
    title: 'Livro “Clamor por Justiça e Liberdade” | Capí Joy',
    description:
      'Descubra o livro de Capí Joy: liberdade, paz e espiritualidade prática em uma jornada real de transformação.',
    alternates: {
      canonical: url
    }
  };
}

export default async function LivroPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-10 px-4 py-12">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-soft)]">Livro</p>
        <h1 className="text-3xl font-semibold">Clamor por Justiça e Liberdade</h1>
        <h2 className="text-xl font-medium text-[var(--accent-soft)]">
          Um livro entre o grito, a memória e a responsabilidade.
        </h2>
      </header>

      <section className="section-card rounded-3xl p-6 lg:p-8">
        <h2 className="mb-6 text-2xl font-semibold">Apresentação</h2>
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4 text-base leading-relaxed text-muted">
            <p>
              O resumo deste livro começa pela sua própria introdução. <br />
              “Clamor por Justiça e Liberdade” ainda está no prelo, mas já nasce com uma certeza: embora pareça um tema
              antigo, justiça e liberdade sempre serão urgentes. Não é apenas sobre política, leis ou sistemas. É sobre a
              alma humana, que carrega uma fome permanente por verdade, por dignidade e por uma vida que faça sentido.
            </p>
            <p>
              Mais de trinta anos se passaram desde a carta aberta escrita ao povo de Porto Alegre. O tempo andou, mas
              muita coisa ficou parada: os sistemas continuam falhos, os discursos mudam, porém o comportamento permanece
              com o mesmo rosto endurecido. Ainda assim, homens e mulheres que acreditam na mudança seguem lutando, não
              porque é fácil, mas porque a esperança não deixa desistir.
            </p>
            <p>
              Este livro reúne eco, memória, profecia e consciência. É o reencontro entre o jovem que protestou em 1992 e o
              adulto que, em 2025, olha para a realidade e afirma: a luta ainda está viva, e vale a pena continuar.
            </p>
            <p className="font-medium text-[var(--page-text)]">
              Não é um livro escrito por mágoa. <br /> É um livro escrito por responsabilidade.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="relative aspect-[1/1.4] w-full overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/assets/capa-de-livro1.webp"
                alt="Capa do livro Clamor por Justiça e Liberdade"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <p className="text-xs italic leading-relaxed text-muted opacity-80">
              Capa do livro “Clamor por Justiça e Liberdade” (Cry for Justice and Freedom), obra em prelo de Capí Joy sobre justiça, liberdade, dignidade e o peso responsável de não se calar diante do que precisa mudar.
            </p>
          </div>
        </div>
      </section>

      <section className="section-card space-y-4 rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">Contexto Histórico</h2>
        <ul className="space-y-3">
          <li className="flex gap-3 text-sm text-muted">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]" />
            <span>Carta aberta ao povo de Porto Alegre (1992) como ponto de partida.</span>
          </li>
          <li className="flex gap-3 text-sm text-muted">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]" />
            <span>A constatação de que estruturas mudam lentamente, mas a fome por justiça permanece.</span>
          </li>
          <li className="flex gap-3 text-sm text-muted">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]" />
            <span>
              O olhar de 2025, mais maduro, entendendo que continuar lutando é uma escolha de consciência, não de
              orgulho.
            </span>
          </li>
        </ul>
      </section>

      <section className="section-card space-y-3 rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">Estrutura do livro</h2>
        <p className="text-sm text-muted">Títulos sugeridos — revelar aos poucos para manter curiosidade.</p>
        <div className="grid gap-2 md:grid-cols-2">
          {CHAPTERS.map(chapter => (
            <div key={chapter} className="rounded-2xl bg-black/15 px-4 py-3 text-sm text-muted">
              {chapter}
            </div>
          ))}
        </div>
      </section>

      <section className="section-card space-y-3 rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">Spoiler exclusivo</h2>
        <p className="text-sm text-muted">
          “Tudo começou quando percebi que havia coisas dentro de mim que não podiam mais ficar caladas. O silêncio
          estava doendo. A verdade começou a gritar — não contra pessoas, mas contra as prisões invisíveis da alma. Eu
          entendi que Deus não quer filhos acorrentados. Ele quer filhos livres. E liberdade começa com coragem.”
        </p>
      </section>

      <section className="section-card space-y-3 rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">Para quem é este livro?</h2>
        <ul className="space-y-2 text-sm text-muted">
          <li>• Para quem sente peso no peito.</li>
          <li>• Para quem busca respostas e não suporta mais silêncio.</li>
          <li>• Para quem quer reencontrar paz no meio da bagunça da vida.</li>
          <li>• Para quem quer um guia espiritual simples e verdadeiro.</li>
        </ul>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}/contato#captura`}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-[rgba(216,122,42,0.35)] transition hover:-translate-y-0.5 hover:bg-[var(--accent-soft)]"
          >
            Quero receber um trecho
          </Link>
          <Link
            href={`/${locale}/press-kit`}
            className="surface-button rounded-full px-5 py-3 text-sm font-semibold"
          >
            Press kit / releases
          </Link>
        </div>
        <p className="text-xs text-muted">
          Lead obrigatório: e-mail e nome antes de qualquer download. PDF não abre direto para garantir captação de
          contato.
        </p>
      </section>
    </div>
  );
}
