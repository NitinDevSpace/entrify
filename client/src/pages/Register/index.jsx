import React from 'react'
import bgImage from '../../assets/login_bg.jpeg'
import tlogo from '../../assets/entrify_t.png'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

function Register() {
  const navigate = useNavigate();
  return (
     <div className="relative p-0 flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
    
      {/* Register Conatiner */}
      <div className="bg-white rounded-lg  h-3/4 w-2/3 flex justify-center overflow-hidden relative">
        <img src={tlogo} alt="logo" className="absolute top-1 left-2 w-18 h-20 z-10" />

        {/* Left Panel */}
        <div className='w-1/3 bg-[#7B61FF] text-white p-12 flex flex-col justify-center'>
          <h2 className='text-3xl font-extrabold mb-4'>Welcome Back</h2>
          <span>To keep connected with us please login with your personal info</span>
          <Button onClick={() => {navigate('/login')}} className=' m-3'>Login</Button>
        </div>

        {/* Right Panel */}
        <div className='m-0 p-0 w-2/3 '>
          <h1 className="text-2xl font-bold text-center mb-4">Login to Entrify</h1>
        </div>
        
      </div>
    </div>
  )
}

export default Register