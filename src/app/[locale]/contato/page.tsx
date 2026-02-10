import Link from 'next/link';
import type { Metadata } from 'next';
import { FaEnvelope, FaInstagram, FaSpotify, FaWhatsapp, FaYoutube } from 'react-icons/fa6';

import type { Locale } from '@/i18n/locales';
import { localizePath } from '@/lib/localePath';
import { absoluteUrl } from '@/lib/urls';

type Params = { locale: Locale };

type ContactCopy = {
  meta: {
    title: string;
    description: string;
  };
  header: {
    eyebrow: string;
    title: string;
    description: string;
  };
  form: {
    name: string;
    email: string;
    whatsapp: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    whatsappPlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    whatsappDirect: string;
    note: string;
  };
  officialChannels: {
    eyebrow: string;
  };
  agenda: {
    eyebrow: string;
    description: string;
  };
  whatsappDirectMessage: string;
  whatsappSocialMessage: string;
};

const CONTACT_COPY: Record<Locale, ContactCopy> = {
  pt: {
    meta: {
      title: 'Contato e Press Kit - Capi Joy | Parcerias, imprensa e projetos',
      description:
        'Fale com Capi Joy. Informacoes, press kit, convites, parcerias e contatos para imprensa e projetos profissionais.'
    },
    header: {
      eyebrow: 'Contato',
      title: 'Convites, parcerias e agenda',
      description:
        'Antes de liberar materiais exclusivos, capturamos contato. Nome e e-mail sao obrigatorios; WhatsApp e opcional.'
    },
    form: {
      name: 'Nome *',
      email: 'E-mail *',
      whatsapp: 'WhatsApp (opcional)',
      message: 'Mensagem',
      namePlaceholder: 'Seu nome',
      emailPlaceholder: 'seuemail@exemplo.com',
      whatsappPlaceholder: '+55 00 00000-0000',
      messagePlaceholder: 'Convite, imprensa, parceria ou pedido de trecho do livro.',
      submit: 'Enviar',
      whatsappDirect: 'WhatsApp direto',
      note: 'Formulario envia para contato@capijoy.com.br. O download do livro exige captura de contato.'
    },
    officialChannels: {
      eyebrow: 'Canais oficiais'
    },
    agenda: {
      eyebrow: 'Agenda',
      description:
        'Campo reservado para datas oficiais de eventos, conferencias e lancamentos. Estrutura pronta para receber conteudo assim que as datas forem confirmadas.'
    },
    whatsappDirectMessage: 'Ola, vim pelo site Capi Joy e preciso falar sobre projetos ou press.',
    whatsappSocialMessage: 'Ola, vim pelo site Capi Joy e quero falar com voce.'
  },
  en: {
    meta: {
      title: 'Contact and Press Kit - Capi Joy | Partnerships, media and projects',
      description:
        'Talk to Capi Joy. Information, press kit, invitations, partnerships and media contacts for professional projects.'
    },
    header: {
      eyebrow: 'Contact',
      title: 'Invites, partnerships and schedule',
      description:
        'Before releasing exclusive materials, we capture contact details. Name and email are required; WhatsApp is optional.'
    },
    form: {
      name: 'Name *',
      email: 'Email *',
      whatsapp: 'WhatsApp (optional)',
      message: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'youremail@example.com',
      whatsappPlaceholder: '+55 00 00000-0000',
      messagePlaceholder: 'Invite, press, partnership or request for a book excerpt.',
      submit: 'Send',
      whatsappDirect: 'Direct WhatsApp',
      note: 'Form sends to contato@capijoy.com.br. Book download requires lead capture.'
    },
    officialChannels: {
      eyebrow: 'Official channels'
    },
    agenda: {
      eyebrow: 'Schedule',
      description:
        'Reserved area for official event, conference and release dates. Structure is ready to receive content as soon as dates are confirmed.'
    },
    whatsappDirectMessage: 'Hello, I came from the Capi Joy website and need to talk about projects or press.',
    whatsappSocialMessage: 'Hello, I came from the Capi Joy website and want to talk with you.'
  },
  es: {
    meta: {
      title: 'Contacto y Press Kit - Capi Joy | Alianzas, prensa y proyectos',
      description:
        'Habla con Capi Joy. Informacion, press kit, invitaciones, alianzas y contactos de prensa para proyectos profesionales.'
    },
    header: {
      eyebrow: 'Contacto',
      title: 'Invitaciones, alianzas y agenda',
      description:
        'Antes de liberar materiales exclusivos, capturamos contacto. Nombre y correo son obligatorios; WhatsApp es opcional.'
    },
    form: {
      name: 'Nombre *',
      email: 'Correo *',
      whatsapp: 'WhatsApp (opcional)',
      message: 'Mensaje',
      namePlaceholder: 'Tu nombre',
      emailPlaceholder: 'tuemail@ejemplo.com',
      whatsappPlaceholder: '+55 00 00000-0000',
      messagePlaceholder: 'Invitacion, prensa, alianza o pedido de fragmento del libro.',
      submit: 'Enviar',
      whatsappDirect: 'WhatsApp directo',
      note: 'El formulario envia a contato@capijoy.com.br. La descarga del libro requiere captura de contacto.'
    },
    officialChannels: {
      eyebrow: 'Canales oficiales'
    },
    agenda: {
      eyebrow: 'Agenda',
      description:
        'Area reservada para fechas oficiales de eventos, conferencias y lanzamientos. Estructura lista para recibir contenido cuando las fechas esten confirmadas.'
    },
    whatsappDirectMessage: 'Hola, llegue desde el sitio de Capi Joy y necesito hablar sobre proyectos o prensa.',
    whatsappSocialMessage: 'Hola, llegue desde el sitio de Capi Joy y quiero hablar contigo.'
  }
};

const SOCIALS = [
  { label: 'WhatsApp', href: 'https://wa.me/5537998765452', Icon: FaWhatsapp },
  { label: 'Instagram', href: 'https://www.instagram.com/capijoy/', Icon: FaInstagram },
  { label: 'YouTube', href: 'https://www.youtube.com/@dicapijoy', Icon: FaYoutube },
  { label: 'Spotify', href: 'https://open.spotify.com/intl-pt/artist/6l2XVPCSpXi3oKheB3UvKI', Icon: FaSpotify }
] as const;

function withText(href: string, text: string) {
  return `${href}?text=${encodeURIComponent(text)}`;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = CONTACT_COPY[locale] ?? CONTACT_COPY.pt;
  const path = localizePath(locale, '/contato');
  const url = absoluteUrl(path);

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: {
      canonical: url
    }
  };
}

export default async function ContatoPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const copy = CONTACT_COPY[locale] ?? CONTACT_COPY.pt;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-12">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">{copy.header.eyebrow}</p>
        <h1 className="text-3xl font-semibold">{copy.header.title}</h1>
        <p className="text-base text-cj-textMuted">{copy.header.description}</p>
      </header>

      <form
        id="captura"
        action="mailto:contato@capijoy.com.br?subject=Contato%20via%20site%20Capi%20Joy"
        method="POST"
        encType="text/plain"
        className="section-card grid gap-3 rounded-3xl p-6"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm font-medium">
            {copy.form.name}
            <input type="text" name="name" required placeholder={copy.form.namePlaceholder} className="input-surface rounded-xl px-4 py-3 text-sm" />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium">
            {copy.form.email}
            <input
              type="email"
              name="email"
              required
              placeholder={copy.form.emailPlaceholder}
              className="input-surface rounded-xl px-4 py-3 text-sm"
            />
          </label>
        </div>
        <label className="flex flex-col gap-1 text-sm font-medium">
          {copy.form.whatsapp}
          <input type="tel" name="whatsapp" placeholder={copy.form.whatsappPlaceholder} className="input-surface rounded-xl px-4 py-3 text-sm" />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          {copy.form.message}
          <textarea
            name="message"
            rows={4}
            placeholder={copy.form.messagePlaceholder}
            className="input-surface rounded-xl px-4 py-3 text-sm"
            required
          />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-cj-textSoft"
          >
            {copy.form.submit}
          </button>
          <Link
            href={withText('https://wa.me/5537998765452', copy.whatsappDirectMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="surface-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
          >
            <FaWhatsapp aria-hidden />
            {copy.form.whatsappDirect}
          </Link>
        </div>
        <p className="text-xs text-cj-textMuted">{copy.form.note}</p>
      </form>

      <section className="section-card space-y-3 rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">{copy.officialChannels.eyebrow}</p>
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
          {SOCIALS.map(({ label, href, Icon }) => {
            const finalHref = label === 'WhatsApp' ? withText(href, copy.whatsappSocialMessage) : href;
            return (
              <Link
                key={label}
                href={finalHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cj-border px-4 py-2 text-sm font-semibold transition-colors hover:border-cj-accent"
              >
                <Icon aria-hidden />
                {label}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section-card space-y-3 rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-cj-accent">{copy.agenda.eyebrow}</p>
        <p className="text-sm text-cj-textMuted">{copy.agenda.description}</p>
      </section>
    </div>
  );
}