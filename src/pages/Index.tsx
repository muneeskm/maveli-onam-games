import { useState } from "react";
import MaveliWelcome from "@/components/MaveliWelcome";
import WordPuzzleGame from "@/components/WordPuzzleGame";
import StoryGame from "@/components/StoryGame";
import HideSeekGame from "@/components/HideSeekGame";

const Index = () => {
  const [currentView, setCurrentView] = useState<string>("welcome");

  const handleGameSelect = (game: string) => {
    setCurrentView(game);
  };

  const handleBackToWelcome = () => {
    setCurrentView("welcome");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "word-puzzle":
        return <WordPuzzleGame onBack={handleBackToWelcome} />;
      case "story":
        return <StoryGame onBack={handleBackToWelcome} />;
      case "hide-seek":
        return <HideSeekGame onBack={handleBackToWelcome} />;
      default:
        return <MaveliWelcome onGameSelect={handleGameSelect} />;
    }
  };

  return renderCurrentView();
};

export default Index;
