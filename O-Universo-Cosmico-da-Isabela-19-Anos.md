# 🌌 Aniversário da Bela — O Universo Cósmico de 19 Anos 🎂

> **Arquivo de Backup Completo Salvo em:**  
> `Universo-Cosmico-Isabela-19-Anos.zip` (16.85 MB)

---

## 🌟 Sobre Este Projeto

Este projeto é um **universo digital imersivo e de luxo** criado especialmente para o aniversário de **19 anos da Isabela Marty** (14 de Setembro de 2007).

Ele combina astronomia real com todas as suas paixões:
- **A Lua**: O astro favorito da Bela, calculado matematicamente em tempo real tanto para a noite de seu nascimento quanto para o dia de hoje.
- **Marte & Marty**: A conexão com o latim *Martis*, planeta da determinação inabalável, da garra e do sucesso no Comércio Exterior.
- **Cratera Isabella em Vênus**: A segunda maior cratera de impacto de todo o planeta Vênus (175 km de diâmetro), catalogada oficialmente pela NASA com o nome dela.
- **Constelação de Virgem**: Mapa estelar puro de 14 de Setembro de 2007 com Spica, Porrima e coordenadas celestes reais.
- **Sistema Solar em 3D Real (Three.js WebGL)**: O Sol e todos os 8 planetas em órbita rigorosa com rotação em 360°, fotorrealismo esférico e anéis 3D de Saturno.
- **Calculadora Cósmica**: Simulador que calcula a idade da Bela e a altura de seus saltos sob a gravidade de cada planeta.
- **Carta de Galáxia**: Um pergaminho cósmico selado a cera, com nebulosas e lançador interativo de desejos para as estrelas.
- **Trilha Sonora**: The Weeknd (*The Hills*).

---

## 📦 Conteúdo do Pacote ZIP (`Universo-Cosmico-Isabela-19-Anos.zip`)

```
museu-aniversario/
├── public/
│   ├── planetas/
│   │   ├── 3d/                  ← Texturas esféricas 3D da NASA (Sol + 8 Planetas + Lua + Anéis)
│   │   │   ├── sol.jpg
│   │   │   ├── mercurio.jpg
│   │   │   ├── venus.jpg
│   │   │   ├── terra.jpg
│   │   │   ├── lua.jpg
│   │   │   ├── marte.jpg
│   │   │   ├── jupiter.jpg
│   │   │   ├── saturno.jpg
│   │   │   ├── saturno_anel.jpg
│   │   │   ├── urano.jpg
│   │   │   └── netuno.jpg
│   │   └── orbs/                ← Miniaturas renderizadas em alta definição
│   ├── fotos/                   ← Pasta para fotos da Bela (lua1.jpg, etc.)
│   ├── moon_2007.jpg            ← Astrofotografia da Lua de 14/09/2007
│   └── moon_full.jpg            ← Astrofotografia da Lua Cheia
├── src/
│   ├── components/
│   │   ├── SolarSystemMap.jsx        ← Mapa orbital interativo
│   │   ├── PlanetOrb.jsx             ← Orbes esféricos fotorrealistas
│   │   ├── PlanetViewer3D.jsx        ← Globo 3D Three.js com 360° (Sol e Planetas)
│   │   ├── PlanetCuriositiesModal.jsx← Observatório com dados da NASA e conexões
│   │   ├── CosmicAgeCalculator.jsx   ← Calculadora de idade e gravidade da Bela
│   │   ├── MoonPhase.jsx             ← Calculador de fase lunar da NASA em tempo real
│   │   ├── VirgoConstellation.jsx    ← Mapa da constelação de Virgem
│   │   ├── MoonGallery.jsx           ← Galeria lunar com lightbox
│   │   ├── ClosingMessage.jsx        ← Carta personalizada de galáxia
│   │   ├── FloatingParticles.jsx     ← Céu da Via Láctea com meteoros
│   │   ├── Header.jsx                ← Navegação com feixe de scroll
│   │   ├── HeroSection.jsx           ← Abertura cinematográfica
│   │   ├── MusicPlayer.jsx           ← Player de The Weeknd
│   │   └── CountdownScreen.jsx       ← Tela de bloqueio e contagem regressiva
│   ├── data/
│   │   └── planetsData.js            ← Dados astronômicos e curiosidades
│   ├── App.jsx                       ← Orquestrador principal
│   ├── config.js                     ← Configurações e textos editáveis
│   ├── index.css                     ← Estilos globais
│   └── main.jsx                      ← Entrada React
├── dist/                             ← Build de produção compilado e otimizado
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## 🚀 Como Executar Novamente no Futuro

Se um dia você extrair este arquivo em outro computador:

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor local
npm run dev
```

O site abrirá em `http://localhost:5173/`.

---

✨ *Feito com amor e admiração para a Isabela Marty no seu aniversário de 19 anos.* ✨

