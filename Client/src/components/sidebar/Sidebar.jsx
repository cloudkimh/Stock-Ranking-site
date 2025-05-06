'use client';
import './sidebar.css';
import {
   Lightbulb, House, BadgeDollarSign, PackagePlus, ShieldEllipsis,
   Rocket, ShieldCheck, CalendarDays, HandHeart, Goal,
   ChartCandlestick
} from "lucide-react";
import Image from 'next/image';
import logo from '../../../public/assets/icons/logo.png';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';


const Sidebar = () => {
   const pathname = usePathname();
   const t = useTranslations();

   // Get the locale from the pathname (e.g., /en/discovery -> 'en')
   const locale = pathname.split('/')[1];


   const navLinks = [
      { href: '/', icon: <House size={25} />, label: 'Home' },
      { href: '/stocklist', icon: <ChartCandlestick size={25} />, label: 'Stock List' },
      { href: '/discovery', icon: <Lightbulb size={25} />, label: 'Discovery' },
      { href: '/quest', icon: <Goal size={25} />, label: 'Quest' },
      { href: '/fundraising', icon: <HandHeart size={25} />, label: 'Fundraising' },
      { href: '/calendar', icon: <CalendarDays size={25} />, label: 'Calendar' },
      { href: '/wallet-scan', icon: <ShieldCheck size={25} />, label: 'Wallet Scan' },
      { href: '/new-launch', icon: <PackagePlus size={25} />, label: 'New Launch' },
      { href: '/pre-launch', icon: <Rocket size={25} />, label: 'Pre Launch' },
      { href: '/crypto', icon: <ShieldEllipsis size={25} />, label: 'Crypto' },
      { href: '/exchange', icon: <BadgeDollarSign size={25} />, label: 'Exchange' },
   ];

   return (
      <div className="sidebar_container">
         <div className="main_logo">
            <Link href={`/${locale}`}>
               <Image src={logo} width={165} height={48} alt="logo" />
            </Link>
         </div>
         <div className="sidebar_inner scrollbar-hide">
            <nav className="navlist">
               <ul className="p-0">
                  {navLinks.map(({ href, icon, label }, idx) => {
                     const fullHref = `/${locale}${href}`;
                     const isActive = pathname === fullHref;
                     
                     return (
                        <li key={idx}>
                           <Link href={fullHref} className={isActive ? 'active' : ''}>
                              {icon}
                              <span>{t(label)}</span>
                           </Link>
                        </li>
                     );
                  })}
               </ul>
            </nav>
         </div>
      </div>
   );
};

export default Sidebar;
