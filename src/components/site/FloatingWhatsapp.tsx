import Link from 'next/link';
import {FaWhatsapp} from 'react-icons/fa6';

const MESSAGE =
  'Ol%C3%A1%2C+vim+pelo+site+Cap%C3%AD+Joy+e+quero+saber+mais+sobre+seus+projetos.';

export default function FloatingWhatsapp() {
  return (
    <Link
      href={`https://wa.me/5537998765452?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)]/90 px-4 py-3 text-sm font-semibold text-black shadow-2xl shadow-[rgba(216,122,42,0.35)] transition hover:translate-y-[-2px] hover:bg-[var(--accent-soft)] sm:px-5"
      aria-label="Conversar no WhatsApp"
    >
      <FaWhatsapp className="text-lg" aria-hidden />
      <span className="hidden sm:inline">WhatsApp</span>
    </Link>
  );
}
