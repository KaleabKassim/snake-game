# 🐍 Snake Game

A classic Snake game built with React, Tailwind CSS, and Vite. Installable as a PWA on desktop and mobile.

## Features

- Classic snake gameplay on a 20x20 grid
- Start screen overlay and Game Over screen
- Pause / Resume button
- High score tracker saved with localStorage
- Mobile-friendly on-screen D-pad controls
- Keyboard arrow key support
- PWA support — installable on desktop and mobile

## Tech Stack

- React 18
- Tailwind CSS
- Vite
- vite-plugin-pwa

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
git clone https://github.com/KaleabKassim/snake-game.git
cd snake-game
npm install
```

### Run Locally

```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
```

## How to Play

- Press "Start Game" to begin
- Use arrow keys (desktop) or the D-pad buttons (mobile) to control the snake
- Eat the red food to grow and earn points (+10 per food)
- Avoid hitting the walls or yourself
- Press "Pause" to pause the game

## Project Structure

```
src/
├── hooks/
│   └── useSnakeGame.js   # Game logic (custom hook)
├── App.jsx               # UI and rendering
├── main.jsx              # Entry point
└── index.css             # Tailwind imports
```

## License

MIT
