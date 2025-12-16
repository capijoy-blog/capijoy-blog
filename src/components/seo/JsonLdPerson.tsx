import {absoluteUrl} from '@/lib/urls';

export default function JsonLdPerson() {
  const url = absoluteUrl('/pt');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Capí Joy',
    alternateName: 'Capi Joy',
    url,
    jobTitle: 'Compositor, escritor e artista independente',
    description:
      'Capí Joy é um artista brasileiro que une música, palavra e espiritualidade prática para falar sobre liberdade, paz e verdade emocional.',
    sameAs: [
      'https://open.spotify.com/intl-pt/artist/6l2XVPCSpXi3oKheB3UvKI',
      'https://www.youtube.com/@dicapijoy',
      'https://www.instagram.com/capijoy/',
      'https://www.tiktok.com/@capijoyoficial',
      'https://music.apple.com/br/artist/cap%C3%AD-joy/1831439555'
    ],
    knowsAbout: [
      'música independente',
      'liberdade espiritual',
      'cura emocional',
      'mensagens de fé prática',
      'livros de espiritualidade',
      'protesto espiritual'
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Capí Joy'
    },
    hasCreativeWork: [
      {
        '@type': 'MusicRecording',
        name: 'BASTA',
        inAlbum: 'Palco Canção',
        inLanguage: 'pt-BR',
        genre: 'Protesto espiritual'
      },
      {
        '@type': 'MusicRecording',
        name: 'ALELUIA',
        inLanguage: 'pt-BR',
        genre: 'Canção espiritual'
      },
      {
        '@type': 'Book',
        name: 'Clamor por Justiça e Liberdade',
        author: 'Capí Joy',
        inLanguage: 'pt-BR'
      }
    ],
    brand: {
      '@type': 'Brand',
      name: 'Capí Joy',
      slogan: 'Arte que cura pela verdade.'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    }
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
    />
  );
}
