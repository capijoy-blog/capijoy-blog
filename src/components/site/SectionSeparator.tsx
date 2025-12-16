import { cn } from '@/lib/utils';
import { FaFingerprint, FaPenNib, FaHashtag, FaMusic } from 'react-icons/fa6';

type SeparatorVariant = 'music' | 'life' | 'book' | 'social' | 'default';

interface SectionSeparatorProps {
    variant?: SeparatorVariant;
    className?: string;
}

export default function SectionSeparator({ variant = 'default', className }: SectionSeparatorProps) {
    return (
        <div className={cn('w-full py-10 flex items-center justify-center overflow-hidden', className)} aria-hidden="true">
            {variant === 'music' && <MusicVariant />}
            {variant === 'life' && <LifeVariant />}
            {variant === 'book' && <BookVariant />}
            {variant === 'social' && <SocialVariant />}
            {variant === 'default' && <MusicVariant />}
        </div>
    );
}

function MusicVariant() {
    return (
        <div className="flex items-center gap-1 text-[var(--accent)] h-12">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="w-1 bg-current rounded-full animate-music-pulse"
                    style={{
                        height: `${Math.max(16, Math.random() * 48)}px`,
                        animationDelay: `${i * 0.05}s`,
                        animationDuration: `${0.6 + Math.random() * 0.4}s`,
                        opacity: Math.random() * 0.5 + 0.5
                    }}
                />
            ))}
        </div>
    );
}

function LifeVariant() {
    return (
        <div className="relative w-full max-w-lg h-24 flex items-center justify-center">
            {/* EKG / Heartbeat Line SVG */}
            <svg viewBox="0 0 500 100" className="w-full h-full stroke-[var(--accent)] fill-none overflow-visible">
                <path
                    d="M0,50 L200,50 L210,50 L215,20 L225,80 L235,50 L245,50 L250,50 L300,50"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-40"
                />
                <path
                    d="M0,50 L200,50 L210,50 L215,20 L225,80 L235,50 L245,50 L250,50 L300,50"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-ekg-path stroke-[var(--accent)]"
                    style={{ filter: 'drop-shadow(0 0 8px var(--accent))' }}
                />
            </svg>
        </div>
    );
}

function BookVariant() {
    return (
        <div className="flex items-center gap-4 text-[var(--accent)] opacity-80">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-current" />
            <FaPenNib className="text-xl animate-pulse" />
            <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-current" />
        </div>
    );
}

function SocialVariant() {
    return (
        <div className="flex gap-3 text-[var(--accent)]">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-current animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                />
            ))}
        </div>
    );
}
