import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, RotateCcw, CheckCircle2, XCircle, ArrowRight, HelpCircle } from 'lucide-react';

/**
 * BANCO EXPANSIVO DE 36+ PERGUNTAS CÓSMICAS E CURIOSIDADES
 * Mistura astronomia real de ponta com conexões exclusivas da Bela.
 */
const QUESTION_BANK = [
  // ── CIÊNCIA ESPACIAL & SISTEMA SOLAR ──
  {
    id: 'q1',
    category: 'Astrofísica',
    question: 'Qual é o planeta com a temperatura superficial mais quente de todo o Sistema Solar?',
    options: ['Vênus (cerca de 465 °C)', 'Mercúrio (o mais próximo do Sol)', 'Marte (o planeta de ferro)', 'Júpiter (o gigante de gás)'],
    correct: 0,
    explanation: 'Embora Mercúrio esteja mais perto do Sol, Vênus possui uma atmosfera densa de CO₂ que cria um efeito estufa colossal e atinge 465 °C, quente o bastante para derreter chumbo!'
  },
  {
    id: 'q2',
    category: 'Exploração Cósmica',
    question: 'Onde se localiza o maior vulcão de todo o Sistema Solar, o Monte Olimpo?',
    options: ['Em Marte (tem 22 km de altura)', 'Na Lua da Terra', 'Em Vênus', 'Nas luas de Saturno'],
    correct: 0,
    explanation: 'O Monte Olimpo em Marte tem 22 km de altitude — quase três vezes a altura do Monte Everest na Terra!'
  },
  {
    id: 'q3',
    category: 'Física da Luz',
    question: 'Quanto tempo a luz do Sol leva para viajar pelo vácuo e chegar até a Terra?',
    options: ['Cerca de 8 minutos e 20 segundos', 'Instantaneamente (0 segundos)', 'Exatamente 1 hora', 'Cerca de 24 horas'],
    correct: 0,
    explanation: 'A luz viaja a 300.000 km/s. Como a Terra está a 150 milhões de km do Sol, a luz emitida agora leva 8m20s para tocar nosso planeta!'
  },
  {
    id: 'q4',
    category: 'Planetas Extremos',
    question: 'Qual planeta possui ventos supersônicos furiosos que ultrapassam os 2.000 km/h?',
    options: ['Netuno', 'Marte', 'Júpiter', 'Terra'],
    correct: 0,
    explanation: 'Netuno tem a atmosfera mais tempestuosa e rápida do Sistema Solar, com ventos congelantes que quebram a barreira do som.'
  },
  {
    id: 'q5',
    category: 'Métricas Cósmicas',
    question: 'O que representa exatamente a medida astronômica de "1 Ano-Luz"?',
    options: [
      'A distância que a luz percorre em 1 ano (~9,46 trilhões de km)',
      'O tempo que a Terra leva para orbitar o Sol',
      'A velocidade máxima que uma nave espacial atinge',
      'O brilho total de uma estrela ao longo de um século'
    ],
    correct: 0,
    explanation: 'Ano-luz é uma unidade de distância, não de tempo! Corresponde a quase 9,5 trilhões de quilômetros percorridos pela luz no vácuo em um ano.'
  },
  {
    id: 'q6',
    category: 'Curiosidades Planetárias',
    question: 'Qual planeta do Sistema Solar tem densidade menor que a da água e flutuaria em uma banheira cósmica?',
    options: ['Saturno', 'Júpiter', 'Urano', 'Mercúrio'],
    correct: 0,
    explanation: 'A densidade média de Saturno é de cerca de 0,687 g/cm³. Como a da água é 1 g/cm³, se existisse um oceano cósmico gigante, Saturno boiaria!'
  },
  {
    id: 'q7',
    category: 'Dinâmica Orbital',
    question: 'Qual é o único planeta do Sistema Solar que gira quase inteiramente "deitado" de lado?',
    options: ['Urano (inclinação de 98°)', 'Netuno', 'Marte', 'Saturno'],
    correct: 0,
    explanation: 'Urano tem o eixo de rotação inclinado em cerca de 98 graus, provavelmente devido a uma colossal colisão cósmica no início de sua formação.'
  },
  {
    id: 'q8',
    category: 'Mecânica Celeste',
    question: 'Por que a Lua sempre mostra a mesma face para quem olha daqui da Terra?',
    options: [
      'Por rotação síncrona / acoplamento de maré gravitacional',
      'Porque a Lua não gira em torno do próprio eixo',
      'Porque o lado escuro é atraído pelo Sol',
      'Por uma ilusão de ótica da atmosfera terrestre'
    ],
    correct: 0,
    explanation: 'A gravidade da Terra desacelerou a rotação da Lua até que seu tempo de rotação se igualasse exatamente ao tempo de órbita (27,3 dias)!'
  },
  {
    id: 'q9',
    category: 'Astrofísica Estelar',
    question: 'Qual elemento químico é o combustível principal que o Sol funde em seu núcleo a cada segundo?',
    options: ['Hidrogênio (transformando-se em Hélio)', 'Oxigênio puro', 'Carbono incandescente', 'Ferro fundido'],
    correct: 0,
    explanation: 'O Sol funde mais de 600 milhões de toneladas de hidrogênio em hélio por segundo, liberando a energia que sustenta a vida na Terra.'
  },
  {
    id: 'q10',
    category: 'História da Astronomia',
    question: 'O que são as históricas "Luas Galileanas"?',
    options: [
      'As 4 maiores luas de Júpiter descobertas por Galileu em 1610',
      'As fases da Lua observadas pelos gregos antigos',
      'Crateras da Lua que receberam o nome de Galileu',
      'Satélites artificiais lançados na primeira missão à Lua'
    ],
    correct: 0,
    explanation: 'Io, Europa, Ganimedes e Calisto foram descobertas por Galileu Galilei em 1610, provando pela primeira vez que nem tudo no cosmos orbitava a Terra!'
  },
  {
    id: 'q11',
    category: 'Galáxias',
    question: 'Qual é a galáxia espiral gigante mais próxima da nossa Via Láctea?',
    options: ['Galáxia de Andrômeda (M31)', 'Galáxia do Sombrero', 'Galáxia do Triângulo', 'Pequena Nuvem de Magalhães'],
    correct: 0,
    explanation: 'Andrômeda está a 2,5 milhões de anos-luz de nós e contém mais de um trilhão de estrelas brilhando no espaço profundo.'
  },
  {
    id: 'q12',
    category: 'Tempo Cósmico',
    question: 'Em qual planeta um dia completo (rotação) dura mais tempo do que o seu próprio ano (translação)?',
    options: ['Vênus (dia de 243 dias terrestres vs ano de 225)', 'Mercúrio', 'Marte', 'Netuno'],
    correct: 0,
    explanation: 'Vênus gira tão lentamente e no sentido oposto que seu dia sideral dura 243 dias da Terra, enquanto seu ano ao redor do Sol leva 225 dias!'
  },
  {
    id: 'q13',
    category: 'Fronteira Interestelar',
    question: 'Qual é o objeto construído pela humanidade que viajou mais longe no espaço interestelar?',
    options: ['Sonda Voyager 1', 'Telescópio Espacial James Webb', 'Sonda New Horizons', 'Apollo 11'],
    correct: 0,
    explanation: 'Lançada em 1977, a Voyager 1 já superou 24 bilhões de quilômetros da Terra e viaja pelo vácuo entre as estrelas transportando o Disco de Ouro.'
  },
  {
    id: 'q14',
    category: 'Fenômenos Estelares',
    question: 'O que é uma Supernova?',
    options: [
      'A explosão monumental de uma estrela massiva no fim da vida',
      'O nascimento de um novo buraco negro no centro da Terra',
      'Uma chuva de meteoros cruzando a atmosfera',
      'Um cometa brilhante que passa a cada 1.000 anos'
    ],
    correct: 0,
    explanation: 'Supernovas liberam tanta luz quanto uma galáxia inteira e espalham os átomos pesados (como ferro e ouro) que hoje formam o universo e o nosso sangue!'
  },
  {
    id: 'q15',
    category: 'Física Espacial',
    question: 'Qual é a velocidade média da Terra ao redor do Sol ao longo da sua órbita?',
    options: ['Cerca de 29,8 km por segundo (~107.000 km/h)', 'Exatamente 1.000 km/h', 'Cerca de 300.000 km/s', 'Cerca de 5 km por hora'],
    correct: 0,
    explanation: 'Mesmo sem percebermos, todos nós estamos viajando pelo espaço a quase 30 quilômetros a cada único segundo ao redor do Sol!'
  },
  {
    id: 'q16',
    category: 'Luas Fascinantes',
    question: 'Qual lua do Sistema Solar possui uma atmosfera densa e mares de metano líquido?',
    options: ['Titã (lua de Saturno)', 'Europa (lua de Júpiter)', 'Nossa Lua', 'Fobos (lua de Marte)'],
    correct: 0,
    explanation: 'Titã é o único corpo além da Terra com lagos e rios líquidos em sua superfície, embora sejam compostos por hidrocarbonetos a -180 °C!'
  },
  {
    id: 'q17',
    category: 'Atmosferas Cósmicas',
    question: 'Por que o pôr do sol em Marte é azul, ao contrário do avermelhado da Terra?',
    options: [
      'Pela dispersão de luz na fina poeira de óxido de ferro marciana',
      'Porque Marte é mais frio que a Terra',
      'Por causa da água congelada nos polos marcianos',
      'Porque o Sol é menor quando visto de Marte'
    ],
    correct: 0,
    explanation: 'A poeira fina na tênue atmosfera de Marte permite que a luz azul penetre com mais eficiência, criando um poético pôr do sol azulado!'
  },
  {
    id: 'q18',
    category: 'Gravidade Planetária',
    question: 'Qual planeta tem a força da gravidade mais parecida com a da nossa Terra?',
    options: ['Vênus (cerca de 91% da gravidade terrestre)', 'Marte (38%)', 'A Lua (16%)', 'Júpiter (250%)'],
    correct: 0,
    explanation: 'Vênus tem massa e tamanho muito similares aos da Terra, de modo que lá você pesaria quase o mesmo que pesa aqui (91%)!'
  },

  // ── CONEXÕES ESPECIAIS COM A ISABELA (19 ANOS • 14/09/2007) ──
  {
    id: 'q19',
    category: 'Geologia Planetária & Bela',
    question: 'Em qual astro do Sistema Solar existe uma cratera de 175 km oficialmente batizada de "Cratera Isabella"?',
    options: ['No planeta Vênus', 'Na face oculta da Lua', 'No planeta vermelho Marte', 'Na superfície de Mercúrio'],
    correct: 0,
    explanation: 'A Cratera Isabella é a segunda maior cratera de impacto de Vênus (175 km), batizada e catalogada oficialmente pela NASA e União Astronômica Internacional!'
  },
  {
    id: 'q20',
    category: 'Etimologia & Astrologia',
    question: 'Qual planeta do Sistema Solar compartilha o mesmo radical etimológico latino com o sobrenome "Marty"?',
    options: ['Marte (o planeta guerreiro e destemido)', 'Mercúrio', 'Júpiter', 'Saturno'],
    correct: 0,
    explanation: '"Marty" descende do latim "Martius", consagrado ao planeta Marte — símbolo de iniciativa, determinação inabalável e brilho marcante!'
  },
  {
    id: 'q21',
    category: 'Ciclo Lunar de Meton',
    question: 'Qual lendário fenômeno astronômico de 19 anos se completa exatamente no aniversário da Bela?',
    options: [
      'O Ciclo de Meton (a Lua volta à mesma fase de quando ela nasceu)',
      'O alinhamento dos 8 planetas em linha reta',
      'O eclipse solar total mais longo do século',
      'A passagem do Cometa Halley pela órbita da Terra'
    ],
    correct: 0,
    explanation: 'A cada 19 anos (235 lunações), as fases da Lua coincidem com exatidão nas mesmas datas do calendário civil — um reencontro celeste perfeito aos 19 anos da Isabela!'
  },
  {
    id: 'q22',
    category: 'Atlas Estelar',
    question: 'Qual é a constelação astronômica do zodíaco que rege o céu no dia 14 de setembro?',
    options: ['Constelação de Virgem (Virgo)', 'Constelação de Leão (Leo)', 'Constelação de Órion (O Caçador)', 'Constelação de Escorpião'],
    correct: 0,
    explanation: 'No dia 14 de setembro, o Sol cruza a majestosa Constelação de Virgem, famosa pelo seu atlas de galáxias ricas e sua estrela alfa Spica!'
  },
  {
    id: 'q23',
    category: 'Estrelas de Virgem',
    question: 'Qual é a estrela mais brilhante da constelação de Virgem, brilhando em azul no mapa estelar da Bela?',
    options: ['Spica (Alpha Virginis)', 'Polaris', 'Betelgeuse', 'Sirius'],
    correct: 0,
    explanation: 'Spica é uma binária espetacular que brilha mais de 12.000 vezes que o Sol, sendo a 16ª estrela mais radiante de todo o céu noturno da Terra.'
  },
  {
    id: 'q24',
    category: 'Trilha Sonora Cósmica',
    question: 'Qual música inesquecível do The Weeknd faz parte da trilha sonora oficial deste Universo?',
    options: ['The Hills', 'Blinding Lights', 'Starboy', 'Save Your Tears'],
    correct: 0,
    explanation: '"The Hills" é a canção selecionada para acompanhar a expedição imersiva pelo universo cósmico da Bela!'
  },
  {
    id: 'q25',
    category: 'Física Gravitacional da Bela',
    question: 'Se a Isabela desse um pulo com força normal na superfície da Lua, qual altura ela atingiria?',
    options: ['Cerca de 3,0 metros de altura (com 3,8s no ar)', 'Apenas 20 centímetros', 'Ela flutuaria para sempre no espaço', 'Cerca de 50 metros'],
    correct: 0,
    explanation: 'Como a gravidade da Lua é apenas 16,6% da gravidade da Terra, a Bela saltaria 6 vezes mais alto, flutuando graciosamente por quase 4 segundos!'
  },
  {
    id: 'q26',
    category: 'Odômetro Cósmico',
    question: 'Quantos quilômetros a Isabela já viajou pelo universo desde 14/09/2007 apenas pela órbita da Terra?',
    options: ['Mais de 17,8 bilhões de quilômetros', 'Cerca de 100 mil quilômetros', 'Cerca de 1 milhão de quilômetros', 'Mais de 1 trilhão de quilômetros'],
    correct: 0,
    explanation: 'A 29,78 km/s ao redor do Sol, cada ano representa cerca de 940 milhões de km. Aos 19 anos, a Bela já navegou quase 18 bilhões de km pelo espaço!'
  },
  {
    id: 'q27',
    category: 'Ano Marciano da Bela',
    question: 'Quanto tempo dura um ano completo no planeta vermelho de Marte, o mundo da Capitã Marty?',
    options: ['687 dias terrestres (quase 2 anos da Terra)', '365 dias, igual à Terra', '88 dias', '12 anos terrestres'],
    correct: 0,
    explanation: 'Em Marte, um ano dura 687 dias terrestres. Por isso, na idade marciana, a Bela teria 10 aninhos marcianos de pura liderança!'
  },
  {
    id: 'q28',
    category: 'Luz no Espaço',
    question: 'A luz gerada no planeta Terra no dia do nascimento da Bela (14/09/2007) já viajou qual distância?',
    options: ['Mais de 179 trilhões de km (ultrapassando estrelas como Vega)', 'Apenas 1 milhão de km', 'Ela parou na órbita de Plutão', 'Cerca de 500 mil km'],
    correct: 0,
    explanation: 'A luz viaja no vácuo a 9,46 trilhões de km por ano. Em 19 anos, as ondas luminosas da chegada da Bela já cruzaram mais de 179 trilhões de km!'
  },
  {
    id: 'q29',
    category: 'Astro Favorito',
    question: 'Qual é a distância média aproximada que separa a Terra da Lua, o astro favorito da Bebela?',
    options: ['Cerca de 384.400 quilômetros', 'Cerca de 10.000 quilômetros', 'Mais de 50 milhões de quilômetros', 'Apenas 1.500 quilômetros'],
    correct: 0,
    explanation: 'A Lua está a uma distância média de 384.400 km — caberiam todos os outros 7 planetas do Sistema Solar enfileirados entre a Terra e a Lua!'
  },
  {
    id: 'q30',
    category: 'Comemoração Estelar',
    question: 'Quantos dias de sol, vida e histórias no planeta Terra a Isabela comemora ao completar 19 anos?',
    options: ['Exatamente 6.940 dias terrestres', 'Cerca de 3.000 dias', 'Exatamente 10.000 dias', 'Cerca de 1.900 dias'],
    correct: 0,
    explanation: '19 anos completos (incluindo os anos bissextos de 2008, 2012, 2016, 2020 e 2024) somam 6.940 dias de existência radiante!'
  },
  {
    id: 'q31',
    category: 'Sinais no Vácuo',
    question: 'Se um sinal de rádio for transmitido de Marte para a Terra, quanto tempo ele leva para chegar?',
    options: ['Entre 3 e 22 minutos (dependendo da posição das órbitas)', 'Instantaneamente', 'Mais de 2 dias', 'Cerca de 5 segundos'],
    correct: 0,
    explanation: 'Como a distância entre Terra e Marte varia de 55 a 400 milhões de km conforme orbitam o Sol, os sinais viajam na velocidade da luz entre 3 e 22 minutos!'
  },
  {
    id: 'q32',
    category: 'Constelações Vizinhas',
    question: 'Qual estrela gigante vermelha famosa da constelação de Boötes ajuda astrônomos a encontrar Spica no céu?',
    options: ['Arcturus (seguindo o arco da Ursa Maior)', 'Polaris', 'Rigel', 'Antares'],
    correct: 0,
    explanation: 'A famosa regra mnemônica dos astrônomos diz: "Siga o arco até Arcturus e continue a reta até Spica" para encontrar a joia de Virgem!'
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

// Cria uma rodada com 6 perguntas aleatórias com alternativas embaralhadas
function generateRound() {
  const selectedQuestions = shuffleArray(QUESTION_BANK).slice(0, 6);
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

  // Avaliação de patente com base no score
  const rank = useMemo(() => {
    if (score >= 600) return { title: 'Astrofísica Imperial da Galáxia', badge: '🌟 Mestria Cósmica Perfeita', desc: 'Conhecimento absoluto sobre os segredos do cosmos e as memórias estelares da Bela!' };
    if (score >= 400) return { title: 'Comandante Estelar Veterana', badge: '🚀 Patente Interestelar Avançada', desc: 'Desempenho estelar impressionante pelos mistérios do Sistema Solar e as conexões da Isabela!' };
    if (score >= 200) return { title: 'Exploradora do Cosmos', badge: '🔭 Curiosa das Estrelas', desc: 'Uma expedição admirável pelos mundos distantes e fatos reais do espaço!' };
    return { title: 'Cadete Espacial', badge: '🪐 Primeira Órbita', desc: 'O universo é vasto e está sempre pronto para ser redescoberto em uma nova viagem!' };
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
            • {currentQ?.category || 'Atlas Estelar'}
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
            {rank.desc} Você alcançou <strong className="text-celestial-gold font-mono text-base">{score} pontos</strong> nesta expedição estelar!
          </p>

          <button
            onClick={handleRestart}
            className="mt-4 px-6 py-3 rounded-full bg-celestial-gold text-midnight-950 font-mono text-xs uppercase tracking-wider font-semibold shadow-[0_0_20px_rgba(229,196,131,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <RotateCcw size={16} />
            <span>Novo Quiz (Novas Perguntas)</span>
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
                    <strong className="text-white font-medium">Curiosidade Científica: </strong>
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
