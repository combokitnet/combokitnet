export const calculateHackTime = (password: string) => {
  let charsetSize = 0;

  // Auto-detect character types used in the password
  if (/[a-z]/.test(password)) charsetSize += 26; // Lowercase letters
  if (/[A-Z]/.test(password)) charsetSize += 26; // Uppercase letters
  if (/\d/.test(password)) charsetSize += 10; // Numbers
  if (/[\W_]/.test(password)) charsetSize += 32; // Symbols (non-alphanumeric)

  // Calculate number of possible combinations
  const combinations = Math.pow(charsetSize, password.length);

  // Assume 1 billion guesses per second
  const guessesPerSecond = 1e9;
  const secondsToHack = combinations / guessesPerSecond;

  // Convert time into human-readable units
  const minutes = secondsToHack / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const years = days / 365;

  // Return time estimation in a readable format
  if (years > 1e6) return "Millions of years";
  if (years > 1) return `${Math.round(years)} years`;
  if (days > 1) return `${Math.round(days)} days`;
  if (hours > 1) return `${Math.round(hours)} hours`;
  if (minutes > 1) return `${Math.round(minutes)} minutes`;
  return `${Math.round(secondsToHack)} seconds`;
};
