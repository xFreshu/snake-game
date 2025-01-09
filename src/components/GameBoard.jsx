import { useState, useEffect } from "react";
import Snake from "./Snake";
import Food from "./Food";
import "../styles/GameBoard.css";

function GameBoard() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Audio element for eating sound
  const applePickSound = new Audio("/public/AppleSound.mp3");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isRunning) return;

      switch (event.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction, isRunning]);

  useEffect(() => {
    const moveSnake = () => {
      if (gameOver || !isRunning) return;

      const newSnake = [...snake];
      const head = newSnake[newSnake.length - 1];

      let newHead;
      switch (direction) {
        case "UP":
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case "DOWN":
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case "LEFT":
          newHead = { x: head.x - 1, y: head.y };
          break;
        case "RIGHT":
          newHead = { x: head.x + 1, y: head.y };
          break;
        default:
          return;
      }

      // Check collision with walls
      if (
        newHead.x < 0 ||
        newHead.y < 0 ||
        newHead.x >= 21 ||
        newHead.y >= 21
      ) {
        setGameOver(true);
        setIsRunning(false);
        return;
      }

      // Check collision with itself
      if (
        newSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y,
        )
      ) {
        setGameOver(true);
        setIsRunning(false);
        return;
      }

      newSnake.push(newHead);

      // Remove the tail if no food is eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * 21),
          y: Math.floor(Math.random() * 21),
        });
        setScore((prev) => prev + 1);
        applePickSound.play(); // Play sound when food is eaten
      } else {
        newSnake.shift();
      }

      setSnake(newSnake);
    };

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [snake, direction, food, gameOver, isRunning]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection("RIGHT");
    setGameOver(false);
    setScore(0);
    setIsRunning(true);
  };

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection("RIGHT");
    setGameOver(false);
    setScore(0);
    setIsRunning(false);
  };

  return (
    <div className="game-board-wrapper">
      <div className="controls">
        <button onClick={startGame} disabled={isRunning}>
          Start
        </button>
        <button onClick={resetGame}>Reset</button>
        <span>Score: {score}</span>
      </div>
      <div className="game-board" tabIndex="0">
        {gameOver ? (
          <div className="game-over">Game Over!</div>
        ) : (
          <>
            <Snake segments={snake} />
            <Food position={food} />
          </>
        )}
      </div>
    </div>
  );
}

export default GameBoard;
