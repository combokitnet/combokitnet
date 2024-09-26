import { useEffect, useState } from "react";

interface UseLocalStorageOptions<T> {
  key: string;
  defaultValue: T;
  decodeFunc?: (value: string) => T; // Function to decode string to value
  encodeFunc?: (value: T) => string; // Function to encode value to string
}

function useLocalStorage<T>({
  key,
  defaultValue,
  decodeFunc = JSON.parse, // Default decoding function is JSON.parse
  encodeFunc = JSON.stringify, // Default encoding function is JSON.stringify
}: UseLocalStorageOptions<T>) {
  const readValue = (): T => {
    if (typeof window === "undefined") {
      console.log(
        `[useLocalStorage] SSR mode, returning default value:`,
        defaultValue
      );
      return defaultValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsedValue = decodeFunc(item);
        console.log(
          `[useLocalStorage] Found existing value for key "${key}":`,
          parsedValue
        );
        return parsedValue;
      } else {
        console.log(
          `[useLocalStorage] No existing value for key "${key}", using default value:`,
          defaultValue
        );
        return defaultValue;
      }
    } catch (error) {
      console.error(`[useLocalStorage] Error reading key "${key}":`, error);
      return defaultValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);
  const [oldValue, setOldValue] = useState<T>(); // add this

  useEffect(() => {
    if (typeof window === "undefined" || !window.localStorage.getItem(key)) {
      return;
    }

    setOldValue(decodeFunc(window.localStorage.getItem(key)!));
  }, []);

  useEffect(() => {
    setStoredValue(readValue());
  }, [key, defaultValue]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        const encodedValue = encodeFunc(valueToStore); // Use encodeFunc to encode value
        window.localStorage.setItem(key, encodedValue);
        console.log(
          `[useLocalStorage] Set value for key "${key}":`,
          valueToStore
        );
      }
    } catch (error) {
      console.error(`[useLocalStorage] Error setting key "${key}":`, error);
    }
  };

  const removeKey = () => {
    try {
      setStoredValue(defaultValue);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
        console.log(`[useLocalStorage] Removed key "${key}"`);
      }
    } catch (error) {
      console.error(`[useLocalStorage] Error removing key "${key}":`, error);
    }
  };

  return { value: storedValue, oldValue, setValue, removeKey };
}

export default useLocalStorage;
