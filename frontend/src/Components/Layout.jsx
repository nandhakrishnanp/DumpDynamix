import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'

const Layout = () => {
  return (
    <div className='flex'>
           <SideBar/>  
           <Outlet/>
    </div>
  )
}

export default Layout