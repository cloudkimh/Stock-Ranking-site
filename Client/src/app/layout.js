// src/app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';
import { Noto_Sans_KR } from 'next/font/google';


export const metadata = {
    title: 'Stock Ranking App',
    description: 'Your crypto tool',
};

const notoSansKR = Noto_Sans_KR({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-noto-sans-kr' });

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={notoSansKR.variable}>
                {children}
            </body>
        </html>
    );
}