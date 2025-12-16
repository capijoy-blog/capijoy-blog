import { cn } from '@/lib/utils';

export default function MusicSeparator({ className }: { className?: string }) {
    return (
        <div className={cn('flex w-full items-center justify-center gap-1 overflow-hidden py-8 text-[var(--accent)]', className)} aria-hidden="true">
            {/* Generates a waveform pattern */}
            {[...Array(24)].map((_, i) => (
                <div
                    key={i}
                    className="bg-current w-1 rounded-full animate-music-pulse"
                    style={{
                        height: `${Math.max(20, Math.random() * 60)}px`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: `${0.8 + Math.random() * 0.5}s`
                    }}
                />
            ))}
        </div>
    );
}
