import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Stock Ranking App",
  description: "Skynet 101, Crypto Due diligence tools, Defi Analytics, Due diligence features, Due diligence modules, Crypto analysis, Crypto monitoring  Crypto data, Crypto analytics, Crypto research sites, Web3 analysis, Web3 monitoring, Whale stats crypto, Project analysis, Project monitoring, Cryptocurrency analysis, Cryptocurrency monitoring, Blockchain analysis, Blockchain monitoring, Wallet analysis, Wallet monitoring, Address analysis, Address monitoring, On-chain analysis, On-chain monitoring, Onchain analysis, Onchain data, Token analysis, Token monitoring, Security analysis, Security monitoring, Market analysis, Market monitoring, Governance analysis, Governance monitoring, Social analysis, Social monitoring, Cryptocurrency security, Crypto security, Blockchain security, Wallet security, Address security, On-chain security, Token security, Security information, Security data, Security insights, Data insights, Real-time information, Risk management, Risk assessment, Risk prevention, Risk mitigation, Risk analysis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
