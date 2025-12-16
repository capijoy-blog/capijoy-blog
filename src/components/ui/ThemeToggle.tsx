"use client";

import {useTranslations} from 'next-intl';
import {useTheme} from 'next-themes';
import {useEffect, useState} from 'react';

export function ThemeToggle() {
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('theme');

  useEffect(() => setMounted(true), []);

  const current = mounted ? theme ?? 'system' : 'system';

  return (
    <select
      value={current}
      onChange={event => setTheme(event.target.value)}
      className="rounded-full border border-[var(--surface-card-border)] bg-black/20 px-3 py-2 text-sm text-[var(--page-text)] transition-colors duration-300 hover:border-[var(--accent-soft)]"
      aria-label={t('label')}
      disabled={!mounted}
    >
      <option value="light">{t('light')}</option>
      <option value="dark">{t('dark')}</option>
      <option value="system">{t('system')}</option>
    </select>
  );
}
