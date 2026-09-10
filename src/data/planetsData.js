/**
 * ============================================
 * planetsData.js — Dados Astronômicos do Sistema Solar
 * ============================================
 *
 * Sol + 8 Planetas em ordem rigorosa a partir da estrela central:
 * 0. Sol (Estrela Central)
 * 1. Mercúrio (0.39 UA)
 * 2. Vênus (0.72 UA) — Destaque Cratera Isabella
 * 3. Terra (1.00 UA) — Com A Lua como subcategoria / satélite da Bela
 * 4. Marte (1.52 UA) — Destaque Conexão Marty / Martis
 * 5. Júpiter (5.20 UA)
 * 6. Saturno (9.58 UA) — Com anéis 3D
 * 7. Urano (19.2 UA)
 * 8. Netuno (30.1 UA)
 */

export const SUN_DATA = {
  id: "sol",
  order: 0,
  name: "O Sol",
  subtitle: "A Estrela Central & O Coração do Sistema Solar",
  tag: "ESTRELA CENTRAL • CORAÇÃO DO SISTEMA",
  tagColor: "#FFAE34",
  symbol: "☉",
  color: "#FFAE34",
  atmosphereColor: "#FFAE34",
  texture3D: "/planetas/3d/sol.jpg",
  isSun: true,
  distanceSun: "Centro do Sistema Solar (0 UA)",
  diameter: "1.392.700 km (109x a Terra)",
  orbitalPeriod: "230 milhões de anos (ao redor da Via Láctea)",
  rotationPeriod: "25 a 35 dias (Diferencial)",
  temperature: "5.500°C na superfície • 15.000.000°C no núcleo",
  highlightTitle: "O Centro Gravitacional & A Luz da Isabela:",
  highlightText: `Assim como o Sol sustenta todo o Sistema Solar com sua gravidade colossal e aquece cada um dos mundos com sua luz incansável, a Isabela é a estrela que irradia alegria, inteligência e força para todos ao seu redor.\n\nSua energia comanda seu próprio destino com o mesmo magnetismo imparável que mantém os planetas em suas órbitas!`,
  facts: [
    "Contém mais de 99,86% de toda a massa combinada de todo o Sistema Solar.",
    "A luz solar viaja a 300.000 km/s e leva exatamente 8 minutos e 20 segundos para alcançar a Terra.",
    "Seu núcleo funde mais de 600 milhões de toneladas de hidrogênio em hélio a cada segundo."
  ]
};

export const PLANETS_DATA = [
  {
    id: "mercurio",
    order: 1,
    name: "Mercúrio",
    subtitle: "O Menor Planeta & O Mais Veloz",
    tag: "1º PLANETA DO SOL",
    tagColor: "#B0A294",
    symbol: "☿",
    color: "#B0A294",
    atmosphereColor: "#B0A294",
    texture3D: "/planetas/3d/mercurio.jpg",
    hasRings: false,
    distanceSun: "57,9 milhões de km (0.39 UA)",
    diameter: "4.879 km",
    orbitalPeriod: "88 dias",
    rotationPeriod: "59 dias",
    temperature: "-180°C a +430°C",
    orbitRadiusScale: 0.18,
    mapAngle: 28,
    orbSize: 32,
    highlightTitle: "O Corredor de Metal Cósmico:",
    highlightText: `Mercúrio é o planeta mais veloz de todo o Sistema Solar, completando uma volta completa ao redor do Sol em apenas 88 dias a impressionantes 170.000 km/h. Seu núcleo metálico de ferro ocupa mais de 80% do seu diâmetro.`,
    facts: [
      "Apesar da proximidade extrema com o Sol, possui crateras polares onde a luz nunca bate e onde há gelo de água preservado.",
      "Seu céu é eternamente negro mesmo ao meio-dia, pois não há atmosfera para espalhar a luz solar.",
      "Suporta a maior variação térmica do Sistema Solar: oscila mais de 600°C entre o dia e a noite."
    ]
  },
  {
    id: "venus",
    order: 2,
    name: "Vênus",
    subtitle: "A Estrela D'Alva & A 'Cratera Isabella'",
    tag: "NOME NO ESPAÇO • CRATERA ISABELLA",
    tagColor: "#E5A952",
    symbol: "♀",
    color: "#E5A952",
    atmosphereColor: "#E5A952",
    texture3D: "/planetas/3d/venus.jpg",
    hasRings: false,
    distanceSun: "108,2 milhões de km (0.72 UA)",
    diameter: "12.104 km",
    orbitalPeriod: "225 dias",
    rotationPeriod: "243 dias (Retrógrada)",
    temperature: "465°C constante",
    orbitRadiusScale: 0.28,
    mapAngle: 102,
    orbSize: 36,
    highlightTitle: "O Nome 'Isabela' Gravado no Cosmos:",
    highlightText: `No planeta Vênus — o astro mais brilhante do céu noturno depois da Lua —, a segunda maior cratera de impacto de todo o planeta se chama oficialmente Cratera Isabella (175 km de diâmetro), catalogada pela NASA e pela União Astronômica Internacional (IAU).\n\nEla é mundialmente célebre por sua simetria circular impecável e por seus feixes minerais que refletem ondas com um brilho radiante.`,
    facts: [
      "A Cratera Isabella está situada no hemisfério sul venusiano nas coordenadas -29.8° de latitude.",
      "Gira no sentido contrário ao da maioria dos planetas: em Vênus o Sol nasce no oeste e se põe no leste.",
      "Sua atmosfera densa reflete tanta luz que ele é visto até mesmo durante o crepúsculo como a 'Estrela D'Alva'."
    ]
  },
  {
    id: "terra",
    order: 3,
    name: "Terra",
    subtitle: "O Pálido Ponto Azul & O Berço da Vida",
    tag: "3º PLANETA • NOSSO LAR",
    tagColor: "#4BA0E0",
    symbol: "🜨",
    color: "#4BA0E0",
    atmosphereColor: "#4BA0E0",
    texture3D: "/planetas/3d/terra.jpg",
    hasRings: false,
    distanceSun: "149,6 milhões de km (1.00 UA)",
    diameter: "12.742 km",
    orbitalPeriod: "365,25 dias",
    rotationPeriod: "23h 56m",
    temperature: "15°C (média global)",
    orbitRadiusScale: 0.39,
    mapAngle: 215,
    orbSize: 38,
    highlightTitle: "O Milagre Suspenso no Vácuo:",
    highlightText: `O único oásis conhecido com oceanos de água líquida em abundância, atmosfera respirável e vida consciente. Viajamos juntos a mais de 107.000 km/h ao redor do Sol. Possui como companheira inseparável A Lua, que equilibra a vida e as marés.`,
    facts: [
      "Mais de 70% de sua superfície é coberta por oceanos profundos que estabilizam o clima global.",
      "Seu campo magnético atua como um escudo cósmico vital contra o vento solar radioativo.",
      "Possui um único satélite natural majestoso: A Lua, responsável por regular o ciclo das marés e a rotação da Terra."
    ],
    // Subcategoria especial: A Lua
    satellite: {
      id: "lua",
      name: "A Lua",
      subtitle: "Satélite Natural da Terra & O Astro Favorito da Isabela",
      tag: "ASTRO DA BELA • SATÉLITE NATURAL",
      tagColor: "#DCE5EE",
      symbol: "🌙",
      color: "#DCE5EE",
      atmosphereColor: "#A8C4E0",
      texture3D: "/planetas/3d/lua.jpg",
      distanceCenter: "384.400 km da Terra",
      diameter: "3.474 km (1/4 da Terra)",
      orbitalPeriod: "27,3 dias",
      rotationPeriod: "27,3 dias (Sincronizada)",
      temperature: "-130°C a +120°C",
      highlightTitle: "O Refúgio Silencioso da Bebela:",
      highlightText: `A paixão da Isabela pela Lua tem fundamento cósmico real: ela é a fiel guardiã da Terra. Sua atração gravitacional comanda o ritmo de todos os oceanos e estabiliza o eixo da Terra, impedindo variações climáticas extremas e tornando o planeta habitável.\n\nNa noite em que a Bela nasceu (14/09/2007), a Lua brilhava em fase Crescente Côncava na constelação de Virgem.`,
      facts: [
        "A Lua sempre mostra a mesma face para a Terra porque seu período de rotação é sincronizado com sua translação.",
        "Sem a Lua, os dias na Terra durariam apenas 6 horas e ventos supersônicos varreriam a superfície.",
        "A Lua se afasta lentamente da Terra cerca de 3,8 cm a cada ano."
      ]
    }
  },
  {
    id: "marte",
    order: 4,
    name: "Marte",
    subtitle: "O Planeta Vermelho & A Origem Cósmica de 'Marty'",
    tag: "CONEXÃO MARTY • 4º PLANETA",
    tagColor: "#E55338",
    symbol: "♂",
    color: "#E55338",
    atmosphereColor: "#E55338",
    texture3D: "/planetas/3d/marte.jpg",
    hasRings: false,
    distanceSun: "227,9 milhões de km (1.52 UA)",
    diameter: "6.779 km",
    orbitalPeriod: "687 dias",
    rotationPeriod: "24h 37m",
    temperature: "-63°C (média)",
    orbitRadiusScale: 0.50,
    mapAngle: 310,
    orbSize: 34,
    highlightTitle: "A Raiz Cósmica do Sobrenome 'Marty':",
    highlightText: `O sobrenome Marty tem derivação etimológica direta no latim "Martis", que é a raiz exata do planeta Marte.\n\nNa astronomia e na história, Marte é o regente da ousadia, da determinação inabalável e da coragem de desbravar rotas desconhecidas. Uma conexão perfeita com a garra da Isabela no Comércio Exterior — dominando logística internacional, vencendo desafios complexos e negociando com o mundo com pulso firme e inteligência.`,
    facts: [
      "Abriga o Monte Olimpo (Olympus Mons), o maior vulcão do Sistema Solar: 22 km de altura (quase 3x o Monte Everest).",
      "O dia marciano (chamado 'Sol') tem 24h37min, quase idêntico ao ciclo de sono da Terra.",
      "Possui o cânion Valles Marineris: tem mais de 4.000 km de extensão e cruza quase um quarto de todo o planeta."
    ]
  },
  {
    id: "jupiter",
    order: 5,
    name: "Júpiter",
    subtitle: "O Rei dos Planetas & O Escudo da Terra",
    tag: "5º PLANETA • O GIGANTE GASOSO",
    tagColor: "#D08F56",
    symbol: "♃",
    color: "#D08F56",
    atmosphereColor: "#D08F56",
    texture3D: "/planetas/3d/jupiter.jpg",
    hasRings: false,
    distanceSun: "778,5 milhões de km (5.20 UA)",
    diameter: "139.820 km",
    orbitalPeriod: "11,86 anos",
    rotationPeriod: "9h 55m",
    temperature: "-110°C (topo das nuvens)",
    orbitRadiusScale: 0.62,
    mapAngle: 70,
    orbSize: 48,
    highlightTitle: "O Guardião Gravitacional do Sistema:",
    highlightText: `Júpiter é mais massivo do que todos os outros planetas do Sistema Solar reunidos! Caberiam mais de 1.300 Terras em seu interior. Sua gravidade titânica atua como um escudo protetor, desviando cometas e asteroides perigosos da órbita da Terra.`,
    facts: [
      "A Grande Mancha Vermelha é uma tempestade colossal ativa há mais de 350 anos, maior que todo o planeta Terra.",
      "Seu dia dura menos de 10 horas: é o planeta que gira mais rápido sobre o próprio eixo.",
      "Sua lua Europa esconde um oceano global de água líquida subterrâneo duas vezes maior que todos os oceanos terrestres."
    ]
  },
  {
    id: "saturno",
    order: 6,
    name: "Saturno",
    subtitle: "A Obra-Prima Cósmica & Seus Anéis de Gelo",
    tag: "6º PLANETA • O SENHOR DOS ANÉIS",
    tagColor: "#E2CE9F",
    symbol: "♄",
    color: "#E2CE9F",
    atmosphereColor: "#E2CE9F",
    texture3D: "/planetas/3d/saturno.jpg",
    ringTexture: "/planetas/3d/saturno_anel.jpg",
    hasRings: true,
    distanceSun: "1,43 bilhão de km (9.58 UA)",
    diameter: "116.460 km",
    orbitalPeriod: "29,45 anos",
    rotationPeriod: "10h 33m",
    temperature: "-140°C",
    orbitRadiusScale: 0.74,
    mapAngle: 165,
    orbSize: 44,
    highlightTitle: "A Joia Mais Esplêndida do Cosmos:",
    highlightText: `Os anéis de Saturno estendem-se por 280.000 km de largura, mas têm em média meros 10 metros de espessura! São formados por 99% de partículas de gelo puro que refletem a luz do Sol como poeira de diamante cintilante.`,
    facts: [
      "É o único planeta menos denso que a água: se existisse um oceano espacial do seu tamanho, ele boiaria!",
      "Lidera o recorde do Sistema Solar com 146 luas confirmadas.",
      "Possui um hexágono geométrico tempestuoso permanente girando sobre seu polo norte com 30.000 km de diâmetro."
    ]
  },
  {
    id: "urano",
    order: 7,
    name: "Urano",
    subtitle: "O Gigante de Gelo que Rola Deitado",
    tag: "7º PLANETA • GIGANTE ESMERALDA",
    tagColor: "#74C6CF",
    symbol: "⛢",
    color: "#74C6CF",
    atmosphereColor: "#74C6CF",
    texture3D: "/planetas/3d/urano.jpg",
    hasRings: false,
    distanceSun: "2,87 bilhões de km (19.2 UA)",
    diameter: "50.724 km",
    orbitalPeriod: "84 anos",
    rotationPeriod: "17h 14m",
    temperature: "-224°C (o mais frio)",
    orbitRadiusScale: 0.86,
    mapAngle: 255,
    orbSize: 38,
    highlightTitle: "O Planeta Mais Curioso do Sistema:",
    highlightText: `Urano tem uma fascinante tonalidade azul-esmeralda e orbita deitado de lado (inclinação axial de 98°), rolando como uma bola em sua órbita solar. Cada um de seus polos passa por 42 anos contínuos de dia seguidos por 42 anos de escuridão total.`,
    facts: [
      "Registrou a temperatura atmosférica mais baixa já medida no Sistema Solar: -224°C.",
      "Suas 28 luas conhecidas receberam nomes de personagens das obras de William Shakespeare e Alexander Pope.",
      "O gás metano em sua atmosfera superior absorve a luz vermelha e reflete seu característico brilho esmeralda."
    ]
  },
  {
    id: "netuno",
    order: 8,
    name: "Netuno",
    subtitle: "O Azul Profundo & As Chuvas de Diamantes",
    tag: "8º PLANETA • A ÚLTIMA FRONTEIRA",
    tagColor: "#3C6ECC",
    symbol: "♆",
    color: "#3C6ECC",
    atmosphereColor: "#3C6ECC",
    texture3D: "/planetas/3d/netuno.jpg",
    hasRings: false,
    distanceSun: "4,50 bilhões de km (30.1 UA)",
    diameter: "49.244 km",
    orbitalPeriod: "164,8 anos",
    rotationPeriod: "16h 06m",
    temperature: "-214°C",
    orbitRadiusScale: 0.96,
    mapAngle: 340,
    orbSize: 38,
    highlightTitle: "O Sentinela das Trevas Cósmicas:",
    highlightText: `O mundo mais distante do Sol. Seu tom de azul cerúleo profundo é o mais denso de todo o céu. Nas profundezas de seu manto, a pressão esmagadora condensa átomos de carbono puro em diamantes maciços, que chovem lentamente em direção ao centro.`,
    facts: [
      "Possui os ventos mais violentos do Sistema Solar, superando 2.100 km/h (duas vezes a velocidade do som).",
      "Leva 165 anos terrestres para dar uma volta ao redor do Sol; completou apenas uma órbita desde sua descoberta em 1846.",
      "Sua colossal lua Tritão expele gêiseres de nitrogênio líquido e gira na contramão de todos os outros satélites."
    ]
  }
];
