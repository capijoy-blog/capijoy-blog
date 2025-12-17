import Link from 'next/link';
import type { Metadata } from 'next';
import { FaWhatsapp, FaEnvelope, FaInstagram, FaYoutube, FaSpotify } from 'react-icons/fa6';

import type { Locale } from '@/i18n/locales';
import { absoluteUrl } from '@/lib/urls';

type Params = { locale: Locale };

const SOCIALS = [
  { label: 'WhatsApp', href: 'https://wa.me/5537998765452?text=Ol%C3%A1%2C+vim+pelo+site+Cap%C3%AD+Joy+e+quero+falar+com+voc%C3%AA.', Icon: FaWhatsapp },
  { label: 'Instagram', href: 'https://www.instagram.com/capijoy/', Icon: FaInstagram },
  { label: 'YouTube', href: 'https://www.youtube.com/@dicapijoy', Icon: FaYoutube },
  { label: 'Spotify', href: 'https://open.spotify.com/intl-pt/artist/6l2XVPCSpXi3oKheB3UvKI', Icon: FaSpotify }
] as const;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const path = `/${locale}/contato`;
  const url = absoluteUrl(path);

  return {
    title: 'Contato e Press Kit — Capí Joy | Parcerias, Imprensa e Projetos',
    description:
      'Fale com Capí Joy. Informações, press kit, convites, parcerias e contatos para imprensa e projetos profissionais.',
    alternates: {
      canonical: url
    }
  };
}

export default async function ContatoPage({ params }: { params: Promise<Params> }) {
  await params; // locale not used besides metadata

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-12">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">Contato</p>
        <h1 className="text-3xl font-semibold">Convites, parcerias e agenda</h1>
        <p className="text-base text-cj-textMuted">
          Nada de alto valor sai de graça: antes de liberar materiais exclusivos, capturamos o contato. Nome e e-mail
          são obrigatórios; WhatsApp é opcional.
        </p>
      </header>

      <form
        id="captura"
        action="mailto:contato@capijoy.com.br?subject=Contato%20via%20site%20Cap%C3%AD%20Joy"
        method="POST"
        encType="text/plain"
        className="section-card grid gap-3 rounded-3xl p-6"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm font-medium">
            Nome *
            <input
              type="text"
              name="name"
              required
              placeholder="Seu nome"
              className="input-surface rounded-xl px-4 py-3 text-sm"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium">
            E-mail *
            <input
              type="email"
              name="email"
              required
              placeholder="seuemail@exemplo.com"
              className="input-surface rounded-xl px-4 py-3 text-sm"
            />
          </label>
        </div>
        <label className="flex flex-col gap-1 text-sm font-medium">
          WhatsApp (opcional)
          <input
            type="tel"
            name="whatsapp"
            placeholder="+55 00 00000-0000"
            className="input-surface rounded-xl px-4 py-3 text-sm"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Mensagem
          <textarea
            name="message"
            rows={4}
            placeholder="Convite, press, parceria ou pedido de trecho do livro."
            className="input-surface rounded-xl px-4 py-3 text-sm"
            required
          />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-cj-textSoft"
          >
            Enviar
          </button>
          <Link
            href="https://wa.me/5537998765452?text=Ol%C3%A1%2C+vim+pelo+site+Cap%C3%AD+Joy+e+preciso+falar+sobre+projetos+ou+press."
            target="_blank"
            rel="noopener noreferrer"
            className="surface-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
          >
            <FaWhatsapp aria-hidden />
            WhatsApp direto
          </Link>
        </div>
        <p className="text-xs text-cj-textMuted">
          Testado: formulário envia para contato@capijoy.com.br. O download do livro não abre sem capturar contato.
        </p>
      </form>

      <section className="section-card space-y-3 rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">Canais oficiais</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-2xl bg-cj-surface px-4 py-3 text-sm text-cj-textMuted">
            <FaEnvelope aria-hidden />
            contato@capijoy.com.br
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-cj-surface px-4 py-3 text-sm text-cj-textMuted">
            <FaWhatsapp aria-hidden />
            +55 (37) 99876-5452
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {SOCIALS.map(({ label, href, Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cj-border px-4 py-2 text-sm font-semibold hover:border-cj-accent transition-colors"
            >
              <Icon aria-hidden />
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="section-card space-y-3 rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">Agenda</p>
        <p className="text-sm text-cj-textMuted">
          Campo reservado para datas oficiais de eventos, conferências e lançamentos. Estrutura pronta para receber
          conteúdo assim que as datas forem confirmadas.
        </p>
      </section>
    </div>
  );
}
