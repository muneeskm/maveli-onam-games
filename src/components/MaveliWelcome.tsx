import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import maveliImage from "@/assets/maveli-character.jpg";
import pookalamImage from "@/assets/pookalam-design.jpg";
import vallamKaliImage from "@/assets/vallam-kali.jpg";

interface MaveliWelcomeProps {
  onGameSelect: (game: string) => void;
}

const MaveliWelcome = ({ onGameSelect }: MaveliWelcomeProps) => {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [showIntro, setShowIntro] = useState(false);

  // Demo content for each game
  const gameDemos = [
    {
      title: "Word Puzzle Challenge",
      description: "Test your Onam knowledge with interactive riddles!",
      preview: "🧩 POOK___ → POOKALAM ✓",
      bgClass: "pookalam-pattern",
      action: () => onGameSelect('word-puzzle')
    },
    {
      title: "Maveli's Epic Story",
      description: "Experience the legendary tale of King Mahabali!",
      preview: "📚 Choose your path through history...",
      bgClass: "vallam-wave",
      action: () => onGameSelect('story')
    },
    {
      title: "Festival Treasure Hunt",
      description: "Find hidden Onam treasures in an exciting time challenge!",
      preview: "🔍 ? ? ? → 🌸 🥥 🪔 Found!",
      bgClass: "onam-pattern",
      action: () => onGameSelect('hide-seek')
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-cycle through game demos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % gameDemos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-warm pookalam-pattern">
      {/* Hero Header */}
      <div className="text-center pt-8 pb-6">
        {showIntro && (
          <div className="fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-4">
              🌺 Onam Festival Games 🌺
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto px-4">
              Dive into Kerala's most beloved festival with interactive games, stories, and traditions!
            </p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Maveli & Festival Images */}
          <div className="text-center lg:text-left space-y-6">
            <div className="relative">
              <div className="float-animation">
                <img 
                  src={maveliImage} 
                  alt="King Mahabali - Maveli" 
                  className="w-48 h-60 mx-auto lg:mx-0 rounded-2xl shadow-2xl golden-glow object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full overflow-hidden border-4 border-primary pulse-glow">
                <img 
                  src={pookalamImage} 
                  alt="Pookalam Design" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="festival-card p-6 text-center lg:text-left">
              <h2 className="text-2xl font-bold text-secondary mb-3">
                "Welcome to my realm! Let's celebrate Onam together!"
              </h2>
              <p className="text-muted-foreground">
                Join King Mahabali in exploring Kerala's rich traditions through fun, interactive experiences.
              </p>
            </div>

            {/* Traditional Elements Showcase */}
            <div className="grid grid-cols-2 gap-4">
              <div className="festival-card p-4 text-center">
                <div className="text-3xl mb-2">🌸</div>
                <h3 className="font-semibold text-sm">Pookalam</h3>
                <p className="text-xs text-muted-foreground">Flower Carpets</p>
              </div>
              <div className="festival-card p-4 text-center vallam-wave">
                <div className="text-3xl mb-2">⛵</div>
                <h3 className="font-semibold text-sm">Vallam Kali</h3>
                <p className="text-xs text-muted-foreground">Boat Races</p>
              </div>
            </div>
          </div>

          {/* Right Side - Interactive Game Previews */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 gradient-text">
                Choose Your Adventure
              </h2>
              <p className="text-muted-foreground mb-6">
                Three exciting ways to experience Onam traditions
              </p>
            </div>

            {/* Interactive Game Cards */}
            <div className="space-y-4">
              {gameDemos.map((game, index) => (
                <div
                  key={index}
                  className={`game-preview-card ${game.bgClass} ${
                    currentDemo === index ? 'pulse-glow' : ''
                  }`}
                  onClick={game.action}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">
                      {index === 0 && '🧩'}
                      {index === 1 && '📚'}
                      {index === 2 && '🔍'}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{game.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{game.description}</p>
                      <div className="interactive-preview p-3 rounded">
                        <code className="text-sm font-mono text-primary">
                          {game.preview}
                        </code>
                      </div>
                    </div>
                    <div className="text-2xl opacity-60">→</div>
                  </div>
                  
                  {currentDemo === index && (
                    <div className="mt-4 vallam-wave h-1 rounded"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center space-y-4">
              <Button 
                variant="festival" 
                size="lg" 
                onClick={() => onGameSelect('word-puzzle')}
                className="w-full text-lg py-6"
              >
                🚀 Start Your Onam Journey! 🚀
              </Button>
              <p className="text-sm text-muted-foreground">
                Click any game above or start with the word puzzle challenge!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="text-center py-6">
        <div className="flex justify-center items-center space-x-6 text-2xl opacity-60">
          <span className="float-animation">🌺</span>
          <span className="float-animation" style={{animationDelay: '0.5s'}}>🥥</span>
          <span className="float-animation" style={{animationDelay: '1s'}}>🪔</span>
          <span className="float-animation" style={{animationDelay: '1.5s'}}>🍌</span>
          <span className="float-animation" style={{animationDelay: '2s'}}>⛵</span>
        </div>
      </div>
    </div>
  );
};

export default MaveliWelcome;