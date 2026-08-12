import React, { createContext, useContext, useState, useEffect } from 'react';

export const themes = [
  { id: 'forest',  label: 'Forest',  swatch: '#4A7C59' },
  { id: 'ocean',   label: 'Ocean',   swatch: '#1a7fa5' },
  { id: 'sunset',  label: 'Sunset',  swatch: '#d4621a' },
  { id: 'violet',  label: 'Violet',  swatch: '#6c4aab' },
];

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(
    () => localStorage.getItem('saladdin-theme') || 'forest'
  );
  const [bgMode, setBgMode] = useState(
    () => localStorage.getItem('saladdin-bg') || 'white'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeId);
  }, [themeId]);

  useEffect(() => {
    document.documentElement.setAttribute('data-bg', bgMode);
  }, [bgMode]);

  const applyTheme = (id) => {
    localStorage.setItem('saladdin-theme', id);
    setThemeId(id);
  };

  const applyBgMode = (mode) => {
    localStorage.setItem('saladdin-bg', mode);
    setBgMode(mode);
  };

  return (
    <ThemeContext.Provider value={{ themeId, themes, applyTheme, bgMode, applyBgMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
