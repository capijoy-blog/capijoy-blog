import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getExperienceTopics } from '@/data/experiences';
import type { Locale } from '@/i18n/locales';
import { localizePath } from '@/lib/localePath';
import { absoluteUrl } from '@/lib/urls';

type Params = { locale: Locale };

const PROJECTS_META: Record<Locale, { title: string; description: string }> = {
  pt: {
    title: 'Projetos Capi Joy - musica, livro e series espirituais',
    description: 'Lista oficial de projetos de Capi Joy: BASTA, ALELUIA, livros, series e conferencias em andamento.'
  },
  en: {
    title: 'Capi Joy Projects - music, book and spiritual series',
    description: 'Official list of Capi Joy projects: BASTA, ALELUIA, books, series and ongoing conferences.'
  },
  es: {
    title: 'Proyectos de Capi Joy - musica, libro y series espirituales',
    description: 'Lista oficial de proyectos de Capi Joy: BASTA, ALELUIA, libros, series y conferencias en curso.'
  }
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = PROJECTS_META[locale] ?? PROJECTS_META.pt;
  const path = localizePath(locale, '/projetos');
  const url = absoluteUrl(path);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url
    }
  };
}

export default async function ProjetosPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projetos' });
  const topics = getExperienceTopics(locale);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-12">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">{t('header.title')}</p>
        <h1 className="text-3xl font-semibold">{t('header.title')}</h1>
        <p className="max-w-3xl text-base text-cj-textMuted">{t('header.description')}</p>
      </header>

      <section className="space-y-6 py-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">{t('lectures.tag')}</p>
          <h2 className="text-2xl font-semibold">{t('lectures.title')}</h2>
          <p className="max-w-3xl text-sm text-cj-textMuted">{t('lectures.description')}</p>
        </header>
        <div className="grid gap-6">
          {topics.map(topic => (
            <article key={topic.slug} className="section-card flex flex-col gap-4 rounded-3xl p-6 sm:p-8">
              <div>
                <h3 className="text-xl font-semibold text-cj-text md:text-2xl">{topic.title}</h3>
                {topic.theme && <p className="mt-1 text-sm font-medium uppercase tracking-wide text-cj-accent">{topic.theme}</p>}
              </div>
              <div className="whitespace-pre-line text-base leading-relaxed text-cj-textMuted">
                {topic.fullSummary.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}