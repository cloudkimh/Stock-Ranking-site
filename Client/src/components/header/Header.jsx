'use client'

import { Menu, ListMinus, Moon, Sun } from "lucide-react";
import React, { useState } from 'react'
import './header.css'
import UserDropdown from "../UserDropdown/UserDropdown";
import LanguageSelect from "./LanguageSelect";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Header = () => {

   const [toggle, setToggle] = useState(false)
   const toggleSidebar = () => {
      setToggle(!toggle)
      document.body.classList.toggle('sidebar_toggle')
   }
   return (
      <header className='header_wrapper'>
         <button className="sidebar_toggle_btn" onClick={toggleSidebar}>
            {
               toggle ?
                  <Menu size={32} fill="transparent" />
                  :
                  <ListMinus size={32} fill="transparent" />
            }
         </button>
         <div className="d-flex gap-3 ml-auto align-items-center">
            <ThemeToggle />
            <LanguageSelect />
            <UserDropdown />
         </div>
      </header>
   )
}

export default Header

