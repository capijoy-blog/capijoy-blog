import type { Metadata } from 'next';

import type { Locale } from '@/i18n/locales';
import { absoluteUrl } from '@/lib/urls';
import { EXPERIENCES_CONFERENCE_TOPICS } from '@/data/experiences';

type Params = { locale: Locale };

type Project = {
  title: string;
  description: string;
  status: 'ativo' | 'em construção' | 'pronto para lançar';
  focus: string;
};

const PROJECTS: Project[] = [
  {
    title: 'BASTA',
    description: 'Single e performance com visual de palco cinematográfico. Protesto espiritual, coragem e verdade.',
    status: 'ativo',
    focus: 'Música e videoclipe'
  },
  {
    title: 'ALELUIA',
    description: 'Louvor íntimo que fala de fé simples, descanso e leveza espiritual.',
    status: 'ativo',
    focus: 'Música e devocional'
  },
  {
    title: 'Clamor por Justiça e Liberdade',
    description: 'Livro que nasceu da dor e da fé. Paz interna, liberdade externa e cura emocional prática.',
    status: 'pronto para lançar',
    focus: 'Livro / lead magnet'
  },
  {
    title: 'Liberdade e Paz, A Conexão',
    description: 'Série de encontros e mensagens que unem espiritualidade prática, relacionamentos e propósito.',
    status: 'em construção',
    focus: 'Série / conferência'
  },
  {
    title: 'O Retorno, Uma história que não deveria ter sido contada',
    description: 'Projeto narrativo intenso e transparente. Histórias difíceis que curam e inspiram outros.',
    status: 'em construção',
    focus: 'Narrativa / livro'
  },
  {
    title: 'Romanos 12:18 • Série Salmo 19',
    description: 'Conteúdos espirituais para jovens e adultos, com paz prática e caminhos para recomeçar.',
    status: 'em construção',
    focus: 'Mensagens e estudos'
  }
];

function statusColor(status: Project['status']) {
  switch (status) {
    case 'ativo':
      return 'bg-white text-black border border-white';
    case 'pronto para lançar':
      return 'bg-cj-textSoft text-black border border-cj-textSoft';
    default:
      return 'bg-cj-surface text-cj-textMuted border border-cj-border';
  }
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const path = `/${locale}/projetos`;
  const url = absoluteUrl(path);

  return {
    title: 'Projetos Capí Joy — música, livro e séries espirituais',
    description: 'Lista oficial de projetos de Capí Joy: BASTA, ALELUIA, livros, séries e conferências em andamento.',
    alternates: {
      canonical: url
    }
  };
}

export default async function ProjetosPage({ params }: { params: Promise<Params> }) {
  await params;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-12">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">Projetos</p>
        <h1 className="text-3xl font-semibold">Lista oficial de ajustes e entregas</h1>
        <p className="max-w-3xl text-base text-cj-textMuted">
          Tudo que está sendo construído para Capí Joy: músicas, livro, narrativas, conferências e materiais para IA,
          imprensa e produtores.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {PROJECTS.map(project => (
          <article key={project.title} className="section-card rounded-3xl p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-cj-textMuted">{project.description}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cj-accent">{project.focus}</p>
          </article>
        ))}
      </div>

      <section className="space-y-6 py-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">Palestras</p>
          <h2 className="text-2xl font-semibold">Mensagens e temas de palco</h2>
          <p className="max-w-3xl text-sm text-cj-textMuted">
            Conteúdo profundo para conferências, eventos e imersões. Cada mensagem é uma experiência de palavra, música e
            espiritualidade prática.
          </p>
        </header>
        <div className="grid gap-6">
          {EXPERIENCES_CONFERENCE_TOPICS.map(topic => (
            <article key={topic.slug} className="section-card flex flex-col gap-4 rounded-3xl p-6 sm:p-8">
              <div>
                <h3 className="text-xl font-semibold text-cj-text md:text-2xl">{topic.title}</h3>
                {topic.theme && (
                  <p className="mt-1 text-sm font-medium uppercase tracking-wide text-cj-accent">
                    {topic.theme}
                  </p>
                )}
              </div>
              <div className="text-base leading-relaxed text-cj-textMuted whitespace-pre-line">
                {topic.fullSummary.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>


    </div>
  );
}
