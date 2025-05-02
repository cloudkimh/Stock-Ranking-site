import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Header from '../../components/header/Header'

const Layout = ({ children }) => {
   return (
      <div className="main">
         <Sidebar />
         <div className="main_content">
            <Header />
            <div className="inner_section">
               {children}
            </div>
         </div>
      </div>
   )
}

export default Layout