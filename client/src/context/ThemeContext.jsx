import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // โหลดการตั้งค่าจาก localStorage เมื่อเริ่มต้น
  useEffect(() => {
    const savedTheme = localStorage.getItem('campmate-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // ใช้การตั้งค่าของระบบถ้าไม่มีการบันทึกไว้
      setIsDarkMode(prefersDark);
    }
  }, []);

  // อัปเดต class ของ html element และบันทึกลง localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('campmate-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('campmate-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const value = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
