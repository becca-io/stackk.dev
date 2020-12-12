import { useState, useCallback } from 'react';

export default function useBoolean(defaultValue = false) {
  const [bool, setBool] = useState(defaultValue);

  const setTrue = useCallback(() => {
    setBool(true);
  }, []);

  const setFalse = useCallback(() => {
    setBool(false);
  }, []);

  const toggle = useCallback(() => {
    setBool(b => !b);
  }, []);

  return [bool, setTrue, setFalse, toggle] as const;
}
