import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Components/SideBar'

const Protected = () => {

    

  return (
    <>
    <div className="flex">
    <SideBar/>  
    <Outlet/>
    </div>
    </>
  )
}

export default Protected