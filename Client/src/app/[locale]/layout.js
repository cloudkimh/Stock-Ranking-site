'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import '../globals.css';
import getMessages from '../../messages.js';
import { NextIntlClientProvider } from 'next-intl';

// Import your layout components
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';


export default function LocaleLayout({ children, params }) {
   // Properly unwrap the params Promise using React.use()
   const resolvedParams = use(params);
   const { locale } = resolvedParams || "en";

   const [isReady, setIsReady] = useState(false);
   const [messages, setMessages] = useState(null);

   useEffect(() => {
      const initializeLocale = async () => {
         try {
            // Load messages using the properly unwrapped locale
            const loadedMessages = await getMessages(locale);
            setMessages(loadedMessages);
            setIsReady(true);
         } catch (error) {
            console.error('Failed to initialize locale:', error);
            // Simple fallback for invalid locale
            window.location.href = '/404';
         }
      };

      initializeLocale();
   }, [locale]);

   // Show loading state until translations are ready
   if (!isReady || !messages) {
      return (
         <div>Loading translations...</div>
      );
   }

   return (
      <div>
         <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="main">
               <Sidebar />
               <div className="main_content">
                  <Header />
                  <div className="inner_section">
                     {children}
                  </div>
               </div>
            </div>
         </NextIntlClientProvider>
      </div>
   );
}