"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

import LocaleSwitcher from '@/components/site/LocaleSwitcher';
import type { Locale } from '@/i18n/locales';

const NAV_LINKS = [
  { key: 'home', path: '#topo' },
  { key: 'about', path: '/sobre' },
  { key: 'music', path: '/musicas' },
  { key: 'projects', path: '/projetos' },
  { key: 'book', path: '/livro' },
  { key: 'blog', path: '/blog' },
  { key: 'faq', path: '#faq' },
  { key: 'press', path: '/press-kit' },
  { key: 'contact', path: '/contato', highlight: true }
] as const;

export default function Navbar({ locale }: { locale: Locale }) {
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

        // Base styles for all links
        const baseStyles = 'rounded-full px-4 py-2 font-medium transition-colors duration-200';

        // Conditional styles
        // Highlighted (Contact) -> Primary Button: White bg, Black text
        // Normal -> Text Soft, Hover Text White
        const accentStyles = 'highlight' in link && link.highlight
          ? 'bg-white text-black hover:bg-cj-textSoft'
          : 'text-cj-textSoft hover:text-cj-text hover:bg-white/5';

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
    <header className="sticky top-0 z-40 border-b border-cj-border bg-cj-bg/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3">
        <Link href={`/${locale}`} className="flex items-center gap-3" aria-label={t('home')}>
          <Image src="/assets/logo.svg" alt={t('logoAlt')} width={130} height={32} priority className="h-9 w-auto invert" />
          <span className="hidden text-xs uppercase tracking-[0.2em] text-cj-textMuted sm:inline">
            Capí Joy
          </span>
        </Link>

        {renderLinks('desktop')}

        <div className="ml-auto flex items-center gap-2">
          <LocaleSwitcher value={locale} />

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cj-border bg-cj-surface text-cj-text transition hover:border-cj-accent lg:hidden"
            onClick={() => setOpen(current => !current)}
            aria-label="Abrir menu"
            aria-expanded={open}
          >
            {open ? <FiX aria-hidden className="text-lg" /> : <FiMenu aria-hidden className="text-lg" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-cj-border bg-cj-bg/95 px-4 pb-5 pt-3 shadow-lg shadow-black/50">
          {renderLinks('mobile')}
        </div>
      )}
    </header>
  );
}
