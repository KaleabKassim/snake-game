import { useEffect, useState } from 'react';
import { useSnakeGame } from './hooks/useSnakeGame';

function App() {
  const { snake, food, score, gameOver, isPlaying, isPaused, resetGame, changeDirection, setIsPaused, GRID_SIZE } = useSnakeGame();
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('snakeHighScore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  }, [score, highScore]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isPlaying || isPaused) return;
      
      switch(e.key) {
        case 'ArrowUp': changeDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': changeDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': changeDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': changeDirection({ x: 1, y: 0 }); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, isPaused, changeDirection]);

  const cellSize = 20;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex flex-col items-center justify-center p-4">
      <div className="mb-4 flex gap-8 text-white text-xl">
        <div>Score: {score}</div>
        <div>High Score: {highScore}</div>
      </div>

      <div className="relative bg-gray-900 rounded-lg shadow-2xl" style={{ width: GRID_SIZE * cellSize, height: GRID_SIZE * cellSize }}>
        {snake.map((seg, i) => (
          <div
            key={i}
            className="absolute bg-green-400 rounded-sm"
            style={{
              left: seg.x * cellSize,
              top: seg.y * cellSize,
              width: cellSize - 2,
              height: cellSize - 2
            }}
          />
        ))}
        <div
          className="absolute bg-red-500 rounded-full"
          style={{
            left: food.x * cellSize,
            top: food.y * cellSize,
            width: cellSize - 2,
            height: cellSize - 2
          }}
        />

        {!isPlaying && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-white text-3xl mb-4">{gameOver ? 'Game Over!' : 'Snake Game'}</h2>
              <button
                onClick={resetGame}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg text-xl"
              >
                {gameOver ? 'Play Again' : 'Start Game'}
              </button>
            </div>
          </div>
        )}
      </div>

      {isPlaying && (
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      )}

      <div className="mt-6 grid grid-cols-3 gap-2 md:hidden">
        <div></div>
        <button
          onClick={() => changeDirection({ x: 0, y: -1 })}
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg text-2xl"
        >
          ↑
        </button>
        <div></div>
        <button
          onClick={() => changeDirection({ x: -1, y: 0 })}
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg text-2xl"
        >
          ←
        </button>
        <button
          onClick={() => changeDirection({ x: 0, y: 1 })}
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg text-2xl"
        >
          ↓
        </button>
        <button
          onClick={() => changeDirection({ x: 1, y: 0 })}
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg text-2xl"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default App;
