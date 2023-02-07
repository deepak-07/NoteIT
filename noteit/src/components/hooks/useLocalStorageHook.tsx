import React, { useEffect, useState } from "react";

export function useLocalStorageHook<T>(
  key: string,
  initialValue: T | (() => T)
) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      if (typeof jsonValue == "function") return (initialValue as () => T)();
      else return initialValue;
    } else {
      return JSON.parse(jsonValue);
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    console.log("ls now ", key, value);
  }, [value, key]);

  return [value, setValue] as [T, typeof setValue];
}
