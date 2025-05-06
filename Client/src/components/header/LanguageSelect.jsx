'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import USA from '../../../public/assets/flags/USA.svg';
import KR from '../../../public/assets/flags/KR.svg';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const languages = [
   { code: 'en', name: 'English', flag: USA },
   { code: 'ko', name: 'Korean', flag: KR },
];

const LanguageSelect = () => {
   const router = useRouter();
   const pathname = usePathname(); // e.g., /en/stock or /ko/stock
   const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

   // Sync selected language with current locale in URL
   useEffect(() => {
      const currentLocale = pathname.split('/')[1]; // get "en" or "ko"
      const matchedLang = languages.find((lang) => lang.code === currentLocale);
      if (matchedLang) {
         setSelectedLanguage(matchedLang);
      }
   }, [pathname]);

   const handleLanguageChange = (language) => {
      if (language.code === selectedLanguage.code) return;

      const segments = pathname.split('/');
      segments[1] = language.code; // Replace the locale segment
      const newPath = segments.join('/');
      router.push(newPath); // Navigate to new locale route
   };

   return (
      <div className="language-select">
         <button className="language-select-btn">
            <Image src={selectedLanguage.flag} alt={selectedLanguage.name} width={20} height={20} />
            <span>{selectedLanguage.name}</span>
            <ChevronDown size={18} style={{ color: "#c7bcbc" }} />
         </button>
         <ul className="language-dropdown">
            {languages.map((language) => (
               <button type="button" key={language.code} onClick={() => handleLanguageChange(language)}>
                  <Image src={language.flag} alt={language.name} width={20} height={20} />
                  <span>{language.name}</span>
               </button>
            ))}
         </ul>
      </div>
   );
};

export default LanguageSelect;
