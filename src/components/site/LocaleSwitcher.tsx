"use client";

import { useTranslations } from 'next-intl';
import type { ChangeEvent } from 'react';

import { locales, type Locale } from '@/i18n/locales';
import { localizePath } from '@/lib/localePath';

export default function LocaleSwitcher({ value }: { value: Locale }) {
  const t = useTranslations('language');

  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    if (typeof window === 'undefined') return;

    const next = event.target.value as Locale;
    const pathname = window.location.pathname || '/';
    const parts = pathname.split('/').filter(Boolean);
    const hasLocalePrefix = parts.length > 0 && locales.includes(parts[0] as Locale);
    const pathWithoutLocale = hasLocalePrefix ? '/' + parts.slice(1).join('/') : pathname;
    const normalizedPath = pathWithoutLocale === '' ? '/' : pathWithoutLocale;
    const nextPath = localizePath(next, normalizedPath);

    window.location.assign(`${nextPath}${window.location.search || ''}${window.location.hash || ''}`);
  }

  return (
    <select
      value={value}
      onChange={onChange}
      className="rounded-full border border-cj-border bg-cj-surface px-3 py-2 text-sm text-cj-text transition-colors duration-300 hover:border-cj-accent"
      aria-label={t('title')}
    >
      {locales.map(locale => (
        <option key={locale} value={locale}>
          {t(locale)}
        </option>
      ))}
    </select>
  );
}
