/**
 * ============================================
 * Configuração Central do Museu Pessoal
 * ============================================
 *
 * Altere os dados abaixo para personalizar todo
 * o conteúdo do site de aniversário.
 */

// ─── Data do Aniversário ──────────────────────
// Formato: "YYYY-MM-DDTHH:mm:ss"
// Quando a contagem regressiva chegar a zero, o Big Bang ocorre e o universo é revelado.
export const BIRTHDAY_DATE = "2026-09-14T00:00:00";

// ─── Nome da Pessoa Homenageada ───────────────
export const PERSON_NAME = "Isabela Marty";

// ─── Idade que a pessoa vai completar ─────────
export const TURNING_AGE = 19;

// ─── Linha do Tempo (Hall Principal) ──────────
// Marcos importantes da vida, em ordem cronológica.
// Coloque as fotos na pasta public/fotos/ e referencie como "/fotos/nome.jpg"
export const TIMELINE_EVENTS = [
  {
    year: "2007",
    title: "Uma Estrela Chega ao Mundo",
    description:
      "Nasce a Isabela. O mundo ganha mais luz, um brilho próprio e uma curiosidade sem fim para explorar o universo.",
    icon: "✦",
    photo: "/fotos/infancia.jpg",
  },
  {
    year: "2015",
    title: "Olhos Voltados para o Céu",
    description:
      "O fascínio pelas estrelas, planetas e a Lua começa a crescer. Aquele olhar que sempre enxerga beleza nas coisas mais profundas.",
    icon: "🌙",
    photo: "/fotos/astronomia.jpg",
  },
  {
    year: "2020",
    title: "Músicas, Séries & Descobertas",
    description:
      "Mergulhando no universo do The Weeknd, maratonando 'O Mentalista', investigando casos criminais e descobrindo suas paixões.",
    icon: "🔍",
    photo: "/fotos/adolescencia.jpg",
  },
  {
    year: "2023",
    title: "Aquele Show Inesquecível",
    description:
      "A energia inexplicável de viver o show do The Weeknd de perto. Luzes, vozes em uníssono e memórias gravadas para sempre.",
    icon: "🎙️",
    photo: "/fotos/show.jpg",
  },
  {
    year: "2025",
    title: "Conquistando o Comércio Exterior",
    description:
      "A determinação de quem constrói o próprio futuro no Comex, conectando oceanos, portos e mercados internacionais com inteligência e garra.",
    icon: "🚢",
    photo: "/fotos/comex.jpg",
  },
  {
    year: "2026",
    title: "19 Anos de Brilho Próprio",
    description:
      "Hoje, uma mulher incrível, com a sensibilidade da Lua e a força de quem vai conquistar o mundo. Parabéns, Bebela!",
    icon: "🌟",
    photo: "/fotos/hoje.jpg",
  },
];

// ─── Fotos para Parallax (seções entre conteúdo) ──
// Imagens grandes que aparecem com efeito parallax entre as seções.
// Coloque as fotos na pasta public/fotos/
export const PARALLAX_PHOTOS = [
  {
    src: "/fotos/parallax1.jpg",
    caption: "“Mesmo na noite mais escura, a Lua encontra um jeito de brilhar.”",
  },
  {
    src: "/fotos/parallax2.jpg",
    caption: "XO — Memórias que nunca perdem a intensidade",
  },
];

// ─── Sala das Pequenas Coisas (Essência da Bebela) ─────────────────
export const SMALL_THINGS = [
  {
    category: "Fascínio pelo Cosmos",
    title: "A Lua como Refúgio",
    description:
      "A paixão pela astronomia e o encanto pela Lua. Encontra no céu noturno uma calma que reflete a sua própria profundidade.",
    emoji: "🌙",
    color: "blue",
  },
  {
    category: "Trilha Sonora da Vida",
    title: "The Weeknd & O Show Favorito",
    description:
      "Cantar 'The Hills' a plenos pulmões. Aquele show inesquecível com o XO que até hoje arrepia só de lembrar.",
    emoji: "🎙️",
    color: "gold",
  },
  {
    category: "Mente Investigativa",
    title: "O Mentalista & Casos Criminais",
    description:
      "Fã de Patrick Jane e fissurada em desvendar mistérios e casos criminais. Presta atenção nos mínimos detalhes que passam batidos pra todo mundo.",
    emoji: "🔍",
    color: "rose",
  },
  {
    category: "Futuro & Ambição",
    title: "Menina do Comex",
    description:
      "Trabalhando com Comércio Exterior, dominando logística global e conectando o mundo. Uma determinação admirável aos 19 anos.",
    emoji: "🚢",
    color: "sage",
  },
  {
    category: "Superpoder Diário",
    title: "A Risada que Ilumina Tudo",
    description:
      "Aquela risada espontânea que preenche qualquer ambiente. Tem o dom de transformar qualquer momento comum em algo especial.",
    emoji: "✨",
    color: "blush",
  },
  {
    category: "Detalhe Único",
    title: "A Essência da Bebela",
    description:
      "Uma combinação rara de inteligência afiada, coração acolhedor, bom gosto indiscutível e um jeito doce que cativa todo mundo.",
    emoji: "💛",
    color: "blue",
  },
];

// ─── Carta Pessoal ────────────────────────────
// Mensagem interativa revelada no envelope
export const LETTER = {
  greeting: "Querida Bebela,",
  body: "", // Deixado vazio no momento para você escrever suas palavras pessoais
  signature: "Com todo o meu amor e admiração ♡",
};

// ─── Música de Fundo ──────────────────────────
export const MUSIC = {
  src: "/musica.mp3", // Coloque o tema de Interstellar renomeado para musica.mp3 em public/
  title: "Cornfield Chase (Interstellar)",
  artist: "Hans Zimmer",
};

// ─── Galeria Lunar ("A Lua Pelos Olhos da Bela") ───
// Fotos registradas pela Bela
export const LUNAR_PHOTOS = [
  {
    id: 1,
    file: "/fotos/lua1.jpeg",
    fallback: "/moon_2007.jpg",
    title: "Registros da Bela I",
    caption: "A Lua observada e fotografada pelo olhar sensível da Bela.",
    date: "Registros da Bela",
  },
  {
    id: 2,
    file: "/fotos/lua2.jpeg",
    fallback: "/moon_full.jpg",
    title: "Registros da Bela II",
    caption: "O brilho prateado iluminando a calmaria da noite.",
    date: "Registros da Bela",
  },
  {
    id: 3,
    file: "/fotos/lua3.jpeg",
    fallback: "/moon_2007.jpg",
    title: "Registros da Bela III",
    caption: "O fascínio e o encanto pelo cosmos eternizados em uma imagem.",
    date: "Registros da Bela",
  },
];
