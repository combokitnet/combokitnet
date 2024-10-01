import useWindowSize from "@/hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";

let startCelebration: (durationMs?: number) => void;

const CelebrationConfetti = () => {
  const { width, height } = useWindowSize();
  const [isConfettiRunning, setIsConfettiRunning] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  startCelebration = (duration: number = 5000) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsConfettiRunning(false);
    }, duration);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return <>{isConfettiRunning && <Confetti width={width} height={height} />}</>;
};

export { CelebrationConfetti, startCelebration };
