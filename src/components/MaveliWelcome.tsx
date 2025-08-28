import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import maveliImage from "@/assets/maveli-character.jpg";

interface MaveliWelcomeProps {
  onGameSelect: (game: string) => void;
}

const MaveliWelcome = ({ onGameSelect }: MaveliWelcomeProps) => {
  const [showGreeting, setShowGreeting] = useState(false);
  const [showGames, setShowGames] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowGreeting(true), 500);
    const timer2 = setTimeout(() => setShowGames(true), 2000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 onam-pattern">
      <div className="text-center max-w-4xl mx-auto">
        {/* Maveli Character */}
        <div className="mb-8 bounce-gentle">
          <img 
            src={maveliImage} 
            alt="King Mahabali - Maveli" 
            className="w-48 h-60 mx-auto rounded-2xl shadow-2xl golden-glow object-cover"
          />
        </div>

        {/* Greeting */}
        {showGreeting && (
          <div className="fade-in-up mb-8">
            <h1 className="text-6xl font-bold mb-4 gradient-text">
              Welcome to Onam!
            </h1>
            <div className="festival-card p-6 mb-6">
              <p className="text-2xl font-semibold text-secondary mb-2">
                "I am Maveli, let's make this Onam exciting..."
              </p>
              <p className="text-lg text-muted-foreground">
                Choose your festive adventure and celebrate the spirit of Kerala!
              </p>
            </div>
          </div>
        )}

        {/* Game Selection */}
        {showGames && (
          <div className="fade-in-up grid md:grid-cols-3 gap-6 mt-8">
            <Button
              variant="game"
              size="lg"
              onClick={() => onGameSelect('word-puzzle')}
              className="h-32 flex-col space-y-2 text-lg"
            >
              <div className="text-3xl">🧩</div>
              <div>Word Puzzle</div>
              <div className="text-sm text-muted-foreground">
                Solve Onam riddles
              </div>
            </Button>

            <Button
              variant="game"
              size="lg"
              onClick={() => onGameSelect('story')}
              className="h-32 flex-col space-y-2 text-lg"
            >
              <div className="text-3xl">📚</div>
              <div>Maveli's Story</div>
              <div className="text-sm text-muted-foreground">
                Interactive journey
              </div>
            </Button>

            <Button
              variant="game"
              size="lg"
              onClick={() => onGameSelect('hide-seek')}
              className="h-32 flex-col space-y-2 text-lg"
            >
              <div className="text-3xl">🔍</div>
              <div>Hide & Seek</div>
              <div className="text-sm text-muted-foreground">
                Find festival items
              </div>
            </Button>
          </div>
        )}

        {showGames && (
          <div className="mt-8 fade-in-up">
            <p className="text-sm text-muted-foreground">
              🌺 Happy Onam! May this festival bring prosperity and joy 🌺
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaveliWelcome;