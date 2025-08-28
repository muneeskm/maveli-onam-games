import { useState } from "react";
import { Button } from "@/components/ui/button";

interface StoryGameProps {
  onBack: () => void;
}

const storyChapters = [
  {
    title: "The Golden Age",
    content: "Long ago, Kerala was ruled by the mighty King Mahabali, known for his wisdom and generosity. Under his rule, the land prospered like never before. There was no poverty, no crime, and everyone lived in perfect harmony.",
    choices: [
      "Tell me about King Mahabali's kingdom",
      "What made him so special?"
    ],
    emoji: "👑"
  },
  {
    title: "The Prosperous Kingdom",
    content: "King Mahabali's kingdom was a paradise on earth. People were honest, truthful, and kind to each other. The king himself would walk among his subjects, listening to their needs and ensuring everyone was happy. Harvests were bountiful, and celebrations were grand.",
    choices: [
      "How did the gods react to this?",
      "Continue the story..."
    ],
    emoji: "🌾"
  },
  {
    title: "The Gods' Concern",
    content: "The gods in heaven became worried. Mahabali was becoming too powerful and popular. Lord Indra, king of gods, feared that Mahabali might challenge their authority. They decided to seek help from Lord Vishnu.",
    choices: [
      "What did Lord Vishnu do?",
      "Why were the gods worried?"
    ],
    emoji: "⚡"
  },
  {
    title: "Vamana's Arrival",
    content: "Lord Vishnu took the form of a young Brahmin boy named Vamana. He approached King Mahabali during a grand yagna (ceremony) and asked for a humble gift - just three steps of land measured by his small feet.",
    choices: [
      "Did the king agree?",
      "What happened next?"
    ],
    emoji: "🚶‍♂️"
  },
  {
    title: "The Generous Gift",
    content: "King Mahabali, known for never refusing anyone, immediately agreed to grant Vamana's request. His guru Sukracharya warned him that this was no ordinary boy, but Mahabali's generosity wouldn't let him back down.",
    choices: [
      "What did Vamana do then?",
      "See the transformation..."
    ],
    emoji: "🎁"
  },
  {
    title: "The Great Transformation",
    content: "Suddenly, Vamana began to grow! He became enormous - Trivikrama! With his first step, he covered the entire earth. With his second step, he covered the heavens. He then asked Mahabali where he should place his third step.",
    choices: [
      "What did Mahabali do?",
      "The final sacrifice..."
    ],
    emoji: "🌍"
  },
  {
    title: "The Ultimate Sacrifice",
    content: "Realizing the divine nature of Vamana, Mahabali humbly bowed and offered his own head for the third step. Impressed by this selfless act, Lord Vishnu granted him a boon - he could visit his beloved kingdom once every year.",
    choices: [
      "That visit is Onam!",
      "Complete the story..."
    ],
    emoji: "🙏"
  },
  {
    title: "The Return of Mahabali",
    content: "And so, every year during the harvest season, King Mahabali returns to see his people. The festival of Onam celebrates his annual homecoming. People prepare grand feasts, make beautiful flower carpets, and celebrate to show him that Kerala still prospers under his blessings.",
    choices: [
      "Restart the story",
      "Back to games"
    ],
    emoji: "🎊"
  }
];

const StoryGame = ({ onBack }: StoryGameProps) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [showChoice, setShowChoice] = useState(true);

  const handleChoice = (choiceIndex: number) => {
    if (currentChapter === storyChapters.length - 1) {
      if (choiceIndex === 0) {
        setCurrentChapter(0); // Restart story
      } else {
        onBack(); // Back to games
      }
    } else {
      setCurrentChapter(currentChapter + 1);
    }
    setShowChoice(true);
  };

  const currentStory = storyChapters[currentChapter];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 onam-pattern">
      <div className="festival-card p-8 max-w-2xl w-full">
        <div className="text-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            ← Back to Games
          </Button>
          <h2 className="text-3xl font-bold gradient-text mb-2">
            The Legend of Mahabali
          </h2>
          <p className="text-muted-foreground">
            Chapter {currentChapter + 1} of {storyChapters.length}
          </p>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">{currentStory.emoji}</div>
            <h3 className="text-2xl font-bold mb-4 text-secondary">
              {currentStory.title}
            </h3>
          </div>

          <div className="bg-muted/50 p-6 rounded-lg">
            <p className="text-lg leading-relaxed">
              {currentStory.content}
            </p>
          </div>

          {showChoice && (
            <div className="space-y-3">
              {currentStory.choices.map((choice, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "festival" : "outline"}
                  onClick={() => handleChoice(index)}
                  className="w-full py-3 text-left justify-start"
                >
                  {choice}
                </Button>
              ))}
            </div>
          )}

          <div className="text-center">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-festival h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentChapter + 1) / storyChapters.length) * 100}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Story Progress
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryGame;