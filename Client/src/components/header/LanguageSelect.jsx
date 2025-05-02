import React, { useState } from 'react';
import USA from '../../../public/assets/flags/USA.svg'
import DE from '../../../public/assets/flags/DE.svg'
import KR from '../../../public/assets/flags/KR.svg'
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const languages = [
   { code: 'en', name: 'English', flag: USA },
   { code: 'kr', name: 'Korean', flag: KR },
   { code: 'de', name: 'German', flag: DE },
];

const LanguageSelect = () => {
   const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

   const handleLanguageChange = (language) => {
      setSelectedLanguage(language);
   };

   return (
      <div className="language-select">
         <button className="language-select-btn">
            <Image src={selectedLanguage.flag} alt={selectedLanguage.name} width={20} height={20} />
            <span>{selectedLanguage.name}</span>
            <ChevronDown size={18} fill="transparent" style={{color:"#c7bcbc"}} />

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