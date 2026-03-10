import { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150;

export const useSnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    setFood(newFood);
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setIsPaused(false);
    generateFood();
  }, [generateFood]);

  const changeDirection = useCallback((newDir) => {
    setDirection(prev => {
      if (prev.x + newDir.x === 0 && prev.y + newDir.y === 0) return prev;
      return newDir;
    });
  }, []);

  useEffect(() => {
    if (!isPlaying || isPaused || gameOver) return;

    const gameLoop = setInterval(() => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        const newHead = { x: head.x + direction.x, y: head.y + direction.y };

        if (newHead.x < 0 || newHead.x >= GRID_SIZE || 
            newHead.y < 0 || newHead.y >= GRID_SIZE ||
            prevSnake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          generateFood();
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, GAME_SPEED);

    return () => clearInterval(gameLoop);
  }, [direction, food, isPlaying, isPaused, gameOver, generateFood]);

  return {
    snake,
    food,
    score,
    gameOver,
    isPlaying,
    isPaused,
    resetGame,
    changeDirection,
    setIsPaused,
    GRID_SIZE
  };
};
