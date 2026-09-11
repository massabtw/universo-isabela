import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, RotateCcw, CheckCircle2, XCircle, ArrowRight, HelpCircle, Award, Star, Flame, Crown, Shield } from 'lucide-react';

/**
 * =========================================================================
 * BANCO DE QUESTÕES EXPANDIDO (56 PERGUNTAS: FÁCIL, MÉDIO E DIFÍCIL)
 * Astrofísica real, galáxias profundas, cosmologia e buracos negros.
 * =========================================================================
 */
const GALAXY_QUESTIONS = [
  // ─── NÍVEL FÁCIL (18 QUESTÕES) ───
  {
    id: 'f1',
    difficulty: 'Fácil',
    points: 100,
    category: 'Conceitos Cósmicos',
    question: 'O que significa exatamente a unidade de medida "Ano-Luz"?',
    options: [
      'A distância que a luz percorre no vácuo durante um ano (~9,46 trilhões de km)',
      'O tempo que a Terra leva para dar uma volta completa ao redor do Sol',
      'A quantidade de energia que uma estrela consome em 365 dias',
      'O tempo que leva para uma galáxia inteira nascer'
    ],
    correct: 0,
    explanation: 'Ano-luz não mede tempo, e sim uma distância monumental! A luz viaja a 300.000 km/s e em um ano percorre cerca de 9,46 trilhões de quilômetros.'
  },
  {
    id: 'f2',
    difficulty: 'Fácil',
    points: 100,
    category: 'Nossa Galáxia',
    question: 'Qual é o nome da galáxia onde vivemos junto com o Sistema Solar?',
    options: [
      'Via Láctea',
      'Andrômeda',
      'Galáxia do Sombrero',
      'Galáxia do Triângulo'
    ],
    correct: 0,
    explanation: 'A Via Láctea ("Caminho de Leite") abriga nosso Sol e entre 100 a 400 bilhões de outras estrelas com seus planetas.'
  },
  {
    id: 'f3',
    difficulty: 'Fácil',
    points: 100,
    category: 'Estrelas',
    question: 'Qual é a estrela mais próxima do planeta Terra?',
    options: [
      'O Sol',
      'Próxima Centauri',
      'Sirius',
      'Betelgeuse'
    ],
    correct: 0,
    explanation: 'O Sol é a estrela mais próxima, a cerca de 150 milhões de quilômetros (8 minutos-luz). A segunda mais próxima é Próxima Centauri, a 4,24 anos-luz.'
  },
  {
    id: 'f4',
    difficulty: 'Fácil',
    points: 100,
    category: 'Gravidade & Órbitas',
    question: 'O que mantém a Lua girando em órbita contínua ao redor da Terra?',
    options: [
      'A atração da força gravitacional da Terra',
      'O vento solar empurrando a Lua pelo espaço',
      'O campo magnético gerado pelos polos',
      'A pressão de luz refletida pelos oceanos'
    ],
    correct: 0,
    explanation: 'A gravidade mútua entre Terra e Lua curva a trajetória lunar em uma órbita estável que já dura mais de 4,5 bilhões de anos.'
  },
  {
    id: 'f5',
    difficulty: 'Fácil',
    points: 100,
    category: 'Luz & Sombras',
    question: 'Por que o céu da Terra é azul durante o dia ensolarado?',
    options: [
      'Devido ao Espalhamento de Rayleigh dos gases da atmosfera, que dispersa luz azul',
      'Porque a atmosfera reflete o azul dos oceanos',
      'Porque o oxigênio puro brilha naturalmente na cor azul',
      'Porque o vácuo espacial ao redor é azul-escuro'
    ],
    correct: 0,
    explanation: 'O Espalhamento de Rayleigh faz com que os comprimentos de onda curtos da luz solar (azul e violeta) se espalhem em todas as direções pelos gases do ar.'
  },
  {
    id: 'f6',
    difficulty: 'Fácil',
    points: 100,
    category: 'Morfologia',
    question: 'Qual é a forma aproximada da nossa galáxia, a Via Láctea?',
    options: [
      'Um disco espiral achatado com braços girando',
      'Uma esfera perfeita e maciça',
      'Um cubo tridimensional de poeira',
      'Um triângulo estelar sem rotação'
    ],
    correct: 0,
    explanation: 'A Via Láctea é um disco com cerca de 100.000 anos-luz de diâmetro e espessura de apenas 1.000 anos-luz, com braços espirais majestosos.'
  },
  {
    id: 'f7',
    difficulty: 'Fácil',
    points: 100,
    category: 'Vizinhança Cósmica',
    question: 'Qual é a maior galáxia espiral vizinha da Via Láctea visível a olho nu?',
    options: [
      'Galáxia de Andrômeda (M31)',
      'Galáxia do Rodopio (M101)',
      'Galáxia do Foguete (Centaurus A)',
      'Grande Nuvem de Oort'
    ],
    correct: 0,
    explanation: 'A Galáxia de Andrômeda fica a 2,5 milhões de anos-luz e é o objeto mais distante visível a olho nu em noites escuras.'
  },
  {
    id: 'f8',
    difficulty: 'Fácil',
    points: 100,
    category: 'Tempo & Luz',
    question: 'Quanto tempo a luz do Sol leva para viajar pelo vácuo até atingir a Terra?',
    options: [
      'Aproximadamente 8 minutos e 20 segundos',
      'Exatamente 1 segundo',
      'Cerca de 24 horas',
      'Quase 1 mês'
    ],
    correct: 0,
    explanation: 'A luz viaja a 300.000 km/s. Para percorrer os 149,6 milhões de km entre o Sol e a Terra, leva cerca de 8 minutos e 20 segundos.'
  },
  {
    id: 'f9',
    difficulty: 'Fácil',
    points: 100,
    category: 'Massa no Espaço',
    question: 'Qual é o maior planeta do nosso Sistema Solar?',
    options: [
      'Júpiter',
      'Saturno',
      'Netuno',
      'Marte'
    ],
    correct: 0,
    explanation: 'Júpiter é tão colossal que caberiam mais de 1.300 planetas Terra inteiros dentro do seu volume gasoso!'
  },
  {
    id: 'f10',
    difficulty: 'Fácil',
    points: 100,
    category: 'Temperatura Estelar',
    question: 'Entre as estrelas visíveis no céu noturno, qual cor indica a estrela mais quente?',
    options: [
      'Azul ou branca azulada',
      'Vermelha escura',
      'Amarela como o Sol',
      'Alaranjada'
    ],
    correct: 0,
    explanation: 'Ao contrário das torneiras terrenas, na física das estrelas o azul é hiperquente (>20.000 K), enquanto o vermelho indica superfícies mais frias (~3.000 K).'
  },
  {
    id: 'f11',
    difficulty: 'Fácil',
    points: 100,
    category: 'Berçários Estelares',
    question: 'Como os astrônomos chamam as imensas nuvens cósmicas de gás e poeira onde novas estrelas nascem?',
    options: [
      'Nebulosas',
      'Cometas',
      'Buracos de minhoca',
      'Asteroides'
    ],
    correct: 0,
    explanation: 'Nebulosas estelares (como a famosa Nebulosa de Órion) condensam hidrogênio e hélio pela gravidade até acender novas estrelas bebês.'
  },
  {
    id: 'f12',
    difficulty: 'Fácil',
    points: 100,
    category: 'Velocidade Cósmica',
    question: 'Qual é a maior velocidade possível para qualquer partícula com ou sem informação no Universo?',
    options: [
      'A velocidade da luz no vácuo (~300.000 km/s)',
      'A velocidade do som no ar (~340 m/s)',
      'A velocidade de rotação da Terra',
      'A velocidade de um relâmpago'
    ],
    correct: 0,
    explanation: 'A velocidade "c" é o limite absoluto da causalidade cósmica segundo a Teoria da Relatividade Especial de Einstein.'
  },
  {
    id: 'f13',
    difficulty: 'Fácil',
    points: 100,
    category: 'Buracos Negros',
    question: 'Por que nada, nem mesmo um raio de luz, consegue escapar de um buraco negro?',
    options: [
      'Porque a gravidade é tão intensa que a velocidade de escape supera a velocidade da luz',
      'Porque o buraco negro é feito de matéria congelada que absorve luz',
      'Porque o vácuo dentro dele é desprovido de eletromagnetismo',
      'Porque os espelhos quânticos desviam os fótons para trás'
    ],
    correct: 0,
    explanation: 'Passando do "Horizonte de Eventos", a curvatura do espaço-tempo se fecha de tal forma que todas as trajetórias futuras apontam diretamente para a singularidade.'
  },
  {
    id: 'f14',
    difficulty: 'Fácil',
    points: 100,
    category: 'Idade do Universo',
    question: 'Qual é a idade aproximada do nosso Universo desde o Big Bang?',
    options: [
      'Cerca de 13,8 bilhões de anos',
      'Cerca de 4,5 bilhões de anos',
      'Aproximadamente 200 milhões de anos',
      'Mais de 500 trilhões de anos'
    ],
    correct: 0,
    explanation: 'Missões espaciais como Planck e WMAP mediram a Radiação Cósmica de Fundo e determinaram a idade do cosmos em 13,787 bilhões de anos!'
  },
  {
    id: 'f15',
    difficulty: 'Fácil',
    points: 100,
    category: 'A Lua',
    question: 'Por que vemos sempre a mesma face da Lua voltada para a Terra?',
    options: [
      'Porque o período de rotação da Lua é sincronizado com o período de sua translação orbital (Acoplamento de Maré)',
      'Porque a Lua não gira sobre seu próprio eixo',
      'Porque a gravidade do Sol impede o giro lunar',
      'Porque a outra face é completamente oca e mais leve'
    ],
    correct: 0,
    explanation: 'As forças de maré da Terra desaceleraram a rotação da Lua ao longo de bilhões de anos até que o dia lunar ficasse perfeitamente igual ao seu mês orbital.'
  },
  {
    id: 'f16',
    difficulty: 'Fácil',
    points: 100,
    category: 'Elementos Primordiais',
    question: 'Qual é o elemento químico mais abundante em todo o Universo?',
    options: [
      'Hidrogênio (~75% de toda a massa bariônica)',
      'Oxigênio',
      'Ferro',
      'Carbono'
    ],
    correct: 0,
    explanation: 'O hidrogênio compõe três quartos de toda a matéria comum visível e serve como combustível primário para o brilho de quase todas as estrelas.'
  },
  {
    id: 'f17',
    difficulty: 'Fácil',
    points: 100,
    category: 'Explosões Estelares',
    question: 'Como se chama a morte cataclísmica de uma estrela massiva que brilha mais do que uma galáxia inteira?',
    options: [
      'Supernova',
      'Aurora Boreal',
      'Eclipse Total',
      'Foguete de Fótons'
    ],
    correct: 0,
    explanation: 'Uma supernova libera tanta energia em segundos quanto o nosso Sol liberará durante toda a sua existência de 10 bilhões de anos!'
  },
  {
    id: 'f18',
    difficulty: 'Fácil',
    points: 100,
    category: 'Galáxias Satélites',
    question: 'Quais são as duas galáxias anãs satélites da Via Láctea visíveis com facilidade nos céus do Hemisfério Sul?',
    options: [
      'Grande e Pequena Nuvem de Magalhães',
      'Galáxia do Triângulo e Andrômeda',
      'Centauro A e Ômega Centauri',
      'Cão Maior e Boieiro'
    ],
    correct: 0,
    explanation: 'As Nuvens de Magalhães foram registradas pelo navegador Fernão de Magalhães em 1519 e orbitam nossa Via Láctea a cerca de 160.000 anos-luz.'
  },

  // ─── NÍVEL MÉDIO (20 QUESTÕES) ───
  {
    id: 'm1',
    difficulty: 'Médio',
    points: 200,
    category: 'Núcleos Galácticos',
    question: 'Qual é o nome do buraco negro supermassivo que habita o centro exato da nossa Via Láctea?',
    options: [
      'Sagittarius A* (Sgr A*)',
      'Cygnus X-1',
      'M87*',
      'Gargantua'
    ],
    correct: 0,
    explanation: 'Sagittarius A* possui uma massa de 4,3 milhões de sóis concentrada em uma região menor que a órbita de Mercúrio, fotografado pelo EHT em 2022.'
  },
  {
    id: 'm2',
    difficulty: 'Médio',
    points: 200,
    category: 'Morfologia Galáctica',
    question: 'Qual é a classificação morfológica detalhada da Via Láctea segundo a Sequência de Hubble?',
    options: [
      'Espiral Barrada (SBbc)',
      'Elíptica Gigante (E0)',
      'Galáxia Irregular Tipo Im',
      'Lenticular Anelar (S0)'
    ],
    correct: 0,
    explanation: 'A Via Láctea possui uma barra central densa de estrelas com cerca de 27.000 anos-luz de comprimento de onde emergem seus braços espirais.'
  },
  {
    id: 'm3',
    difficulty: 'Médio',
    points: 200,
    category: 'Futuro Cósmico',
    question: 'O que acontecerá daqui a aproximadamente 4,5 bilhões de anos entre a Via Láctea e a Galáxia de Andrômeda?',
    options: [
      'Elas colidirão e se fundirão gradualmente em uma única galáxia elíptica ("Lactômeda")',
      'Elas se repelirão para sempre devido à aceleração da energia escura',
      'Andrômeda sugará todo o gás da Via Láctea sem colidir estrelas',
      'Ambas serão engolidas por um quasar interestelar'
    ],
    correct: 0,
    explanation: 'Apesar de colidirem a 110 km/s, a distância entre estrelas individuais é tão imensa que praticamente nenhuma estrela baterá de frente com outra!'
  },
  {
    id: 'm4',
    difficulty: 'Médio',
    points: 200,
    category: 'Telescópios Espaciais',
    question: 'Por que o Telescópio Espacial James Webb (JWST) observa o cosmos predominantemente no espectro Infravermelho?',
    options: [
      'Para enxergar através da poeira cósmica e captar a luz esticada pelo desvio para o vermelho (redshift)',
      'Porque a luz infravermelha não esquenta os espelhos dourados de berílio',
      'Porque não existem estrelas emitindo luz visível no espaço profundo',
      'Para evitar a interferência das ondas de rádio dos satélites terrestres'
    ],
    correct: 0,
    explanation: 'A expansão contínua do espaço estica as ondas de luz das primeiras galáxias do visível/ultravioleta até o infravermelho profundo ao longo de 13 bilhões de anos.'
  },
  {
    id: 'm5',
    difficulty: 'Médio',
    points: 200,
    category: 'Galáxias Famosas',
    question: 'Qual é a característica marcante que deu à Galáxia do Sombrero (M104) seu apelido icônico?',
    options: [
      'Um proeminente bojo central brilhante cercado por uma faixa espessa de poeira escura no equador',
      'Braços em espiral em formato de asas de águia',
      'Uma coloração puramente verde gerada por radiação de oxigênio ionizado',
      'Dois anéis concêntricos que giram em sentidos opostos'
    ],
    correct: 0,
    explanation: 'Situada na borda do Aglomerado de Virgem, M104 vista de perfil assemelha-se perfeitamente a um clássico chapéu mexicano sombrero.'
  },
  {
    id: 'm6',
    difficulty: 'Médio',
    points: 200,
    category: 'Mecânica Celeste',
    question: 'O que é o "Ano Galáctico" ou Ano Cósmico?',
    options: [
      'O tempo que o Sol leva para completar uma órbita inteira ao redor do centro da Via Láctea (~230 milhões de anos)',
      'O tempo necessário para uma galáxia anã colidir com uma espiral',
      'A duração da vida total de uma estrela anã amarela',
      'O período entre dois alinhamentos planetários completos'
    ],
    correct: 0,
    explanation: 'O Sol viaja a cerca de 828.000 km/h ao redor do núcleo galáctico. A última vez que estivemos na posição orbital atual, os dinossauros estavam surgindo!'
  },
  {
    id: 'm7',
    difficulty: 'Médio',
    points: 200,
    category: 'Superestruturas',
    question: 'A qual grupo de galáxias a nossa Via Láctea, Andrômeda e a Galáxia do Triângulo pertencem?',
    options: [
      'Grupo Local de Galáxias',
      'Aglomerado de Coma',
      'Complexo de Centauro',
      'Superaglomerado de Perseu'
    ],
    correct: 0,
    explanation: 'O Grupo Local contém mais de 80 galáxias (a maioria anãs) gravitacionalmente unidas em um diâmetro de cerca de 10 milhões de anos-luz.'
  },
  {
    id: 'm8',
    difficulty: 'Médio',
    points: 200,
    category: 'Morte Estelar',
    question: 'O que resta no núcleo após o colapso de uma estrela com massa intermediária (entre 10 e 25 massas solares)?',
    options: [
      'Uma Estrela de Nêutrons (ou Pulsar)',
      'Uma Anã Branca de carbono',
      'Um Buraco Negro Supermassivo',
      'Uma Anã Marrom fria'
    ],
    correct: 0,
    explanation: 'Estrelas de nêutrons compactam a massa de 1 a 2 sóis em uma esfera com apenas 20 km de diâmetro, onde uma colher de chá pesaria bilhões de toneladas.'
  },
  {
    id: 'm9',
    difficulty: 'Médio',
    points: 200,
    category: 'Aceleração Cósmica',
    question: 'Quem descobriu que o Universo está se expandindo ao medir as velocidades de recessão de outras galáxias em 1929?',
    options: [
      'Edwin Hubble',
      'Isaac Newton',
      'Galileu Galilei',
      'Carl Sagan'
    ],
    correct: 0,
    explanation: 'Edwin Hubble, usando o telescópio Hooker de Monte Wilson, provou a relação linear entre distância e velocidade de recessão (Lei de Hubble-Lemaître).'
  },
  {
    id: 'm10',
    difficulty: 'Médio',
    points: 200,
    category: 'Poeira & Gás',
    question: 'Por que os braços espirais das galáxias costumam apresentar uma cor visivelmente mais azulada que o bojo central?',
    options: [
      'Porque abrigam estrelas jovens, massivas e hiperquentes recém-nascidas da poeira cósmica',
      'Porque contêm blocos gigantescos de gelo de água interestelar',
      'Porque o efeito Doppler aproxima os braços dos telescópios',
      'Porque a gravidade nos braços é menor que no centro'
    ],
    correct: 0,
    explanation: 'As estrelas azuis tipo O e B consomem seu combustível rapidamente e vivem apenas dezenas de milhões de anos, morrendo ainda perto de onde nasceram nos braços.'
  },
  {
    id: 'm11',
    difficulty: 'Médio',
    points: 200,
    category: 'Ondas Espaciais',
    question: 'O que causou as primeiras Ondas Gravitacionais detectadas historicamente pelo observatório LIGO em 2015?',
    options: [
      'A fusão violenta de dois buracos negros a 1,3 bilhão de anos-luz',
      'A colisão de dois cometas gigantes em Júpiter',
      'A erupção de uma mancha no Sol',
      'A passagem de um asteroide rasante na Lua'
    ],
    correct: 0,
    explanation: 'A colisão converteu três massas solares inteiras de matéria pura em energia pura de distorção do espaço-tempo em fração de segundo!'
  },
  {
    id: 'm12',
    difficulty: 'Médio',
    points: 200,
    category: 'Galáxias Espirais',
    question: 'Qual é o nome da famosa galáxia espiral "face-on" (vista de cima) catalogada como M51 no Catálogo Messier?',
    options: [
      'Galáxia do Redemoinho (Whirlpool)',
      'Galáxia do Olho Negro',
      'Galáxia da Girândola',
      'Galáxia do Charuto'
    ],
    correct: 0,
    explanation: 'M51 exibe braços espirais clássicos nítidos influenciados pela atração gravitacional de sua galáxia companheira menor NGC 5195.'
  },
  {
    id: 'm13',
    difficulty: 'Médio',
    points: 200,
    category: 'Composição do Cosmos',
    question: 'Aproximadamente que porcentagem do Universo é composta de matéria comum (bariônica: átomos de estrelas, planetas e pessoas)?',
    options: [
      'Apenas ~5%',
      'Cerca de 50%',
      'Quase 85%',
      'Exatos 99%'
    ],
    correct: 0,
    explanation: 'Tudo o que conseguimos tocar, ver e medir nos telescópios compõe meros 5% do cosmos. O restante divide-se em Matéria Escura (~27%) e Energia Escura (~68%).'
  },
  {
    id: 'm14',
    difficulty: 'Médio',
    points: 200,
    category: 'Canibalismo Galáctico',
    question: 'Como os astrônomos chamam o processo em que galáxias gigantes despedaçam e absorvem galáxias menores?',
    options: [
      'Canibalismo Galáctico',
      'Evaporação de Eddington',
      'Espaguetificação Solar',
      'Implosão Radiativa'
    ],
    correct: 0,
    explanation: 'Nossa própria Via Láctea está neste exato momento canibalizando e absorvendo as correntes estelares da Galáxia Anã Elíptica de Sagitário.'
  },
  {
    id: 'm15',
    difficulty: 'Médio',
    points: 200,
    category: 'Relatividade Geral',
    question: 'O que ocorre com a passagem do tempo quando um observador se aproxima cada vez mais do horizonte de um buraco negro?',
    options: [
      'O tempo para o observador passa mais devagar em relação a quem está distante (Dilatação Temporal Gravitacional)',
      'O tempo se inverte instantaneamente rumo ao passado',
      'O tempo acelera exponencialmente em direção ao fim do cosmos',
      'O tempo para de existir apenas no relógio de pulso mecânico'
    ],
    correct: 0,
    explanation: 'A dilatação temporal gravitacional prevista por Einstein faz com que um observador externo veja o viajante congelar visualmente ao tocar o horizonte.'
  },
  {
    id: 'm16',
    difficulty: 'Médio',
    points: 200,
    category: 'Astrofotografia Clássica',
    question: 'Qual foi o feito inesquecível do telescópio Hubble ao apontar para um ponto escuro e "vazio" do céu por 10 dias em 1995?',
    options: [
      'Revelou o "Hubble Deep Field" com quase 3.000 galáxias onde se pensava não haver nada',
      'Descobriu a borda física intransponível do Universo',
      'Fotografou a superfície de um exoplaneta rochoso em alta resolução',
      'Provou que o espaço é preenchido por espelhos gravitacionais'
    ],
    correct: 0,
    explanation: 'O Hubble Deep Field revolucionou a cosmologia ao provar que o Universo observável está densamente povoado por centenas de bilhões de galáxias.'
  },
  {
    id: 'm17',
    difficulty: 'Médio',
    points: 200,
    category: 'Braços da Via Láctea',
    question: 'Em qual braço espiral da Via Láctea o nosso Sistema Solar está localizado?',
    options: [
      'Braço de Órion (Esporão de Órion)',
      'Braço de Perseus',
      'Braço de Escudo-Cruzeiro',
      'Braço de Sagitário'
    ],
    correct: 0,
    explanation: 'O Sol fica no Esporão de Órion-Cygnus, uma ponte intermediária graciosa entre os grandes braços de Sagitário e Perseus.'
  },
  {
    id: 'm18',
    difficulty: 'Médio',
    points: 200,
    category: 'Campos Magnéticos',
    question: 'O que é um "Magnetar"?',
    options: [
      'Uma estrela de nêutrons com um campo magnético até 1 trilhão de vezes mais forte que o da Terra',
      'Um asteroide rico em ferro e níquel magnetizado',
      'Um planeta gigante que absorve o vento de sua estrela mãe',
      'Um buraco negro que gira emitindo luz ultravioleta pura'
    ],
    correct: 0,
    explanation: 'Um magnetar possui o campo magnético mais extremo do Universo: se estivesse a 1.000 km, dissolveria as próprias nuvens de elétrons dos átomos de qualquer matéria!'
  },
  {
    id: 'm19',
    difficulty: 'Médio',
    points: 200,
    category: 'Lentes Gravitacionais',
    question: 'O que causa o fenômeno cósmico da "Lente Gravitacional"?',
    options: [
      'A curvatura do espaço-tempo provocada por uma massa gigantesca que desvia e amplifica a luz de galáxias ao fundo',
      'Cristais gigantes de gelo suspensos no vácuo interestelar',
      'A rotação de buracos de minhoca que refletem fótons',
      'A perda de energia da luz ao colidir com partículas de poeira'
    ],
    correct: 0,
    explanation: 'Prevista por Einstein em 1936, a gravidade de aglomerados inteiros de galáxias atua como uma lente gigante natural ("Anel de Einstein"), revelando o Universo profundo.'
  },
  {
    id: 'm20',
    difficulty: 'Médio',
    points: 200,
    category: 'Origem dos Elementos',
    question: 'De onde vieram quase todos os átomos de ouro, platina e urânio presentes na Terra?',
    options: [
      'Da violenta fusão e colisão entre duas estrelas de nêutrons (Quilonovas)',
      'Da queima normal do hidrogênio no centro do Sol',
      'Da condensação direta do vácuo no Big Bang',
      'Da poeira do anel de Saturno ao cair na Terra'
    ],
    correct: 0,
    explanation: 'O processo r de captura rápida de nêutrons durante quilonovas forja os elementos mais pesados da tabela periódica, espalhando ouro pelo cosmo!'
  },

  // ─── NÍVEL DIFÍCIL (18 QUESTÕES) ───
  {
    id: 'd1',
    difficulty: 'Difícil',
    points: 300,
    category: 'Cosmologia Observacional',
    question: 'Qual é a temperatura média atual da Radiação Cósmica de Fundo em Micro-ondas (CMB)?',
    options: [
      'Aproximadamente 2,725 Kelvin (-270,42 °C)',
      'Exatamente zero absoluto (0 Kelvin)',
      'Cerca de 100 Kelvin (-173 °C)',
      'Aproximadamente 25 Kelvin (-248 °C)'
    ],
    correct: 0,
    explanation: 'A CMB é o eco fóssil térmico do Big Bang gerado 380.000 anos após o início do cosmos, resfriado pela expansão do espaço até 2,725 K.'
  },
  {
    id: 'd2',
    difficulty: 'Difícil',
    points: 300,
    category: 'Massa Crítica',
    question: 'Qual é o valor aproximado do "Limite de Chandrasekhar" para o colapso de uma Anã Branca?',
    options: [
      'Aproximadamente 1,4 massas solares',
      'Exatamente 3,0 massas solares',
      'Cerca de 10,0 massas solares',
      'Aproximadamente 0,5 massa solar'
    ],
    correct: 0,
    explanation: 'Se uma anã branca ultrapassar 1,44 massa solar, a pressão de degenerescência eletrônica quântica não resiste e ela explode em uma supernova Tipo Ia.'
  },
  {
    id: 'd3',
    difficulty: 'Difícil',
    points: 300,
    category: 'Monstros Cósmicos',
    question: 'Qual é a maior galáxia já catalogada na história da astronomia em extensão física?',
    options: [
      'IC 1101 (com diâmetro estimado de 4 a 6 milhões de anos-luz e 100 trilhões de estrelas)',
      'Galáxia de Andrômeda',
      'Messier 87 (M87)',
      'NGC 1300'
    ],
    correct: 0,
    explanation: 'A supergigante elíptica IC 1101 é mais de 50 vezes maior que a Via Láctea: se ficasse no lugar da nossa galáxia, engoliria a Via Láctea, Andrômeda e o Triângulo juntos!'
  },
  {
    id: 'd4',
    difficulty: 'Difícil',
    points: 300,
    category: 'Núcleos Ativos (AGN)',
    question: 'O que diferencia um Quasar de uma galáxia comum com buraco negro adormecido?',
    options: [
      'Seu disco de acreção emite centenas de vezes mais luz que todas as estrelas da galáxia hospedeira combinadas',
      'Ele é composto inteiramente por antimatéria e não possui estrelas',
      'Ele se desloca no espaço mais rápido que a velocidade da luz',
      'Sua gravidade é nula nas bordas do disco'
    ],
    correct: 0,
    explanation: 'Quasares são alimentados por monstros famintos devorando dezenas de massas solares por ano, brilhando como os faróis mais brilhantes do Universo primitivo.'
  },
  {
    id: 'd5',
    difficulty: 'Difícil',
    points: 300,
    category: 'Superestruturas Cósmicas',
    question: 'Qual é o nome do imenso superaglomerado de galáxias que abriga o Grupo Local e cujo nome havaiano significa "Céu Incomensurável"?',
    options: [
      'Laniakea',
      'Shapley',
      'Boötes',
      'Coma Berenices'
    ],
    correct: 0,
    explanation: 'Mapeado em 2014, Laniakea estende-se por 520 milhões de anos-luz, contendo mais de 100.000 galáxias fluindo em direção ao Grande Atrator.'
  },
  {
    id: 'd6',
    difficulty: 'Difícil',
    points: 300,
    category: 'Matéria Escura',
    question: 'O que a astrônoma Vera Rubin descobriu nas Curvas de Rotação Galáctica que comprovou a existência da Matéria Escura?',
    options: [
      'As estrelas na borda externa das galáxias giram tão rápido quanto as do centro, desafiando a gravidade visível de Newton',
      'As estrelas externas estavam escapando e sendo expulsas no vácuo',
      'O centro da galáxia não girava em torno do buraco negro',
      'As galáxias anãs eram atraídas em velocidade negativa'
    ],
    correct: 0,
    explanation: 'Pela física de Newton, as bordas deveriam girar devagar. Como giram a velocidades uniformes e altíssimas, isso exige um halo maciço invisível de matéria escura envolvendo a galáxia.'
  },
  {
    id: 'd7',
    difficulty: 'Difícil',
    points: 300,
    category: 'Paradoxos Cósmicos',
    question: 'O que propõe o "Paradoxo de Olbers" sobre a escuridão da noite?',
    options: [
      'Se o Universo fosse estático, infinito e eterno, a noite deveria ser tão clara quanto o Sol devido a infinitas estrelas em todas as direções',
      'Por que a luz das estrelas não queima a atmosfera da Terra',
      'Por que os buracos negros não absorvem a luz da Lua',
      'Por que as galáxias não giram todas na mesma direção'
    ],
    correct: 0,
    explanation: 'A noite é escura porque o Universo tem uma idade finita (13,8 bi de anos) e a luz de galáxias distantes ainda não teve tempo de chegar, além do redshift da expansão.'
  },
  {
    id: 'd8',
    difficulty: 'Difícil',
    points: 300,
    category: 'Dinâmica Galáctica',
    question: 'Segundo a Teoria das Ondas de Densidade de Lin e Shu, por que os braços espirais persistem sem se enrolar e sumir?',
    options: [
      'Eles são ondas de choque gravitacionais semirrígidas de compressão de densidade através das quais estrelas e gás entram e saem',
      'Eles são mantidos por cabos de plasma supercondutor hiperdenso',
      'Eles são formados exclusivamente por estrelas de ferro rígido',
      'Eles são alimentados por jatos relativísticos de supernovas contínuas'
    ],
    correct: 0,
    explanation: 'Como um engarrafamento em uma autoestrada: os carros entram na lentidão e saem, mas a zona de tráfego denso (o braço espiral) permanece visível!'
  },
  {
    id: 'd9',
    difficulty: 'Difícil',
    points: 300,
    category: 'Buracos Negros Rotativos',
    question: 'Como se chama a região externa ao horizonte de eventos de um buraco negro de Kerr em rotação, onde o próprio espaço é arrastado?',
    options: [
      'Ergosfera',
      'Esfera de Dyson',
      'Raio de Schwarzschild',
      'Limite de Roche'
    ],
    correct: 0,
    explanation: 'Pelo efeito Lense-Thirring (arrasto de referenciais), dentro da ergosfera é fisicamente impossível ficar parado em relação ao infinito: o espaço gira junto com o buraco negro.'
  },
  {
    id: 'd10',
    difficulty: 'Difícil',
    points: 300,
    category: 'Radiação Fóssil',
    question: 'Em que momento da história cósmica a luz se separou da matéria (Era da Recombinação), permitindo a formação da CMB?',
    options: [
      'Aproximadamente 380.000 anos após o Big Bang (a um redshift z ≈ 1100)',
      'Exatamente 3 segundos após o Big Bang',
      'Cerca de 1 bilhão de anos após o Big Bang',
      'Na primeira fração de segundo da Inflação Cósmica'
    ],
    correct: 0,
    explanation: 'Quando a temperatura caiu para ~3.000 K, elétrons se uniram a prótons formando hidrogênio neutro, e o cosmos de repente tornou-se transparente à luz!'
  },
  {
    id: 'd11',
    difficulty: 'Difícil',
    points: 300,
    category: 'Mecânica Celeste Extrema',
    question: 'O que define o "Limite de Roche" de um corpo celeste orbitando outro?',
    options: [
      'A distância mínima na qual a força de maré de um planeta despedaça um satélite mantido apenas pela própria gravidade',
      'A velocidade máxima antes de um elétron colidir com um próton estelar',
      'A distância máxima em que a luz de uma galáxia consegue escapar de um aglomerado',
      'A altura orbital em que a atmosfera se extingue totalmente'
    ],
    correct: 0,
    explanation: 'Os exuberantes anéis de Saturno são restos de cometas e luas que cruzaram o Limite de Roche e foram estilhaçados em bilhões de pedregulhos orbitais.'
  },
  {
    id: 'd12',
    difficulty: 'Difícil',
    points: 300,
    category: 'Energia do Vácuo',
    question: 'Qual é o fenômeno quântico experimental onde duas placas metálicas no vácuo puro são atraídas por flutuações quânticas?',
    options: [
      'Efeito Casimir',
      'Efeito Zeeman',
      'Efeito Fotoelétrico',
      'Tunelamento Quântico'
    ],
    correct: 0,
    explanation: 'O Efeito Casimir demonstra que mesmo o "vácuo absoluto" ferve com partículas virtuais nascendo e aniquilando-se, ligado à energia escura.'
  },
  {
    id: 'd13',
    difficulty: 'Difícil',
    points: 300,
    category: 'Aglomerados Galácticos',
    question: 'Qual é o aglomerado de galáxias mais massivo nas vizinhanças do Grupo Local, contendo mais de 2.000 galáxias?',
    options: [
      'Aglomerado de Virgem (Virgo Cluster)',
      'Aglomerado de Fornax',
      'Aglomerado de Hércules',
      'Aglomerado do Centauro'
    ],
    correct: 0,
    explanation: 'O Aglomerado de Virgem domina o coração do Superaglomerado de Virgem, puxando a nossa Via Láctea e Andrômeda a quase 400 km/s em sua direção.'
  },
  {
    id: 'd14',
    difficulty: 'Difícil',
    points: 300,
    category: 'Cosmologia Relativística',
    question: 'Qual parâmetro adimensional "w" na equação de estado da Energia Escura determina se o Universo terminará em um "Big Rip"?',
    options: [
      'Se a razão entre pressão e densidade de energia for w < -1 (Energia Fantasma)',
      'Se a densidade bariônica for w = 0',
      'Se a curvatura for positiva com w = +1/3',
      'Se a velocidade da luz diminuir com o tempo'
    ],
    correct: 0,
    explanation: 'Se a pressão for negativa com w < -1, a taxa de expansão diverge no futuro finito, rasgando galáxias, estrelas e até os átomos no Big Rip.'
  },
  {
    id: 'd15',
    difficulty: 'Difícil',
    points: 300,
    category: 'Galáxias Misteriosas',
    question: 'O que são as raras "Galáxias Ultraldifusas" (UDGs) como Dragonfly 44 descobertas recentemente?',
    options: [
      'Galáxias com tamanho comparável à Via Láctea, mas com apenas 1% das estrelas e dominadas quase por 99,9% de Matéria Escura',
      'Galáxias feitas exclusivamente de nuvens de gás hélio puro sem metalicidade',
      'Galáxias em fusão que perderam seu núcleo para um buraco negro errante',
      'Galáxias esféricas formadas inteiramente por anãs marrons frias'
    ],
    correct: 0,
    explanation: 'Dragonfly 44 tem a massa de uma galáxia gigante, mas é um "fantasma" quase sem luz estelar, segurado por uma montanha colossal de matéria escura.'
  },
  {
    id: 'd16',
    difficulty: 'Difícil',
    points: 300,
    category: 'Astrofísica de Altas Energias',
    question: 'O que é o "Mecanismo de Penrose" em torno de um buraco negro giratório?',
    options: [
      'Um método teórico para extrair até 29% da energia de massa de rotação de um buraco negro usando a ergosfera',
      'Uma reação nuclear de fusão de ferro em estrelas de bário',
      'Um filtro para transformar ondas de rádio em fótons gama',
      'Uma fórmula quântica para criar matéria através de gravitação zero'
    ],
    correct: 0,
    explanation: 'Roger Penrose provou que uma partícula partida dentro da ergosfera pode enviar uma parte com energia negativa para o buraco e ejetar a outra com mais energia do que a original!'
  },
  {
    id: 'd17',
    difficulty: 'Difícil',
    points: 300,
    category: 'Vazios Cósmicos',
    question: 'O que é o colossal "Vazio de Boötes" (The Great Nothing) descoberto no cosmos?',
    options: [
      'Uma gigantesca região esférica com 330 milhões de anos-luz de diâmetro quase desprovida de galáxias',
      'Um buraco negro primordial do tamanho do Sistema Solar',
      'Uma fenda no tecido do espaço-tempo que absorve neutrinos',
      'Uma zona de sombra cósmica onde telescópios não conseguem focalizar'
    ],
    correct: 0,
    explanation: 'Pela densidade normal do cosmos, o Vazio de Boötes deveria conter ~10.000 galáxias, mas astrônomos encontraram apenas cerca de 60 galáxias isoladas nele todo!'
  },
  {
    id: 'd18',
    difficulty: 'Difícil',
    points: 300,
    category: 'Radiação Quântica',
    question: 'Segundo a previsão de Stephen Hawking em 1974, por que todos os buracos negros no Universo irão eventualmente evaporar?',
    options: [
      'Devido à emissão quântica contínua de Radiação Hawking causada por pares de partículas virtuais no horizonte de eventos',
      'Porque a gravidade se cansa e dissipa energia após trilhões de anos',
      'Porque a matéria interna é expelida em jatos de matéria escura',
      'Porque a temperatura do espaço interestelar esfriará abaixo do ponto de fusão'
    ],
    correct: 0,
    explanation: 'Efeitos quânticos próximos ao horizonte fazem com que uma partícula caia e a outra escape como radiação térmica real, consumindo lentamente a massa do buraco negro até explodir.'
  }
];

/**
 * PATENTES E CLASSIFICAÇÃO DE RANKING CÓSMICO
 * Baseado no número de acertos da expedição (de 0 a 6 acertos)
 */
const RANKING_TIERS = [
  {
    minCorrect: 6,
    maxCorrect: 6,
    rank: 'S+',
    title: 'Astrofísica Suprema do Universo',
    badge: '✦ Rank S+ • Perfeição Cósmica ✦',
    badgeShort: 'Rank S+',
    icon: '👑',
    accentColor: 'text-amber-300',
    borderColor: 'border-amber-400/60',
    bgColor: 'bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-amber-500/20',
    glowColor: 'shadow-[0_0_30px_rgba(251,191,36,0.35)]',
    desc: 'Inacreditável! 6 de 6 acertos. Seu conhecimento das galáxias e do cosmos rivaliza com os maiores astrofísicos da história. Você domina desde a matéria escura até os quasares mais distantes!'
  },
  {
    minCorrect: 5,
    maxCorrect: 5,
    rank: 'S',
    title: 'Comandante da Frota Galáctica',
    badge: '★ Rank S • Excelência Estelar ★',
    badgeShort: 'Rank S',
    icon: '🚀',
    accentColor: 'text-celestial-gold',
    borderColor: 'border-celestial-gold/50',
    bgColor: 'bg-celestial-gold/15',
    glowColor: 'shadow-[0_0_20px_rgba(229,196,131,0.25)]',
    desc: 'Excelente expedição! 5 de 6 acertos. Você navega pelos confins do espaço profundo com precisão militar e conhecimento científico de elite.'
  },
  {
    minCorrect: 4,
    maxCorrect: 4,
    rank: 'A',
    title: 'Navegadora Interestelar Sênior',
    badge: '◆ Rank A • Navegação Avançada ◆',
    badgeShort: 'Rank A',
    icon: '🧭',
    accentColor: 'text-cyan-300',
    borderColor: 'border-cyan-400/40',
    bgColor: 'bg-cyan-500/15',
    glowColor: 'shadow-[0_0_15px_rgba(6,182,212,0.2)]',
    desc: 'Muito bom! 4 de 6 acertos. Você conhece as rotas entre os braços da Via Láctea e a física dos buracos negros com grande destreza.'
  },
  {
    minCorrect: 3,
    maxCorrect: 3,
    rank: 'B',
    title: 'Astrônoma Observadora de Campo',
    badge: '▲ Rank B • Observadora Dedicada ▲',
    badgeShort: 'Rank B',
    icon: '🔭',
    accentColor: 'text-emerald-300',
    borderColor: 'border-emerald-400/30',
    bgColor: 'bg-emerald-500/10',
    glowColor: 'shadow-none',
    desc: 'Bom desempenho! 3 acertos em 6. Seu telescópio já encontrou muitas maravilhas, mas os mistérios mais profundos do cosmos ainda aguardam sua exploração.'
  },
  {
    minCorrect: 1,
    maxCorrect: 2,
    rank: 'C',
    title: 'Cadete da Primeira Órbita',
    badge: '● Rank C • Aprendiz Estelar ●',
    badgeShort: 'Rank C',
    icon: '👩‍🚀',
    accentColor: 'text-indigo-300',
    borderColor: 'border-indigo-400/30',
    bgColor: 'bg-indigo-500/10',
    glowColor: 'shadow-none',
    desc: 'Início promissor! Você deu seus primeiros passos para fora da atmosfera terrestre. Estude mais sobre as galáxias e tente uma nova missão!'
  },
  {
    minCorrect: 0,
    maxCorrect: 0,
    rank: 'D',
    title: 'Viajante do Vácuo Interestelar',
    badge: '○ Rank D • Recalibrando Sensores ○',
    badgeShort: 'Rank D',
    icon: '🛰️',
    accentColor: 'text-gray-400',
    borderColor: 'border-white/10',
    bgColor: 'bg-white/[0.03]',
    glowColor: 'shadow-none',
    desc: 'Seus sensores sofreram interferência de radiação cósmica! Não desanime: recarregue os motores e tente uma nova missão para desbravar o cosmos.'
  }
];

function getRankingTier(correctCount) {
  return (
    RANKING_TIERS.find(t => correctCount >= t.minCorrect && correctCount <= t.maxCorrect) ||
    RANKING_TIERS[RANKING_TIERS.length - 1]
  );
}

// Sorteador equilibrado: 2 fáceis, 2 médias, 2 difíceis por rodada
function pickBalancedRound() {
  const shuffle = arr => [...arr].sort(() => 0.5 - Math.random());
  const fac = shuffle(GALAXY_QUESTIONS.filter(q => q.difficulty === 'Fácil')).slice(0, 2);
  const med = shuffle(GALAXY_QUESTIONS.filter(q => q.difficulty === 'Médio')).slice(0, 2);
  const dif = shuffle(GALAXY_QUESTIONS.filter(q => q.difficulty === 'Difícil')).slice(0, 2);
  return [...fac, ...med, ...dif];
}

export default function CosmicMissions() {
  const [questions, setQuestions] = useState(() => pickBalancedRound());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('universo_isabela_quiz_high') || '0', 10);
    } catch {
      return 0;
    }
  });

  const currentQ = questions[currentIndex] || questions[0];

  // Sincroniza recorde histórico
  useEffect(() => {
    if (completed && score > highScore) {
      setHighScore(score);
      try {
        localStorage.setItem('universo_isabela_quiz_high', score.toString());
      } catch (err) {
        console.error(err);
      }
    }
  }, [completed, score, highScore]);

  const handleSelectOption = (idx) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);

    const isCorrect = idx === currentQ.correct;
    if (isCorrect) {
      const qPoints = currentQ.points || 100;
      const streakBonus = streak * 50;
      setScore(prev => prev + qPoints + streakBonus);
      setCorrectAnswers(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setQuestions(pickBalancedRound());
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setCorrectAnswers(0);
    setStreak(0);
    setCompleted(false);
  };

  const currentTier = useMemo(() => getRankingTier(correctAnswers), [correctAnswers]);

  return (
    <div className="w-full rounded-3xl bg-midnight-900/80 border border-white/10 backdrop-blur-2xl p-4 sm:p-7 md:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden flex flex-col items-center">
      {/* Luz ambiente dourada de fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20 bg-celestial-gold" />

      {/* ── BARRA DE STATUS DO QUIZ ── */}
      <div className="w-full flex items-center justify-between border-b border-white/10 pb-4 mb-6 text-xs font-mono">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full bg-celestial-gold/15 text-celestial-gold border border-celestial-gold/30 font-semibold">
            {completed ? '✦ Concluído' : `Pergunta ${currentIndex + 1} de ${questions.length}`}
          </span>

          {!completed && currentQ && (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase border ${
              currentQ.difficulty === 'Fácil'
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                : currentQ.difficulty === 'Médio'
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
            }`}>
              {currentQ.difficulty} (+{currentQ.points} pts)
            </span>
          )}

          <span className="text-gray-400 hidden md:inline">
            • {currentQ?.category}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {streak > 1 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold animate-pulse flex items-center gap-1">
              <Flame size={12} className="text-amber-400" />
              {streak}x Combo
            </span>
          )}
          <span className="flex items-center gap-1.5 text-celestial-gold font-semibold">
            <Trophy size={15} />
            <span>{score} pts</span>
          </span>
        </div>
      </div>

      {/* ── TELA DE RESULTADOS FINAL COM RANKING E PATENTES ── */}
      {completed ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-2xl flex flex-col items-center text-center py-2 sm:py-4 gap-6"
        >
          {/* Distintivo de Destaque da Patente Conquistada */}
          <div className="flex flex-col items-center">
            <div className={`w-20 h-20 rounded-3xl border flex items-center justify-center text-3xl mb-3 relative ${currentTier.bgColor} ${currentTier.borderColor} ${currentTier.glowColor}`}>
              <span>{currentTier.icon}</span>
              <span className="absolute -bottom-2.5 px-2.5 py-0.5 rounded-full bg-midnight-950 border border-white/20 text-[10px] font-mono font-bold uppercase tracking-wider text-celestial-gold">
                {currentTier.rank}
              </span>
            </div>

            <span className="text-[11px] uppercase tracking-[0.3em] text-celestial-gold font-mono font-semibold">
              {currentTier.badge}
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
              {currentTier.title}
            </h3>

            {/* Painel com Métricas de Pontuação e Acertos */}
            <div className="mt-4 flex items-center gap-3 sm:gap-6 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 font-mono text-xs">
              <div className="flex flex-col">
                <span className="text-gray-400 text-[10px]">Acertos</span>
                <span className="text-white font-bold text-sm sm:text-base text-emerald-400">
                  {correctAnswers} / {questions.length} ({Math.round((correctAnswers / questions.length) * 100)}%)
                </span>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-gray-400 text-[10px]">Pontuação Rodada</span>
                <span className="text-celestial-gold font-bold text-sm sm:text-base">
                  {score} pts
                </span>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-gray-400 text-[10px]">Recorde Pessoal</span>
                <span className="text-amber-300 font-bold text-sm sm:text-base">
                  {highScore} pts
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-lg mt-3">
              {currentTier.desc}
            </p>
          </div>

          {/* ── QUADRO DE PATENTES CÓSMICAS (LEADERBOARD LADDER) ── */}
          <div className="w-full bg-midnight-950/90 rounded-2xl border border-white/10 p-4 sm:p-5 flex flex-col text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Crown size={17} className="text-celestial-gold" />
                <h4 className="font-serif text-sm sm:text-base text-white font-medium">
                  Quadro de Patentes do Universo
                </h4>
              </div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                6 Níveis de Astrofísica
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {RANKING_TIERS.map((tier) => {
                const isUserTier = tier.rank === currentTier.rank;
                return (
                  <div
                    key={tier.rank}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs ${
                      isUserTier
                        ? `${tier.bgColor} ${tier.borderColor} ring-2 ring-celestial-gold/50 shadow-md font-medium`
                        : 'bg-white/[0.02] border-white/5 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg w-6 text-center">{tier.icon}</span>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono font-bold text-xs ${tier.accentColor}`}>
                            {tier.badgeShort}
                          </span>
                          <span className="text-white font-sans text-xs">
                            {tier.title}
                          </span>
                          {isUserTier && (
                            <span className="px-2 py-0.5 rounded-full bg-celestial-gold text-midnight-950 font-mono text-[9px] font-bold uppercase tracking-wider">
                              Sua Patente
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400 font-light hidden sm:inline">
                          Exige {tier.minCorrect === tier.maxCorrect ? `${tier.minCorrect} acertos` : `${tier.minCorrect} a ${tier.maxCorrect} acertos`}
                        </span>
                      </div>
                    </div>

                    <span className="font-mono text-[11px] text-gray-300 shrink-0">
                      {tier.minCorrect === 6 ? '6/6 (100%)' : tier.minCorrect === 5 ? '5/6' : tier.minCorrect === 4 ? '4/6' : tier.minCorrect === 3 ? '3/6' : tier.minCorrect > 0 ? '1-2/6' : '0/6'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Botão de Jogar Novamente com Novas Perguntas */}
          <button
            onClick={handleRestart}
            className="px-7 py-3.5 rounded-full bg-celestial-gold text-midnight-950 font-mono text-xs uppercase tracking-wider font-semibold shadow-[0_0_25px_rgba(229,196,131,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <RotateCcw size={16} />
            <span>Tentar Novamente (Sortear 6 Novas Perguntas)</span>
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
            {/* Categoria e Dificuldade em Destaque */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-celestial-gold">
                ✦ {currentQ.category}
              </span>
            </div>

            {/* Enunciado da Pergunta */}
            <h3 className="font-serif text-lg sm:text-2xl text-white text-center mb-6 leading-snug">
              {currentQ.question}
            </h3>

            {/* Alternativas de Resposta */}
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

            {/* Explicação Científica & Botão Próxima */}
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
                  <span>{currentIndex + 1 < questions.length ? 'Próxima Pergunta' : 'Ver Minha Patente e Ranking'}</span>
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
