import useWindowSize from "@/hooks/useWindowSize";
import { useState } from "react";
import Confetti from "react-confetti";

let startCelebration: (durationMs?: number) => void;

const CelebrationConfetti = () => {
  const { width, height } = useWindowSize();
  const [isConfettiRunning, setIsConfettiRunning] = useState(false);

  startCelebration = (duration: number = 5000) => {
    setIsConfettiRunning(true);
    setTimeout(() => {
      setIsConfettiRunning(false);
    }, duration);
  };

  return (
    <>
      {isConfettiRunning && (
        <Confetti style={{ zIndex: 99 }} width={width} height={height} />
      )}
    </>
  );
};

export { CelebrationConfetti, startCelebration };
