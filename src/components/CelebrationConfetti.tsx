import { useState } from "react";
import Confetti from "react-confetti";

let startCelebration: (durationMs?: number) => void;

const CelebrationConfetti = () => {
  const [isConfettiRunning, setIsConfettiRunning] = useState(false);

  startCelebration = (duration: number = 5000) => {
    setIsConfettiRunning(true);
    setTimeout(() => {
      setIsConfettiRunning(false);
    }, duration);
  };

  // useEffect(() => {
  //   console.log(new Date(), "CelebrationConfetti", isConfettiRunning);
  // }, [isConfettiRunning]);

  return (
    <>
      {isConfettiRunning && (
        <Confetti
          style={{ zIndex: 99 }}
          width={window?.innerWidth || 0}
          height={document?.body?.scrollHeight || 0}
        />
      )}
    </>
  );
};

export { CelebrationConfetti, startCelebration };
