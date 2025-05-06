'use client'
import React, { useEffect, useState } from 'react'
import './userdropdown.css'
import { CircleUserRound, User, LogOut } from "lucide-react";
import { Form } from 'react-bootstrap';
import Image from 'next/image';
import userImage from '../../../public/assets/icons/user.jpg'

const UserDropdown = () => {

   return (
      <div className="userbtn_wrapper">
         <button className='userbtn' type="button">
            <div className="usericon">
               <Image src={userImage} width={40} height={40} alt='userImage' />
            </div>
            <div className="userinfo">
               <h6>Lucky Joo</h6>
               <p>Admin</p>
            </div>
         </button>
         <div className="userdropdown">
            <div className="userdropdown_inner">
               <div className="username_block">
                  <CircleUserRound size={25} fill="transparent" />
                  <p>Lucky Joo</p>
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
