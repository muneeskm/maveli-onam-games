import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WordPuzzleGameProps {
  onBack: () => void;
}

const onamPuzzles = [
  {
    clue: "Traditional boat race during Onam",
    answer: "VALLAM KALI",
    hint: "Two words: ___ KALI"
  },
  {
    clue: "Flower carpet made during Onam",
    answer: "POOKALAM",
    hint: "POOK___"
  },
  {
    clue: "Traditional feast served on banana leaf",
    answer: "SADHYA",
    hint: "SAD___"
  },
  {
    clue: "The righteous king who returns during Onam",
    answer: "MAHABALI",
    hint: "MAHA____"
  },
  {
    clue: "Traditional dance of Kerala",
    answer: "KATHAKALI",
    hint: "KATHA____"
  }
];

const WordPuzzleGame = ({ onBack }: WordPuzzleGameProps) => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [maveliHelp, setMaveliHelp] = useState(false);
  const [maveliResponses] = useState([
    "My dear friend, the answer is '{answer}' - the spectacular boat races that fill our hearts with joy! 🛶",
    "Ah, you seek wisdom! The answer is '{answer}' - the beautiful flower carpets we create to welcome prosperity! 🌸",
    "Allow me to enlighten you - '{answer}' is our grand feast, served with love on banana leaves! 🍽️",
    "My child, the answer is '{answer}' - that's me, your beloved king who returns each year! 👑",
    "The answer lies in '{answer}' - the mesmerizing dance that tells tales of gods and demons! 💃"
  ]);

  const checkAnswer = () => {
    const correct = userAnswer.toUpperCase().trim() === onamPuzzles[currentPuzzle].answer;
    
    if (correct) {
      setFeedback("🎉 Correct! Well done!");
      setScore(score + 1);
      
      setTimeout(() => {
        if (currentPuzzle < onamPuzzles.length - 1) {
          setCurrentPuzzle(currentPuzzle + 1);
          setUserAnswer("");
          setShowHint(false);
          setMaveliHelp(false);
          setFeedback("");
        } else {
          setGameCompleted(true);
        }
      }, 1500);
    } else {
      setFeedback("❌ Try again! Think about Kerala traditions...");
    }
  };

  const askMaveli = () => {
    const answer = onamPuzzles[currentPuzzle].answer;
    const response = maveliResponses[currentPuzzle].replace('{answer}', answer);
    setMaveliHelp(true);
    setFeedback(`👑 King Maveli says: "${response}"`);
    setUserAnswer(answer);
    
    setTimeout(() => {
      if (currentPuzzle < onamPuzzles.length - 1) {
        setCurrentPuzzle(currentPuzzle + 1);
        setUserAnswer("");
        setShowHint(false);
        setMaveliHelp(false);
        setFeedback("");
      } else {
        setGameCompleted(true);
      }
    }, 3000);
  };

  const resetGame = () => {
    setCurrentPuzzle(0);
    setUserAnswer("");
    setShowHint(false);
    setMaveliHelp(false);
    setFeedback("");
    setScore(0);
    setGameCompleted(false);
  };

  if (gameCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 onam-pattern">
        <div className="festival-card p-8 text-center max-w-md">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold gradient-text mb-4">
            Congratulations!
          </h2>
          <p className="text-lg mb-4">
            You scored {score} out of {onamPuzzles.length}!
          </p>
          <p className="text-muted-foreground mb-6">
            You know your Onam traditions well! 🌺
          </p>
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
      <div className="festival-card p-8 max-w-lg w-full">
        <div className="text-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            ← Back to Games
          </Button>
          <h2 className="text-3xl font-bold gradient-text mb-2">
            Onam Word Puzzle
          </h2>
          <p className="text-muted-foreground">
            Puzzle {currentPuzzle + 1} of {onamPuzzles.length} | Score: {score}
          </p>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🧩</div>
            <h3 className="text-xl font-semibold mb-4">
              {onamPuzzles[currentPuzzle].clue}
            </h3>
          </div>

          <div className="space-y-4">
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="text-center text-lg"
              onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button variant="festival" onClick={checkAnswer} className="w-full">
                Submit Answer
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowHint(!showHint)}
                className="w-full"
              >
                {showHint ? "Hide Hint" : "Show Hint"}
              </Button>
              <Button 
                variant="golden" 
                onClick={askMaveli}
                className="w-full"
                disabled={maveliHelp}
              >
                👑 Ask Maveli
              </Button>
            </div>

            {showHint && (
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="font-medium">Hint: {onamPuzzles[currentPuzzle].hint}</p>
              </div>
            )}

            {feedback && (
              <div className={`p-4 rounded-lg text-center font-medium ${
                feedback.includes("Correct") 
                  ? "bg-accent text-accent-foreground" 
                  : feedback.includes("King Maveli")
                  ? "bg-gradient-festival text-white border-2 border-primary"
                  : "bg-secondary/20 text-secondary"
              }`}>
                {feedback}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordPuzzleGame;