// src/app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nanum_Gothic } from 'next/font/google';

export const metadata = {
    title: 'Stock Ranking App',
    description: 'Your crypto tool',
};

const nanumGothic = Nanum_Gothic({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-nanum-gothic' });

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={nanumGothic.variable}>
                {children}
            </body>
        </html>
    );
}