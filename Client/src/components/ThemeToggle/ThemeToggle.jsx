'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
   const [isDark, setIsDark] = useState(false);
   const [mode, setMode] = useState('false')

   const toggleMode = (e) => {
      const isDarkMode = e.target.checked;
      document.body.classList.toggle('dark', isDarkMode);
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      setIsDark(isDarkMode);
      setMode(!mode)
   }
   useEffect(() => {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const darkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
      document.body.classList.toggle('dark', darkMode);
      setIsDark(darkMode);
   }, []);

   return (
      <button onClick={toggleMode} className="themebutton">
         {!mode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
   );
}
