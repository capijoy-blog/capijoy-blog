"use client";

import Link from 'next/link';
import { FaApple, FaFacebook, FaInstagram, FaSpotify, FaTiktok, FaYoutube } from 'react-icons/fa6';
import { useTranslations } from 'next-intl';

const SOCIALS = [
  { key: 'youtube', href: 'https://www.youtube.com/@dicapijoy', Icon: FaYoutube },
  { key: 'instagram', href: 'https://www.instagram.com/capijoy/', Icon: FaInstagram },
  { key: 'tiktok', href: 'https://www.tiktok.com/@capijoyoficial', Icon: FaTiktok },
  { key: 'facebook', href: 'https://www.facebook.com/CapiJoyOficial/', Icon: FaFacebook },
  { key: 'spotify', href: 'https://open.spotify.com/intl-pt/artist/6l2XVPCSpXi3oKheB3UvKI', Icon: FaSpotify },
  { key: 'apple', href: 'https://music.apple.com/br/artist/cap%C3%AD-joy/1831439555', Icon: FaApple }
] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-cj-border bg-cj-bgSoft">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-7 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-cj-textSoft">Capi Joy</p>
          <p className="text-sm text-cj-textMuted">
            {t('tagline')} {t('address')}.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="mailto:contato@capijoy.com.br" className="text-cj-textMuted underline transition-colors hover:text-cj-accent">
              contato@capijoy.com.br
            </Link>
            <span className="text-cj-textMuted">|</span>
            <Link
              href="https://wa.me/5537998765452?text=Ol%C3%A1%2C+vim+pelo+site+Cap%C3%AD+Joy+e+quero+saber+mais."
              className="text-cj-textMuted underline transition-colors hover:text-cj-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp +55 37 99876-5452
            </Link>
          </div>
          <p className="text-xs text-cj-textMuted">{t('copyright', { year: currentYear })}</p>
        </div>

        <ul className="ml-auto flex items-center gap-3 text-xl text-cj-accent transition sm:text-2xl">
          {SOCIALS.map(({ key, href, Icon }) => (
            <li key={key}>
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(`socials.${key}`)}
                className="inline-flex rounded-full p-2 transition-colors hover:bg-white/5 hover:text-cj-text"
              >
                <Icon aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
