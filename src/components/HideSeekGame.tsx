import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface HideSeekGameProps {
  onBack: () => void;
}

const hiddenItems = [
  { name: "Pookalam", emoji: "🌸", found: false },
  { name: "Coconut", emoji: "🥥", found: false },
  { name: "Banana", emoji: "🍌", found: false },
  { name: "Lamp", emoji: "🪔", found: false },
  { name: "Boat", emoji: "⛵", found: false },
  { name: "Elephant", emoji: "🐘", found: false },
];

const HideSeekGame = ({ onBack }: HideSeekGameProps) => {
  const [items, setItems] = useState([...hiddenItems]);
  const [gameGrid, setGameGrid] = useState<(string | null)[][]>([]);
  const [foundCount, setFoundCount] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize game grid
  useEffect(() => {
    const grid = Array(6).fill(null).map(() => Array(6).fill(null));
    const availablePositions: [number, number][] = [];
    
    // Create list of all positions
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        availablePositions.push([i, j]);
      }
    }
    
    // Randomly place items
    hiddenItems.forEach((item) => {
      if (availablePositions.length > 0) {
        const randomIndex = Math.floor(Math.random() * availablePositions.length);
        const [row, col] = availablePositions[randomIndex];
        grid[row][col] = item.emoji;
        availablePositions.splice(randomIndex, 1);
      }
    });
    
    setGameGrid(grid);
  }, []);

  // Timer
  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameCompleted(true);
    }
  }, [gameStarted, timeLeft, gameCompleted]);

  const handleCellClick = (row: number, col: number) => {
    if (!gameStarted || gameCompleted) return;
    
    const cellContent = gameGrid[row][col];
    if (cellContent) {
      // Found an item!
      const updatedItems = items.map(item => 
        item.emoji === cellContent ? { ...item, found: true } : item
      );
      setItems(updatedItems);
      
      const newFoundCount = foundCount + 1;
      setFoundCount(newFoundCount);
      
      // Remove item from grid
      const newGrid = gameGrid.map(gridRow => [...gridRow]);
      newGrid[row][col] = "found";
      setGameGrid(newGrid);
      
      if (newFoundCount === hiddenItems.length) {
        setGameCompleted(true);
      }
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setItems([...hiddenItems]);
    setFoundCount(0);
    setGameCompleted(false);
    setTimeLeft(60);
    setGameStarted(false);
    
    // Reinitialize grid
    const grid = Array(6).fill(null).map(() => Array(6).fill(null));
    const availablePositions: [number, number][] = [];
    
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        availablePositions.push([i, j]);
      }
    }
    
    hiddenItems.forEach((item) => {
      if (availablePositions.length > 0) {
        const randomIndex = Math.floor(Math.random() * availablePositions.length);
        const [row, col] = availablePositions[randomIndex];
        grid[row][col] = item.emoji;
        availablePositions.splice(randomIndex, 1);
      }
    });
    
    setGameGrid(grid);
  };

  if (gameCompleted) {
    const allFound = foundCount === hiddenItems.length;
    return (
      <div className="min-h-screen flex items-center justify-center p-4 onam-pattern">
        <div className="festival-card p-8 text-center max-w-md">
          <div className="text-6xl mb-4">
            {allFound ? "🎉" : "⏰"}
          </div>
          <h2 className="text-3xl font-bold gradient-text mb-4">
            {allFound ? "Amazing!" : "Time's Up!"}
          </h2>
          <p className="text-lg mb-4">
            You found {foundCount} out of {hiddenItems.length} items!
          </p>
          {allFound && (
            <p className="text-muted-foreground mb-6">
              You found all the Onam treasures! 🌺
            </p>
          )}
          <div className="space-y-3">
            <Button variant="festival" onClick={resetGame} className="w-full">
              Play Again
            </Button>
            <Button variant="outline" onClick={onBack} className="w-full">
              Back to Games
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 onam-pattern">
      <div className="festival-card p-8 max-w-4xl w-full">
        <div className="text-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            ← Back to Games
          </Button>
          <h2 className="text-3xl font-bold gradient-text mb-2">
            Find the Onam Treasures
          </h2>
          <p className="text-muted-foreground">
            Click on the grid to find hidden festival items!
          </p>
        </div>

        {!gameStarted ? (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-lg">
              Find all 6 hidden Onam items before time runs out!
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {hiddenItems.map((item, index) => (
                <div key={index} className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl">{item.emoji}</div>
                  <div className="text-sm">{item.name}</div>
                </div>
              ))}
            </div>
            <Button variant="festival" onClick={startGame} size="lg">
              Start Game (60 seconds)
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">
                Found: {foundCount}/{hiddenItems.length}
              </div>
              <div className="text-lg font-semibold text-secondary">
                Time: {timeLeft}s
              </div>
            </div>

            <div className="grid grid-cols-6 gap-2 max-w-md mx-auto">
              {gameGrid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className={`
                      aspect-square border-2 rounded-lg text-2xl font-bold transition-all duration-200
                      ${cell === "found" 
                        ? "bg-accent text-accent-foreground border-accent" 
                        : "bg-muted hover:bg-muted/80 border-border hover:border-primary"
                      }
                    `}
                  >
                    {cell === "found" ? "✓" : "?"}
                  </button>
                ))
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`text-center p-2 rounded-lg transition-all ${
                    item.found 
                      ? "bg-accent text-accent-foreground" 
                      : "bg-muted opacity-50"
                  }`}
                >
                  <div className="text-lg">{item.emoji}</div>
                  <div className="text-xs">{item.name}</div>
                  {item.found && <div className="text-xs">✓</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HideSeekGame;