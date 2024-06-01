// hooks/useToggle.js
import { useState } from 'react';

const useToggle = (initialState = false) => {
  const [value, setValue] = useState(initialState);

  const toggleValue = (newValue) => {
    setValue(currentValue => typeof newValue === 'boolean'? newValue :!currentValue);
  };

  return [value, toggleValue];
};

export default useToggle;
