import type {MetadataRoute} from 'next';

import {locales} from '@/i18n/locales';
import {absoluteUrl} from '@/lib/urls';
import { localizePath } from '@/lib/localePath';

const PAGES = [
  '',
  '/sobre',
  '/musicas',
  '/projetos',
  '/livro',
  '/blog',
  '/contato',
  '/press-kit',
  '/ia',
  '/llm-capijoy'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return locales.flatMap(locale =>
    PAGES.map(path => ({
      url: absoluteUrl(localizePath(locale, path)),
      lastModified
    }))
  );
}
