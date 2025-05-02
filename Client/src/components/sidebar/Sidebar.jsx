'use client'
import './sidebar.css'
import { Lightbulb, House, BadgeDollarSign, PackagePlus, ShieldEllipsis, Rocket, ShieldCheck, CalendarDays, HandHeart, Goal } from "lucide-react";
import { usePathname } from 'next/navigation';

const Sidebar = () => {

   const pathname = usePathname();

   const navLinks = [
      { href: '/', icon: <House size={25} />, label: 'Home' },
      { href: '/discovery', icon: <Lightbulb size={25} />, label: 'Discovery' },
      { href: '/quest', icon: <Goal size={25} />, label: 'Quest' },
      { href: '/fundraising', icon: <HandHeart size={25} />, label: 'Fundraising' },
      { href: '/calendar', icon: <CalendarDays size={25} />, label: 'Calendar' },
      { href: '/wallet-scan', icon: <ShieldCheck size={25} />, label: 'Wallet Scan' },
      { href: '/trending', icon: <ShieldCheck size={25} />, label: 'Trending' },
      { href: '/new-launch', icon: <PackagePlus size={25} />, label: 'New Launch' },
      { href: '/pre-launch', icon: <Rocket size={25} />, label: 'Pre Launch' },
      { href: '/crypto', icon: <ShieldEllipsis size={25} />, label: 'Crypto' },
      { href: '/exchange', icon: <BadgeDollarSign size={25} />, label: 'Exchange' },
   ];

   return (
      <div className="sidebar_container">
         <div className="main_logo">
            <a href="/">STOCKLIST</a>
         </div>
         <div className="sidebar_inner scrollbar-hide">
            <nav className="navlist">
               <ul className="p-0">
                  {navLinks.map(({ href, icon, label }, idx) => (
                     <li key={idx}>
                        <a href={href} className={pathname === href ? 'active' : ''}>
                           {icon}
                           <span>{label}</span>
                        </a>
                     </li>
                  ))}
               </ul>
            </nav>
         </div>
      </div >
   );
};

export default Sidebar;