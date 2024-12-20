import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {

  const nav = useNavigate();

  useEffect(()=>{
   nav('/login')
  },[])
  return (
    <div>LandingPage</div>
  )
}

export default LandingPage