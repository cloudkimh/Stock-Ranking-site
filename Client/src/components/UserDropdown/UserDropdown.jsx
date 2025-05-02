'use client'
import React, { useEffect, useState } from 'react'
import './userdropdown.css'
import { CircleUserRound, User, LogOut } from "lucide-react";
import { Form } from 'react-bootstrap';

const UserDropdown = () => {
   const [isDark, setIsDark] = useState(false);
   const toggleMode = (e) => {
      const isDarkMode = e.target.checked;
      document.body.classList.toggle('dark', isDarkMode);
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      setIsDark(isDarkMode);
   }
   useEffect(() => {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const darkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
      document.body.classList.toggle('dark', darkMode);
      setIsDark(darkMode);
   }, []);

   return (
      <div className="userbtn_wrapper">
         <button className='userbtn' type="button">
            <CircleUserRound size={30} fill="transparent" />
         </button>
         <div className="userdropdown">
            <div className="userdropdown_inner">
               <div className="username_block">
                  <CircleUserRound size={25} fill="transparent" />
                  <p>Lucky Joo</p>
               </div>
               <div className="list">
                  <Form.Check
                     onChange={toggleMode}
                     type="switch"
                     id="custom-switch"
                     label='Dark Mode'
                     checked={isDark}
                  />
               </div>
               <div className="list">
                  <button className='logoutbtn btn btn-transparent'>
                     <User size={20} fill="transparent" />
                     Profile
                  </button>
               </div>
               <div className="list">
                  <button className='logoutbtn btn btn-transparent'>
                     <LogOut size={20} fill="transparent" />
                     Log out
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default UserDropdown
