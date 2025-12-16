"use client";

import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';
import {FiMenu, FiX} from 'react-icons/fi';
import {useTranslations} from 'next-intl';
import {ThemeToggle} from '@/components/ui/ThemeToggle';
import LocaleSwitcher from '@/components/site/LocaleSwitcher';
import type {Locale} from '@/i18n/locales';

const NAV_LINKS = [
  {key: 'home', path: '#topo'},
  {key: 'about', path: '/sobre'},
  {key: 'music', path: '/musicas'},
  {key: 'projects', path: '/projetos'},
  {key: 'book', path: '/livro'},
  {key: 'blog', path: '/blog'},
  {key: 'faq', path: '#faq'},
  {key: 'press', path: '/press-kit'},
  {key: 'contact', path: '/contato', highlight: true}
] as const;

export default function Navbar({locale}: {locale: Locale}) {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);

  const renderLinks = (variant: 'desktop' | 'mobile') => (
    <nav
      className={
        variant === 'desktop'
          ? 'hidden flex-1 items-center justify-center gap-4 text-sm lg:flex'
          : 'flex flex-col gap-2 text-sm'
      }
    >
      {NAV_LINKS.map(link => {
        const href =
          link.path.startsWith('#') ? `/${locale}${link.path}` : `/${locale}${link.path}`;
        const baseStyles =
          'rounded-full px-3 py-2 font-medium transition hover:text-[var(--accent-soft)]';
        const accentStyles = link.highlight
          ? 'bg-[var(--accent)] text-black shadow-lg shadow-[rgba(216,122,42,0.35)] hover:bg-[var(--accent-soft)]'
          : 'text-[var(--page-text)]/85 hover:bg-white/5';

        return (
          <Link
            key={link.key}
            href={href}
            className={`${baseStyles} ${accentStyles}`}
            onClick={() => setOpen(false)}
          >
            {t(link.key)}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--surface-card-border)] bg-[var(--header-bg)]/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3">
        <Link href={`/${locale}`} className="flex items-center gap-3" aria-label={t('home')}>
          <Image src="/assets/logo.svg" alt={t('logoAlt')} width={130} height={32} priority className="h-9 w-auto" />
          <span className="hidden text-xs uppercase tracking-[0.2em] text-muted sm:inline">
            Capí Joy
          </span>
        </Link>

        {renderLinks('desktop')}

        <div className="ml-auto flex items-center gap-2">
          <LocaleSwitcher value={locale} />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--surface-card-border)] bg-black/10 text-[var(--page-text)] transition hover:border-[var(--accent-soft)] lg:hidden"
            onClick={() => setOpen(current => !current)}
            aria-label="Abrir menu"
            aria-expanded={open}
          >
            {open ? <FiX aria-hidden className="text-lg" /> : <FiMenu aria-hidden className="text-lg" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[var(--surface-card-border)] bg-[var(--page-bg)]/95 px-4 pb-5 pt-3 shadow-lg shadow-black/20">
          {renderLinks('mobile')}
        </div>
      )}
    </header>
  );
}
