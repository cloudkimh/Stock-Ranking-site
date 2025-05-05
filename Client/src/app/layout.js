// src/app/layout.js

import { Geist, Geist_Mono } from 'next/font/google';

export const metadata = {
    title: 'Stock Ranking App',
    description: 'Your crypto tool',
};

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export default function RootLayout({ children }) {
    return (
        <html >
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                {children}
            </body>
        </html>
    );
}