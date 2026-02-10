import type { Locale } from '@/i18n/locales';

export function localizePath(locale: Locale, path: string) {
  if (!path.startsWith('/')) path = '/' + path;
  const normalized = path === '/' ? '' : path;
  return `/${locale}${normalized}`;
}
