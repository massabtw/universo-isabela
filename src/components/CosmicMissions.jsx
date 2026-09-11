import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, RotateCcw, CheckCircle2, XCircle, ArrowRight, HelpCircle } from 'lucide-react';

/**
 * BANCO DE QUESTÕES PURAMENTE FOCADO EM GALÁXIAS, ASTROFÍSICA E O UNIVERSO PROFUNDO
 * Perguntas de astronomia real sobre morfologia galáctica, buracos negros, nebulosas e cosmologia.
 */
const GALAXY_QUESTIONS = [
  {
    id: 'g1',
    category: 'Núcleos Galácticos',
    question: 'O que existe no coração da imensa maioria das grandes galáxias espirais, incluindo a Via Láctea?',
    options: [
      'Um buraco negro supermassivo (como o Sagittarius A*)',
      'Uma única estrela gigante que ilumina toda a galáxia',
      'Um pulsar de nêutrons em rotação ultrarrápida',
      'Uma imensa esfera sólida de diamante puro'
    ],
    correct: 0,
    explanation: 'No centro da Via Láctea habita o Sagittarius A*, um buraco negro supermassivo com massa equivalente a mais de 4,3 milhões de vezes a massa do nosso Sol!'
  },
  {
    id: 'g2',
    category: 'Morfologia Galáctica',
    question: 'Qual é a classificação morfológica exata da nossa própria galáxia, a Via Láctea?',
    options: [
      'Galáxia Espiral Barrada (SBb)',
      'Galáxia Elíptica Gigante (E0)',
      'Galáxia Irregular Tipo II',
      'Galáxia Lenticular sem braços'
    ],
    correct: 0,
    explanation: 'A Via Láctea não é uma espiral comum, mas uma Espiral Barrada: ela possui uma barra central estelar de onde partem seus braços de poeira cósmica.'
  },
  {
    id: 'g3',
    category: 'Grupo Local',
    question: 'Qual é a galáxia espiral gigante mais próxima da nossa Via Láctea?',
    options: [
      'Galáxia de Andrômeda (M31)',
      'Galáxia do Sombrero (M104)',
      'Galáxia do Triângulo (M33)',
      'Grande Nuvem de Magalhães'
    ],
    correct: 0,
    explanation: 'Andrômeda está a aproximadamente 2,5 milhões de anos-luz de distância e contém cerca de um trilhão de estrelas brilhando no espaço profundo.'
  },
  {
    id: 'g4',
    category: 'Futuro Cósmico',
    question: 'O que acontecerá no futuro distante (daqui a ~4,5 bilhões de anos) entre a Via Láctea e Andrômeda?',
    options: [
      'Uma gigantesca colisão e fusão cósmica (formando a "Lactômeda")',
      'Elas irão se repelir para sempre devido à energia escura',
      'Andrômeda será devorada pelo buraco negro do Sol',
      'A Via Láctea irá evaporar no vácuo interestelar'
    ],
    correct: 0,
    explanation: 'As duas galáxias se aproximam a 110 km/s. Daqui a 4,5 bilhões de anos, elas se fundirão suavemente em uma única galáxia elíptica colossal apelidada de Lactômeda.'
  },
  {
    id: 'g5',
    category: 'Aglomerados de Galáxias',
    question: 'O que é o "Aglomerado de Virgem" (Virgo Cluster) na astronomia extragaláctica?',
    options: [
      'Um aglomerado colossal contendo entre 1.300 e 2.000 galáxias',
      'A constelação zodiacal que fica mais perto da Terra',
      'Uma nuvem de poeira dourada que orbita Marte',
      'Uma única galáxia anã descoberta pelo telescópio Webb'
    ],
    correct: 0,
    explanation: 'O Aglomerado de Virgem é o coração do nosso Superaglomerado local, reunindo milhares de galáxias ligadas pela força da gravidade mútua a 54 milhões de anos-luz.'
  },
  {
    id: 'g6',
    category: 'Telescópio Hubble',
    question: 'O que a histórica imagem do "Campo Ultra Profundo do Hubble" revelou aos cientistas?',
    options: [
      'Quase 10.000 galáxias em um pedaço minúsculo e aparentemente escuro do céu',
      'Que o centro do universo fica na constelação de Virgem',
      'A primeira fotografia real da superfície de um buraco negro',
      'Que não existem galáxias além da Via Láctea'
    ],
    correct: 0,
    explanation: 'Ao apontar o Hubble para uma região minúscula equivalente a um grão de areia esticado com o braço, surgiram quase 10.000 galáxias completas, cada uma com bilhões de estrelas!'
  },
  {
    id: 'g7',
    category: 'Cosmologia de Grande Escala',
    question: 'Como se chama a colossal teia cósmica que engloba a Via Láctea, Virgem e 100.000 galáxias vizinhas?',
    options: [
      'Superaglomerado Laniakea ("Céu Imensurável")',
      'Grande Muralha de Ganimedes',
      'Complexo de Órion',
      'Cinturão de Kuiper Interestelar'
    ],
    correct: 0,
    explanation: 'Descoberto em 2014, Laniakea abrange 520 milhões de anos-luz e define as bacias de atração gravitacional de mais de 100.000 galáxias em fluxo cósmico.'
  },
  {
    id: 'g8',
    category: 'Física da Matéria Escura',
    question: 'O que mantém as estrelas nos braços externos das galáxias girando rápido sem serem arremessadas ao espaço?',
    options: [
      'O halo gravitacional invisível de Matéria Escura',
      'A pressão de radiação dos planetas gasosos',
      'O vento solar emitido pelas estrelas centrais',
      'O campo magnético gerado pela rotação do vácuo'
    ],
    correct: 0,
    explanation: 'A astrônoma Vera Rubin descobriu que as galáxias giram rápido demais para a matéria visível sustentá-las; cerca de 85% de toda a matéria do cosmos é matéria escura!'
  },
  {
    id: 'g9',
    category: 'Energia Cósmica',
    question: 'O que é um Quasar no universo distante?',
    options: [
      'O núcleo hiperativo de uma galáxia alimentado por um buraco negro supermassivo',
      'Uma estrela de nêutrons que pisca a cada milissegundo',
      'Um cometa gigante feito inteiramente de plasma',
      'Uma galáxia morta que não emite nenhum tipo de luz'
    ],
    correct: 0,
    explanation: 'Quasares são os motores mais energéticos do universo: matéria caindo em um buraco negro supermassivo aquece a trilhões de graus e brilha mais que centenas de galáxias inteiras!'
  },
  {
    id: 'g10',
    category: 'Classificação de Hubble',
    question: 'Quais são as três principais formas clássicas de galáxias definidas por Edwin Hubble?',
    options: [
      'Espirais, Elípticas e Irregulares',
      'Circulares, Triangulares e Cônicas',
      'Azuis, Douradas e Negras',
      'Solares, Planetárias e Estelares'
    ],
    correct: 0,
    explanation: 'O Diapasão de Hubble classifica as galáxias em Elípticas (E0-E7), Espirais regulares e barradas (S e SB) e Irregulares (Irr).'
  },
  {
    id: 'g11',
    category: 'Galáxias Notáveis',
    question: 'Por que a Galáxia do Sombrero (M104), em Virgem, recebeu esse nome peculiar?',
    options: [
      'Por sua barra de poeira escura e núcleo brilhante que lembram um chapéu mexicano',
      'Porque ela foi descoberta por astrônomos no México em 1781',
      'Porque sua rotação tem o formato de uma espiral cônica',
      'Por causa do padrão de cores do seu campo magnético'
    ],
    correct: 0,
    explanation: 'A M104 possui um bojo central brilhante e uma espessa faixa de poeira interestelar vista quase de perfil, dando a silhueta clássica de um sombrero.'
  },
  {
    id: 'g12',
    category: 'Escala Galáctica',
    question: 'Aproximadamente quantas estrelas habitam a nossa galáxia, a Via Láctea?',
    options: [
      'Entre 100 e 400 bilhões de estrelas',
      'Cerca de 1 milhão de estrelas',
      'Exatamente 8 estrelas (uma por planeta)',
      'Mais de 100 trilhões de estrelas'
    ],
    correct: 0,
    explanation: 'Estima-se que nossa galáxia contenha entre 100 e 400 bilhões de estrelas, e praticamente todas possuem ao menos um planeta em sua órbita!'
  },
  {
    id: 'g13',
    category: 'Ano Galáctico',
    question: 'Quanto tempo o Sol e a Terra levam para completar uma volta ao redor do centro da galáxia?',
    options: [
      'Cerca de 225 a 250 milhões de anos (Ano Cósmico)',
      'Exatamente 365 dias terrestres',
      'Cerca de 10.000 anos',
      'Cerca de 2 bilhões de anos'
    ],
    correct: 0,
    explanation: 'Na última vez em que o nosso Sistema Solar esteve nesta mesma posição da Via Láctea, os primeiros dinossauros estavam apenas começando a surgir na Terra!'
  },
  {
    id: 'g14',
    category: 'Satélites da Via Láctea',
    question: 'O que são a Grande e a Pequena Nuvem de Magalhães vistas no céu do hemisfério sul?',
    options: [
      'Duas galáxias anãs satélites que orbitam a Via Láctea',
      'Tempestades de poeira na alta atmosfera da Terra',
      'Duas nebulosas planetárias dentro do Sistema Solar',
      'Reflexos da luz da Lua nos oceanos do sul'
    ],
    correct: 0,
    explanation: 'São galáxias companheiras da Via Láctea visíveis a olho nu no céu noturno do hemisfério sul, ricas em formação estelar ativa.'
  },
  {
    id: 'g15',
    category: 'Berçários Estelares',
    question: 'O que acontece no interior das nebulosas gasosas dentro dos braços espirais das galáxias?',
    options: [
      'O gás hidrogênio colapsa sob sua própria gravidade e forma novas estrelas',
      'Buracos negros se dissolvem e viram cometas',
      'Planetas gigantes se chocam para criar o vácuo',
      'A luz das estrelas é totalmente destruída'
    ],
    correct: 0,
    explanation: 'Nebulosas como a de Órion ou a Nebulosa Carina são os berçários onde nuvens densas de poeira e gás comprimido dão à luz novas estrelas e sistemas planetários.'
  },
  {
    id: 'g16',
    category: 'Relatividade Geral',
    question: 'O que é o efeito de "Lente Gravitacional" causado por galáxias e aglomerados massivos?',
    options: [
      'A gravidade massiva da galáxia curva o espaço-tempo e amplifica a luz de objetos atrás dela',
      'A atmosfera da galáxia refrata a luz como uma lente de vidro comum',
      'O choque de duas estrelas que cria um clarão estelar direcionado',
      'A rotação dos anéis planetários gerando campos ópticos'
    ],
    correct: 0,
    explanation: 'Previsto por Albert Einstein, a gravidade colossal de uma galáxia deforma o tecido do espaço, agindo como uma lente cósmica que amplia galáxias do fundo do universo.'
  },
  {
    id: 'g17',
    category: 'Telescópio James Webb',
    question: 'Por que o Telescópio Espacial James Webb observa o cosmos primordial no espectro infravermelho?',
    options: [
      'Porque a expansão do universo estica a luz das primeiras galáxias para o infravermelho (redshift)',
      'Porque o infravermelho é a única luz que não gera calor no espaço',
      'Porque as câmeras infravermelhas são menores e mais leves',
      'Porque as primeiras estrelas eram feitas exclusivamente de gelo'
    ],
    correct: 0,
    explanation: 'Conforme o universo se expande, os comprimentos de onda de luz viajam por bilhões de anos e sofrem desvio para o vermelho (redshift), exigindo visão infravermelha apurada!'
  },
  {
    id: 'g18',
    category: 'Titãs do Cosmos',
    question: 'Qual é a maior galáxia conhecida no universo observável, medindo milhões de anos-luz de diâmetro?',
    options: [
      'IC 1101 (com mais de 100 trilhões de estrelas)',
      'Via Láctea',
      'Galáxia do Triângulo',
      'Pequena Nuvem de Magalhães'
    ],
    correct: 0,
    explanation: 'A galáxia elíptica supergigante IC 1101 tem um diâmetro de cerca de 4 a 6 milhões de anos-luz — caberiam dezenas de Vias Lácteas enfileiradas dentro dela!'
  },
  {
    id: 'g19',
    category: 'Galáxias Interagentes',
    question: 'O que torna a famosa "Galáxia do Redemoinho" (M51) um dos alvos mais admirados da astrofotografia?',
    options: [
      'Seus braços espirais majestosos interagindo diretamente com uma galáxia companheira menor (NGC 5195)',
      'Ela não possui estrelas, apenas poeira brilhante',
      'Ela é a única galáxia que gira em formato quadrado',
      'Ela fica a apenas 1 ano-luz de distância do Sol'
    ],
    correct: 0,
    explanation: 'A interação de maré gravitacional com sua companheira menor acentuou e esculpiu os braços espirais da M51, criando uma das estruturas mais perfeitas do cosmos.'
  },
  {
    id: 'g20',
    category: 'Taxa de Nascimento Estelar',
    question: 'O que caracteriza uma galáxia do tipo "Starburst"?',
    options: [
      'Uma taxa frenética e avassaladora de nascimento de novas estrelas',
      'Uma galáxia formada exclusivamente por estrelas cadentes',
      'Uma galáxia que explode todas as suas estrelas ao mesmo tempo',
      'Uma galáxia que não possui gravidade no seu núcleo'
    ],
    correct: 0,
    explanation: 'Galáxias Starburst consomem seu gás cósmico em um ritmo centenas de vezes mais rápido que galáxias comuns, iluminando o espaço com milhares de estrelas jovens e brilhantes.'
  },
  {
    id: 'g21',
    category: 'Origem da Via Láctea',
    question: 'De onde surgiu o nome poético "Via Láctea" (Caminho de Leite)?',
    options: [
      'Da mitologia grega, que enxergava a faixa branca no céu como gotas de leite derramadas pelos deuses',
      'De um tipo de gás estelar que tem sabor e densidade semelhantes ao leite',
      'Do astrônomo Galileu Galilei, em homenagem à sua terra natal',
      'Da cor branca emitida pela fusão do ferro nas primeiras estrelas'
    ],
    correct: 0,
    explanation: 'Na mitologia grega, a faixa brilhante no céu noturno límpido era chamada de "Galaxias Kyklos" (Círculo de Leite), que os romanos traduziram como "Via Lactea".'
  },
  {
    id: 'g22',
    category: 'Cosmologia do Big Bang',
    question: 'O que é a "Radiação Cósmica de Fundo em Micro-ondas" (CMB) detectada por radiotelescópios?',
    options: [
      'O calor e brilho residual emitido cerca de 380.000 anos após o Big Bang',
      'O som gerado pelos pulsares girando no vácuo',
      'Um sinal artificial enviado por civilizações alienígenas',
      'A reflexão da luz das galáxias na poeira do Sistema Solar'
    ],
    correct: 0,
    explanation: 'A CMB é a luz mais antiga do universo, liberada quando os primeiros átomos se formaram e o cosmos se tornou transparente, banhando todo o espaço a 2,7 Kelvin (-270 °C).'
  },
  {
    id: 'g23',
    category: 'Dinâmica dos Braços Espirais',
    question: 'Como a astrofísica moderna explica a formação e estabilidade dos braços espirais nas galáxias?',
    options: [
      'Como "Ondas de Densidade" que viajam pelo disco comprimindo gás e gerando estrelas',
      'Como cabos materiais sólidos que puxam as estrelas em rotação',
      'Pela atração magnética entre os planetas dos sistemas estelares',
      'Por buracos negros que empurram a matéria para fora em espiral'
    ],
    correct: 0,
    explanation: 'A teoria das ondas de densidade (Lin & Shu) compara os braços a congestionamentos de trânsito: as estrelas entram e saem deles, mas a onda de alta densidade permanece!'
  },
  {
    id: 'g24',
    category: 'Posição na Galáxia',
    question: 'Em qual braço da Via Láctea o nosso Sol e os planetas estão localizados?',
    options: [
      'No Braço de Órion (Braço Local)',
      'No centro absoluto de Sagittarius A*',
      'No Braço de Perseus distante',
      'Fora da galáxia, no vácuo intergaláctico'
    ],
    correct: 0,
    explanation: 'Nosso Sistema Solar está situado na borda interna do Braço de Órion, uma estrutura espiral intermediária localizada a 26.000 anos-luz do núcleo galáctico.'
  },
  {
    id: 'g25',
    category: 'Idade das Galáxias',
    question: 'Qual é a cor predominante das galáxias elípticas mais velhas do universo e por quê?',
    options: [
      'Avermelhada/âmbar, pois abrigam estrelas velhas de longa vida e pouco gás novo',
      'Azul intensa, porque todas as estrelas velhas são azuis',
      'Verde-esmeralda devido ao oxigênio ionizado dos cometas',
      'Totalmente invisível, pois estrelas antigas não emitem fótons'
    ],
    correct: 0,
    explanation: 'Galáxias elípticas já consumiram a maior parte de seu gás frio, de modo que suas estrelas jovens e azuis já morreram, restando gigantes vermelhas e anãs de vida longa.'
  },
  {
    id: 'g26',
    category: 'Remanescentes de Supernova',
    question: 'O que é a Nebulosa do Caranguejo (M1), um dos objetos galácticos mais estudados da astronomia?',
    options: [
      'Os restos em expansão de uma supernova testemunhada na Terra em 1054',
      'Uma galáxia inteira com o formato de um caranguejo cósmico',
      'O cinturão de asteroides entre Marte e Júpiter',
      'Um planeta gigante que explodiu no início do Sistema Solar'
    ],
    correct: 0,
    explanation: 'Em 4 de julho de 1054, astrônomos chineses registraram uma "estrela visitante" tão brilhante que podia ser vista à luz do dia por semanas — era a supernova que gerou a Nebulosa do Caranguejo!'
  },
  {
    id: 'g27',
    category: 'Aglomerados Globulares',
    question: 'O que são os Aglomerados Globulares que formam uma coroa ao redor do halo das galáxias?',
    options: [
      'Enxames esféricos de até 1 milhão de estrelas anciãs unidas pela gravidade',
      'Planetas sem estrela vagando em grupos pelo espaço interestelar',
      'Nuvens de tempestades solares que escaparam da Via Láctea',
      'Buracos negros menores que devoram asteroides'
    ],
    correct: 0,
    explanation: 'Aglomerados como Ômega Centauri e M13 contêm algumas das estrelas mais antigas do universo, com mais de 12 bilhões de anos de idade, orbitando a periferia galáctica.'
  },
  {
    id: 'g28',
    category: 'População Galáctica',
    question: 'Quantas galáxias existem no Universo Observável segundo estimativas modernas?',
    options: [
      'Mais de 2 trilhões de galáxias',
      'Exatamente 8 galáxias',
      'Cerca de 10.000 galáxias',
      'Apenas a Via Láctea e Andrômeda'
    ],
    correct: 0,
    explanation: 'Com base nas análises de céu profundo do Hubble e simulações 3D, o universo observável contém mais de 2.000.000.000.000 de galáxias inteiras!'
  },
  {
    id: 'g29',
    category: 'Lei de Hubble-Lemaître',
    question: 'O que Edwin Hubble descobriu ao medir a velocidade com que galáxias distantes se movem?',
    options: [
      'Quanto mais distante a galáxia está, mais rápido ela parece se afastar (expansão do universo)',
      'Todas as galáxias estão caindo em direção à Terra',
      'As galáxias estão completamente paradas no espaço infinito',
      'A velocidade da luz varia de acordo com o tamanho da galáxia'
    ],
    correct: 0,
    explanation: 'Esta descoberta em 1929 revolucionou a física: o próprio tecido do espaço entre as galáxias está se expandindo continuamente desde o Big Bang!'
  },
  {
    id: 'g30',
    category: 'Gases Interestelares',
    question: 'Qual é o elemento químico mais abundante em quase todas as galáxias do universo?',
    options: [
      'Hidrogênio (cerca de 74% de toda a massa bariônica do cosmos)',
      'Ferro pesado',
      'Oxigênio molecular',
      'Ouro e platina estelar'
    ],
    correct: 0,
    explanation: 'O Hidrogênio foi o primeiro e mais simples elemento formado após o Big Bang e continua sendo a matéria-prima fundamental para acender estrelas nas galáxias.'
  },
  {
    id: 'g31',
    category: 'Zona de Evitamento',
    question: 'Por que astrônomos chamam parte do céu de "Zona de Evitamento" ao buscar galáxias distantes?',
    options: [
      'Porque a poeira densa do disco da Via Láctea bloqueia nossa visão óptica do que está atrás dela',
      'Porque é uma região do espaço onde a gravidade não funciona',
      'Porque as naves espaciais perdem comunicação ao passar por lá',
      'Porque ali os telescópios superaquecem com o calor solar'
    ],
    correct: 0,
    explanation: 'Como estamos dentro do disco da Via Láctea, a poeira e gás do nosso próprio centro galáctico bloqueiam cerca de 20% do céu óptico em direção ao universo extragaláctico.'
  },
  {
    id: 'g32',
    category: 'Supernovas Tipo Ia',
    question: 'Por que as supernovas do tipo Ia são chamadas de "Velas Padrão" pelos cosmólogos?',
    options: [
      'Porque explodem sempre com o mesmo brilho intrínseco, permitindo calcular distâncias precisas no universo',
      'Porque elas duram apenas o tempo de queima de uma vela comum',
      'Porque são feitas inteiramente de parafina cósmica e cera',
      'Porque iluminam o caminho para as sondas espaciais pousarem'
    ],
    correct: 0,
    explanation: 'O brilho uniforme dessas explosões permitiu aos cientistas nos anos 1990 descobrir que a expansão do universo está acelerando, levando ao prêmio Nobel da Energia Escura!'
  }
];

function shuffleArray(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Cria uma rodada com 6 perguntas sorteadas aleatoriamente do banco com alternativas embaralhadas
function generateRound() {
  const selectedQuestions = shuffleArray(GALAXY_QUESTIONS).slice(0, 6);
  return selectedQuestions.map(q => {
    const originalCorrectText = q.options[q.correct];
    const shuffledOptions = shuffleArray(q.options);
    const newCorrectIndex = shuffledOptions.indexOf(originalCorrectText);
    return {
      ...q,
      options: shuffledOptions,
      correct: newCorrectIndex,
    };
  });
}

export default function CosmicMissions() {
  const [questions, setQuestions] = useState(() => generateRound());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = index => {
    if (selectedOption !== null) return;
    setSelectedOption(index);

    if (index === currentQ.correct) {
      const bonus = streak * 25;
      setScore(s => s + 100 + bonus);
      setStreak(st => st + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setQuestions(generateRound());
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setCompleted(false);
  };

  const rank = useMemo(() => {
    if (score >= 600) return { title: 'Astrofísica Imperial da Galáxia', badge: '🌟 Mestria Cósmica Perfeita', desc: 'Conhecimento absoluto sobre a dinâmica das galáxias, buracos negros e o cosmos profundo!' };
    if (score >= 400) return { title: 'Comandante Estelar Extragaláctica', badge: '🚀 Patente Interestelar Avançada', desc: 'Desempenho espetacular pelos mistérios dos aglomerados de galáxias e a teia do universo!' };
    if (score >= 200) return { title: 'Exploradora do Cosmos', badge: '🔭 Curiosa das Galáxias', desc: 'Uma expedição admirável pelos mundos distantes e fatos reais do espaço!' };
    return { title: 'Cadete Espacial', badge: '🪐 Primeira Órbita', desc: 'O cosmos é infinito e está sempre pronto para ser explorado em uma nova rodada!' };
  }, [score]);

  return (
    <div className="w-full rounded-3xl bg-midnight-900/80 border border-white/10 backdrop-blur-2xl p-5 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden flex flex-col items-center">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20 bg-celestial-gold" />

      {/* Barra de Status do Quiz */}
      <div className="w-full flex items-center justify-between border-b border-white/10 pb-4 mb-6 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-celestial-gold/15 text-celestial-gold border border-celestial-gold/30 font-semibold">
            {completed ? '✦ Concluído' : `Pergunta ${currentIndex + 1} de ${questions.length}`}
          </span>
          <span className="text-gray-400 hidden sm:inline">
            • {currentQ?.category || 'Ciência das Galáxias'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {streak > 1 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold animate-pulse">
              {streak}x Combo
            </span>
          )}
          <span className="flex items-center gap-1.5 text-celestial-gold font-semibold">
            <Trophy size={15} />
            <span>{score} pts</span>
          </span>
        </div>
      </div>

      {/* ── TELA DE RESULTADOS FINAL ── */}
      {completed ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg flex flex-col items-center text-center py-6 gap-4"
        >
          <div className="w-16 h-16 rounded-full bg-celestial-gold/10 border border-celestial-gold/30 flex items-center justify-center text-celestial-gold mb-1 shadow-[0_0_30px_rgba(229,196,131,0.3)]">
            <Sparkles size={32} />
          </div>

          <span className="text-[10px] uppercase tracking-[0.3em] text-celestial-gold font-mono">
            {rank.badge}
          </span>

          <h3 className="font-serif text-2xl sm:text-3xl text-white">
            {rank.title}
          </h3>

          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-md">
            {rank.desc} Você alcançou <strong className="text-celestial-gold font-mono text-base">{score} pontos</strong> nesta expedição pelas galáxias!
          </p>

          <button
            onClick={handleRestart}
            className="mt-4 px-6 py-3 rounded-full bg-celestial-gold text-midnight-950 font-mono text-xs uppercase tracking-wider font-semibold shadow-[0_0_20px_rgba(229,196,131,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <RotateCcw size={16} />
            <span>Novo Quiz Galáctico (Outras Perguntas)</span>
          </button>
        </motion.div>
      ) : (
        /* ── TELA DA PERGUNTA ATUAL ── */
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl flex flex-col items-center"
          >
            {/* Enunciado da Pergunta */}
            <h3 className="font-serif text-lg sm:text-2xl text-white text-center mb-6 leading-snug">
              {currentQ.question}
            </h3>

            {/* Alternativas */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correct;
                const showFeedback = selectedOption !== null;

                let btnStyle = "bg-white/[0.04] border-white/10 text-gray-200 hover:bg-white/[0.08] hover:border-celestial-gold/50";

                if (showFeedback) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.3)] font-medium";
                  } else if (isSelected) {
                    btnStyle = "bg-rose-950/70 border-rose-500 text-rose-200 opacity-90";
                  } else {
                    btnStyle = "bg-white/[0.02] border-white/5 text-gray-500 opacity-40";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={selectedOption !== null}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-sans transition-all duration-200 flex items-start gap-3 cursor-pointer disabled:cursor-default ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-full border border-white/20 shrink-0 flex items-center justify-center text-[10px] font-mono mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{option}</span>
                    {showFeedback && isCorrect && <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />}
                    {showFeedback && isSelected && !isCorrect && <XCircle size={18} className="text-rose-400 shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>

            {/* Explicação da Resposta & Botão Próxima */}
            {selectedOption !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full flex flex-col gap-4 p-4 sm:p-5 rounded-2xl bg-midnight-950/90 border border-white/10 shadow-lg"
              >
                <div className="flex items-start gap-2.5">
                  <HelpCircle size={17} className="text-celestial-gold shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                    <strong className="text-white font-medium">Curiosidade Galáctica: </strong>
                    {currentQ.explanation}
                  </p>
                </div>

                <button
                  onClick={handleNext}
                  className="self-end px-5 py-2.5 rounded-full bg-celestial-gold text-midnight-950 font-mono text-xs uppercase tracking-wider font-semibold hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>{currentIndex + 1 < questions.length ? 'Próxima Pergunta' : 'Ver Meu Desempenho'}</span>
                  <ArrowRight size={15} />
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
