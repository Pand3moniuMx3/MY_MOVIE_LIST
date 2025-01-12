import { useState, useEffect } from "react";

export function useLocalStorage(initialState, key) {
  const [value, setValue] = useState(() => {
    const savedState = localStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : initialState;
  });

  // Save `added` state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
