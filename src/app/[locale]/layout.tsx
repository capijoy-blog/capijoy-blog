import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { ReactNode } from 'react';
import { locales, type Locale, defaultLocale } from '@/i18n/locales';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';


import JsonLdPerson from '@/components/seo/JsonLdPerson';
import FloatingWhatsapp from '@/components/site/FloatingWhatsapp';

type Params = { locale: string };

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<Params>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;
  const messages = await getMessages({ locale });
  const safeLocale = locale ?? defaultLocale;

  return (

    <NextIntlClientProvider locale={safeLocale} messages={messages}>
      <JsonLdPerson />
      <div className="flex min-h-dvh flex-col">
        <Navbar locale={safeLocale} />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsapp />
      </div>
    </NextIntlClientProvider>

  );
}
