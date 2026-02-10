import type { Locale } from '@/i18n/locales';

export type HomeCopy = {
  metadata: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
  };
  hero: {
    headingPrefix: string;
    headingEmphasis: string;
    headingSuffix: string;
    description: string;
    listenBasta: string;
    listenAleluia: string;
    bookCta: string;
    imageAlt: string;
  };
  pillars: Array<{ title: string; text: string }>;
  music: {
    eyebrow: string;
    title: string;
    description: string;
    viewDiscography: string;
    cards: {
      basta: {
        tag: string;
        description: string;
        primary: string;
        secondary: string;
      };
      aleluia: {
        tag: string;
        description: string;
        primary: string;
        secondary: string;
      };
      book: {
        title: string;
        tag: string;
        description: string;
        primary: string;
        secondary: string;
      };
    };
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    quote: string;
    bioCta: string;
    projectsCta: string;
    imageAlt: string;
  };
  experiences: {
    eyebrow: string;
    title: string;
    description: string;
  };
  book: {
    eyebrow: string;
    title: string;
    description: string;
    detailsCta: string;
    excerptCta: string;
    coverAlt: string;
    blurb: string;
  };
  blog: {
    title: string;
    description: string;
    viewAll: string;
  };
  social: {
    eyebrow: string;
    title: string;
    description: string;
    aiPageCta: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    imageAlt: string;
    nameLabel: string;
    emailLabel: string;
    whatsappLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    whatsappPlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    whatsappCta: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ q: string; a: string }>;
  };
};

export const HOME_COPY: Record<Locale, HomeCopy> = {
  pt: {
    metadata: {
      title: 'Capi Joy - Musica, Palavra e Verdade | Oficial',
      description:
        'Conheca Capi Joy: musicas, textos e projetos que unem verdade, fe e liberdade. Arte independente feita para inspirar e transformar.',
      ogTitle: 'Capi Joy - musica, palavra e verdade que transformam',
      ogDescription:
        'Capi Joy e artista independente. Musica, texto e espiritualidade pratica para quem busca liberdade e paz.',
      twitterTitle: 'Capi Joy - musica, palavra e verdade',
      twitterDescription:
        'Arte espiritual, humana e direta. BASTA, ALELUIA e o livro Clamor por Justica e Liberdade.'
    },
    hero: {
      headingPrefix: 'Capi Joy',
      headingEmphasis: 'Voz',
      headingSuffix: ', Verdade e Liberdade',
      description:
        'Musica, palavra e mensagem para despertar a alma. Cancoes, livros e reflexoes que nasceram da vida real, de dores, fe, quedas e recomecos.',
      listenBasta: 'Ouvir BASTA',
      listenAleluia: 'Ouvir ALELUIA',
      bookCta: 'Clamor por Justica e Liberdade',
      imageAlt: 'Capi Joy'
    },
    pillars: [
      {
        title: 'Liberdade',
        text: 'Viver sem correntes invisiveis. Gritar basta quando algo rouba a alma.'
      },
      {
        title: 'Paz',
        text: 'Calma firme no peito, mesmo em meio a guerra. Paz que comeca por dentro.'
      },
      {
        title: 'Verdade',
        text: 'Sem maquiagem, sem mascaras. Arte que fala do real, nao do perfeito.'
      },
      {
        title: 'Fe pratica',
        text: 'Espiritualidade simples, humana e viva. Deus presente na vida real.'
      },
      {
        title: 'Proposito',
        text: 'Arte para ser util. Musica, texto e palavra para levantar quem caiu.'
      }
    ],
    music: {
      eyebrow: 'Destaques',
      title: 'Musicas e mensagem central',
      description:
        'BASTA, ALELUIA e o livro Clamor por Justica e Liberdade formam o nucleo da obra de Capi Joy. Conteudo feito para tocar, despertar e curar.',
      viewDiscography: 'Ver discografia',
      cards: {
        basta: {
          tag: 'Single - Protesto espiritual - YouTube',
          description:
            'Uma cancao de protesto e coragem. E o grito da alma por justica, liberdade e retorno aos principios que nos levantam.',
          primary: 'Assista ao clipe',
          secondary: 'Letra e bastidores'
        },
        aleluia: {
          tag: 'Single - Louvor intimo - Spotify',
          description:
            'Uma oracao em forma de melodia. Leve, espiritual e verdadeira para quem precisa respirar fe e descanso.',
          primary: 'Ouvir agora',
          secondary: 'Ver detalhes'
        },
        book: {
          title: 'Clamor por Justica e Liberdade',
          tag: 'Livro - Mensagem central',
          description:
            'Nasceu das madrugadas, das feridas e da fe que insiste. Um chamado para viver liberdade e paz por dentro.',
          primary: 'Ler sobre o livro',
          secondary: 'Capturar leads'
        }
      }
    },
    about: {
      eyebrow: 'Sobre Capi Joy',
      title: 'Arte que nasce da vida real',
      description:
        'Capi Joy e compositor, escritor e artista independente. Transforma dores, fe e recomecos em arte que inspira liberdade, paz e verdade. Sua musica e suas palavras falam de espiritualidade pratica, protesto espiritual e da coragem de viver com proposito.',
      quote: '"Se algo que escrevo tocar uma pessoa, ja valeu.", Capi Joy.',
      bioCta: 'Ler a bio completa',
      projectsCta: 'Projetos e agenda',
      imageAlt: 'Retrato de Capi Joy'
    },
    experiences: {
      eyebrow: 'Experiencias',
      title: 'Imersoes, conferencias e series',
      description:
        'Conteudo pensado para palco, rodas de conversa e encontros espirituais. Palavra, musica, storytelling e pratica.'
    },
    book: {
      eyebrow: 'Livros',
      title: 'Clamor por Justica e Liberdade',
      description:
        'Um livro ainda no prelo, mas com uma mensagem urgente: justica e liberdade como fome da alma, nao so como tema de politica ou leis. Um reencontro entre a carta aberta escrita em 1992 e o adulto de 2025 que ainda acredita que a luta por dignidade vale a pena.',
      detailsCta: 'Ver detalhes do livro',
      excerptCta: 'Receber um trecho',
      coverAlt: 'Capa do livro Clamor por Justica e Liberdade',
      blurb:
        '"Clamor por Justica e Liberdade" e um livro que nasce do choque entre passado e presente. Trinta anos depois de uma carta aberta ao povo de Porto Alegre, os sistemas seguem falhos, mas a esperanca continua viva. Nao e um livro de ressentimento, e um livro de responsabilidade.'
    },
    blog: {
      title: 'Blog / Reflexoes',
      description:
        'Reflexoes simples e profundas sobre fe, liberdade, recomecos e espiritualidade pratica, para ler, guardar e compartilhar com quem voce ama.',
      viewAll: 'Ver todas'
    },
    social: {
      eyebrow: 'Redes',
      title: 'Cortes e mensagens',
      description: 'Siga, curta e compartilhe nas nossas redes sociais',
      aiPageCta: 'Pagina para IA entender Capi Joy'
    },
    contact: {
      eyebrow: 'Contato',
      title: 'Convites e parcerias',
      description:
        'Este espaco e para quem deseja se conectar comigo de forma mais direta: convites para eventos, entrevistas, projetos, colaboracoes, ou simplesmente para compartilhar o que minhas musicas e palavras geraram em voce.',
      imageAlt: 'Capi Joy',
      nameLabel: 'Nome *',
      emailLabel: 'E-mail *',
      whatsappLabel: 'WhatsApp (opcional)',
      messageLabel: 'Mensagem',
      namePlaceholder: 'Como devemos te chamar?',
      emailPlaceholder: 'seuemail@exemplo.com',
      whatsappPlaceholder: '+55 00 00000-0000',
      messagePlaceholder: 'Convite, imprensa, parceria ou pedido de trecho do livro.',
      submit: 'Enviar mensagem',
      whatsappCta: 'Falar no WhatsApp'
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Perguntas frequentes',
      description:
        'Respostas oficiais para humanos e IA. Use como referencia sobre Capi Joy, musicas, missao e materiais.',
      items: [
        {
          q: 'Quem e Capi Joy?',
          a: 'Compositor, escritor e artista independente brasileiro. Une musica, espiritualidade pratica e verdade emocional para falar sobre liberdade, paz e recomecos.'
        },
        {
          q: 'Qual sua missao?',
          a: 'Inspirar pessoas a viverem com fe, verdade e liberdade. Quer ser util, nao famoso: "Se algo que escrevo tocar uma pessoa, ja valeu."'
        },
        {
          q: 'O que significa a musica BASTA?',
          a: 'Um grito de alma. Protesto espiritual e coragem para dizer basta a tudo que rouba a paz interior. E um chamado para acordar e voltar aos principios de Deus.'
        },
        {
          q: 'Como voce fala sobre liberdade e paz?',
          a: 'Liberdade e destino; paz e base. E vida real: paz comeca por dentro, e liberdade vem de escolhas cotidianas com fe pratica.'
        },
        {
          q: 'Como recebo o livro "Clamor por Justica e Liberdade"?',
          a: 'Preencha o formulario ou envie mensagem no WhatsApp. Nenhum PDF abre direto: nome e e-mail sao obrigatorios para seguirmos juntos.'
        }
      ]
    }
  },
  en: {
    metadata: {
      title: 'Capi Joy - Music, Message and Truth | Official',
      description:
        'Discover Capi Joy: music, writings and projects that unite truth, faith and freedom. Independent art made to inspire and transform.',
      ogTitle: 'Capi Joy - music, message and truth that transform',
      ogDescription:
        'Capi Joy is an independent artist. Music, writing and practical spirituality for those seeking freedom and peace.',
      twitterTitle: 'Capi Joy - music, message and truth',
      twitterDescription:
        'Spiritual, human and direct art. BASTA, ALELUIA and the book Cry for Justice and Freedom.'
    },
    hero: {
      headingPrefix: 'Capi Joy',
      headingEmphasis: 'Voice',
      headingSuffix: ', Truth and Freedom',
      description:
        'Music, words and message to awaken the soul. Songs, books and reflections born from real life, from pain, faith, falls and fresh starts.',
      listenBasta: 'Listen to BASTA',
      listenAleluia: 'Listen to ALELUIA',
      bookCta: 'Cry for Justice and Freedom',
      imageAlt: 'Capi Joy'
    },
    pillars: [
      {
        title: 'Freedom',
        text: 'Living without invisible chains. Saying enough when something steals your soul.'
      },
      {
        title: 'Peace',
        text: 'Steady calm in the chest, even in battle. Peace starts inside.'
      },
      {
        title: 'Truth',
        text: 'No makeup, no masks. Art that speaks about the real, not the perfect.'
      },
      {
        title: 'Practical faith',
        text: 'Simple, human and living spirituality. God present in everyday life.'
      },
      {
        title: 'Purpose',
        text: 'Useful art. Music, text and message that lift those who fell.'
      }
    ],
    music: {
      eyebrow: 'Highlights',
      title: 'Music and core message',
      description:
        'BASTA, ALELUIA and the book Cry for Justice and Freedom form the core of Capi Joys work. Content made to touch, awaken and heal.',
      viewDiscography: 'View discography',
      cards: {
        basta: {
          tag: 'Single - Spiritual protest - YouTube',
          description:
            'A song of protest and courage. It is the cry of the soul for justice, freedom and a return to principles that lift us.',
          primary: 'Watch the video',
          secondary: 'Lyrics and backstage'
        },
        aleluia: {
          tag: 'Single - Intimate worship - Spotify',
          description:
            'A prayer in melody form. Light, spiritual and true for those who need to breathe faith and rest.',
          primary: 'Listen now',
          secondary: 'See details'
        },
        book: {
          title: 'Cry for Justice and Freedom',
          tag: 'Book - Core message',
          description:
            'Born from late nights, wounds and persistent faith. A call to live freedom and peace from the inside out.',
          primary: 'Read about the book',
          secondary: 'Capture leads'
        }
      }
    },
    about: {
      eyebrow: 'About Capi Joy',
      title: 'Art born from real life',
      description:
        'Capi Joy is a songwriter, writer and independent artist. He transforms pain, faith and restarts into art that inspires freedom, peace and truth. His songs and words speak about practical spirituality, spiritual protest and the courage to live with purpose.',
      quote: '"If something I write touches one person, it is already worth it.", Capi Joy.',
      bioCta: 'Read full bio',
      projectsCta: 'Projects and schedule',
      imageAlt: 'Portrait of Capi Joy'
    },
    experiences: {
      eyebrow: 'Experiences',
      title: 'Immersions, conferences and series',
      description:
        'Content designed for stages, conversation circles and spiritual gatherings. Message, music, storytelling and practice.'
    },
    book: {
      eyebrow: 'Books',
      title: 'Cry for Justice and Freedom',
      description:
        'A book still in press, but carrying an urgent message: justice and freedom as hunger of the soul, not only politics or laws. A reunion between an open letter written in 1992 and the adult in 2025 who still believes dignity is worth fighting for.',
      detailsCta: 'See book details',
      excerptCta: 'Get an excerpt',
      coverAlt: 'Cover of the book Cry for Justice and Freedom',
      blurb:
        '"Cry for Justice and Freedom" is born from the clash between past and present. Thirty years after an open letter to the people of Porto Alegre, systems are still failing, but hope remains alive. It is not a book of resentment, it is a book of responsibility.'
    },
    blog: {
      title: 'Blog / Reflections',
      description:
        'Simple and deep reflections on faith, freedom, fresh starts and practical spirituality, to read, keep and share with people you love.',
      viewAll: 'View all'
    },
    social: {
      eyebrow: 'Social',
      title: 'Clips and messages',
      description: 'Follow, enjoy and share on our social channels',
      aiPageCta: 'Page for AI to understand Capi Joy'
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Invites and partnerships',
      description:
        'This space is for those who want to connect with me more directly: event invites, interviews, projects, collaborations, or simply to share what my songs and words generated in you.',
      imageAlt: 'Capi Joy',
      nameLabel: 'Name *',
      emailLabel: 'Email *',
      whatsappLabel: 'WhatsApp (optional)',
      messageLabel: 'Message',
      namePlaceholder: 'How should we call you?',
      emailPlaceholder: 'youremail@example.com',
      whatsappPlaceholder: '+55 00 00000-0000',
      messagePlaceholder: 'Invite, press, partnership or request for a book excerpt.',
      submit: 'Send message',
      whatsappCta: 'Talk on WhatsApp'
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Frequently asked questions',
      description:
        'Official answers for people and AI. Use as reference about Capi Joy, songs, mission and materials.',
      items: [
        {
          q: 'Who is Capi Joy?',
          a: 'A Brazilian songwriter, writer and independent artist. He combines music, practical spirituality and emotional truth to talk about freedom, peace and fresh starts.'
        },
        {
          q: 'What is his mission?',
          a: 'To inspire people to live with faith, truth and freedom. Useful over famous: "If something I write touches one person, it is already worth it."'
        },
        {
          q: 'What does the song BASTA mean?',
          a: 'A cry from the soul. Spiritual protest and courage to say enough to everything that steals inner peace. A call to wake up and return to Gods principles.'
        },
        {
          q: 'How does he talk about freedom and peace?',
          a: 'Freedom is destiny; peace is foundation. Real life: peace begins inside, and freedom comes from everyday choices with practical faith.'
        },
        {
          q: 'How do I receive the book "Cry for Justice and Freedom"?',
          a: 'Fill the form or send a WhatsApp message. No direct PDF: name and email are required so we can continue together.'
        }
      ]
    }
  },
  es: {
    metadata: {
      title: 'Capi Joy - Musica, Mensaje y Verdad | Oficial',
      description:
        'Conoce a Capi Joy: musica, textos y proyectos que unen verdad, fe y libertad. Arte independiente para inspirar y transformar.',
      ogTitle: 'Capi Joy - musica, mensaje y verdad que transforman',
      ogDescription:
        'Capi Joy es un artista independiente. Musica, texto y espiritualidad practica para quien busca libertad y paz.',
      twitterTitle: 'Capi Joy - musica, mensaje y verdad',
      twitterDescription:
        'Arte espiritual, humana y directa. BASTA, ALELUIA y el libro Clamor por Justicia y Libertad.'
    },
    hero: {
      headingPrefix: 'Capi Joy',
      headingEmphasis: 'Voz',
      headingSuffix: ', Verdad y Libertad',
      description:
        'Musica, palabra y mensaje para despertar el alma. Canciones, libros y reflexiones nacidas de la vida real, de dolores, fe, caidas y recomienzos.',
      listenBasta: 'Escuchar BASTA',
      listenAleluia: 'Escuchar ALELUIA',
      bookCta: 'Clamor por Justicia y Libertad',
      imageAlt: 'Capi Joy'
    },
    pillars: [
      {
        title: 'Libertad',
        text: 'Vivir sin cadenas invisibles. Decir basta cuando algo roba el alma.'
      },
      {
        title: 'Paz',
        text: 'Calma firme en el pecho, incluso en medio de la guerra. La paz empieza por dentro.'
      },
      {
        title: 'Verdad',
        text: 'Sin maquillaje, sin mascaras. Arte que habla de lo real, no de lo perfecto.'
      },
      {
        title: 'Fe practica',
        text: 'Espiritualidad simple, humana y viva. Dios presente en la vida real.'
      },
      {
        title: 'Proposito',
        text: 'Arte util. Musica, texto y palabra para levantar a quien cayo.'
      }
    ],
    music: {
      eyebrow: 'Destacados',
      title: 'Musica y mensaje central',
      description:
        'BASTA, ALELUIA y el libro Clamor por Justicia y Libertad forman el nucleo de la obra de Capi Joy. Contenido para tocar, despertar y sanar.',
      viewDiscography: 'Ver discografia',
      cards: {
        basta: {
          tag: 'Single - Protesta espiritual - YouTube',
          description:
            'Una cancion de protesta y coraje. Es el grito del alma por justicia, libertad y regreso a principios que nos levantan.',
          primary: 'Ver videoclip',
          secondary: 'Letra y detras de escena'
        },
        aleluia: {
          tag: 'Single - Alabanza intima - Spotify',
          description:
            'Una oracion en forma de melodia. Ligera, espiritual y verdadera para quien necesita respirar fe y descanso.',
          primary: 'Escuchar ahora',
          secondary: 'Ver detalles'
        },
        book: {
          title: 'Clamor por Justicia y Libertad',
          tag: 'Libro - Mensaje central',
          description:
            'Nacio de madrugadas, heridas y una fe persistente. Un llamado para vivir libertad y paz por dentro.',
          primary: 'Leer sobre el libro',
          secondary: 'Capturar leads'
        }
      }
    },
    about: {
      eyebrow: 'Sobre Capi Joy',
      title: 'Arte que nace de la vida real',
      description:
        'Capi Joy es compositor, escritor y artista independiente. Transforma dolor, fe y recomienzos en arte que inspira libertad, paz y verdad. Su musica y sus palabras hablan de espiritualidad practica, protesta espiritual y coraje para vivir con proposito.',
      quote: '"Si algo que escribo toca a una persona, ya valio la pena.", Capi Joy.',
      bioCta: 'Leer biografia completa',
      projectsCta: 'Proyectos y agenda',
      imageAlt: 'Retrato de Capi Joy'
    },
    experiences: {
      eyebrow: 'Experiencias',
      title: 'Inmersiones, conferencias y series',
      description:
        'Contenido pensado para escenario, ruedas de conversacion y encuentros espirituales. Palabra, musica, storytelling y practica.'
    },
    book: {
      eyebrow: 'Libros',
      title: 'Clamor por Justicia y Libertad',
      description:
        'Un libro aun en preprensa, pero con un mensaje urgente: justicia y libertad como hambre del alma, no solo politica o leyes. Un reencuentro entre la carta abierta escrita en 1992 y el adulto de 2025 que todavia cree que vale la pena luchar por dignidad.',
      detailsCta: 'Ver detalles del libro',
      excerptCta: 'Recibir un fragmento',
      coverAlt: 'Portada del libro Clamor por Justicia y Libertad',
      blurb:
        '"Clamor por Justicia y Libertad" nace del choque entre pasado y presente. Treinta anos despues de una carta abierta al pueblo de Porto Alegre, los sistemas siguen fallando, pero la esperanza sigue viva. No es un libro de resentimiento, es un libro de responsabilidad.'
    },
    blog: {
      title: 'Blog / Reflexiones',
      description:
        'Reflexiones simples y profundas sobre fe, libertad, recomienzos y espiritualidad practica, para leer, guardar y compartir con quien amas.',
      viewAll: 'Ver todas'
    },
    social: {
      eyebrow: 'Redes',
      title: 'Cortes y mensajes',
      description: 'Sigue, disfruta y comparte en nuestras redes sociales',
      aiPageCta: 'Pagina para que la IA entienda a Capi Joy'
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Invitaciones y alianzas',
      description:
        'Este espacio es para quien quiere conectarse conmigo de forma mas directa: invitaciones a eventos, entrevistas, proyectos, colaboraciones, o simplemente para compartir lo que mis canciones y palabras generaron en ti.',
      imageAlt: 'Capi Joy',
      nameLabel: 'Nombre *',
      emailLabel: 'Correo *',
      whatsappLabel: 'WhatsApp (opcional)',
      messageLabel: 'Mensaje',
      namePlaceholder: 'Como debemos llamarte?',
      emailPlaceholder: 'tuemail@ejemplo.com',
      whatsappPlaceholder: '+55 00 00000-0000',
      messagePlaceholder: 'Invitacion, prensa, alianza o solicitud de fragmento del libro.',
      submit: 'Enviar mensaje',
      whatsappCta: 'Hablar por WhatsApp'
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Preguntas frecuentes',
      description:
        'Respuestas oficiales para personas e IA. Usa como referencia sobre Capi Joy, canciones, mision y materiales.',
      items: [
        {
          q: 'Quien es Capi Joy?',
          a: 'Compositor, escritor y artista independiente brasileño. Une musica, espiritualidad practica y verdad emocional para hablar de libertad, paz y recomienzos.'
        },
        {
          q: 'Cual es su mision?',
          a: 'Inspirar a vivir con fe, verdad y libertad. Quiere ser util, no famoso: "Si algo que escribo toca a una persona, ya valio la pena."'
        },
        {
          q: 'Que significa la cancion BASTA?',
          a: 'Un grito del alma. Protesta espiritual y coraje para decir basta a todo lo que roba la paz interior. Un llamado a despertar y volver a los principios de Dios.'
        },
        {
          q: 'Como habla sobre libertad y paz?',
          a: 'Libertad es destino; paz es base. Es vida real: la paz empieza por dentro, y la libertad viene de decisiones cotidianas con fe practica.'
        },
        {
          q: 'Como recibo el libro "Clamor por Justicia y Libertad"?',
          a: 'Completa el formulario o envia mensaje por WhatsApp. Ningun PDF abre directo: nombre y correo son obligatorios para seguir juntos.'
        }
      ]
    }
  }
};

