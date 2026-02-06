'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa6';

type Props = {
    videoUrl: string;
    coverImage?: string;
    title: string;
};

export default function VideoPlayer({ videoUrl, coverImage, title }: Props) {
    const [isPlaying, setIsPlaying] = useState(false);

    // Helper to ensure we use the embed URL
    const getEmbedUrl = (url: string) => {
        if (url.includes('embed/')) return url;
        const v = url.split('v=')[1];
        if (v) {
            const id = v.split('&')[0];
            return `https://www.youtube.com/embed/${id}?autoplay=1`;
        }
        return url;
    };

    const finalUrl = getEmbedUrl(videoUrl);

    if (isPlaying || !coverImage) {
        return (
            <div className="overflow-hidden rounded-2xl aspect-video bg-black">
                <iframe
                    width="100%"
                    height="100%"
                    src={isPlaying ? finalUrl : finalUrl.replace('?autoplay=1', '')}
                    title={title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                />
            </div>
        );
    }

    return (
        <div
            className="group relative aspect-video w-full overflow-hidden rounded-2xl cursor-pointer"
            onClick={() => setIsPlaying(true)}
        >
            <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl transition-transform duration-300 group-hover:scale-110">
                    <FaPlay className="ml-1 text-2xl text-black" />
                </div>
            </div>
        </div>
    );
}
