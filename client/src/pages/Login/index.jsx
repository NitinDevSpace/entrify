import React from 'react'
import {Button, Form, Input} from 'antd'
import { Link } from 'react-router-dom'
import bgImage from '../../assets/login_bg.jpeg'
import tlogo from '../../assets/entrify_t.png'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();
  return (
    <div className="relative p-0 flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>

      {/* Login Conatiner */}
      <div className="bg-white rounded-lg  h-3/4 w-2/3 flex justify-center overflow-hidden relative font-mon">
        <img src={tlogo} alt="logo" className="absolute top-1 left-2 w-18 h-20 z-10" />

        {/* Left Panel */}
        <div className='w-2/3 flex flex-col justify-center text-center'>
            <h1 className="text-2xl font-bold text-center mb-4 ">Login to Entrify</h1>
            <Form layout='vertical' className='flex flex-col'>
              <Form.Item
                label = 'Email'
                htmlFor='email'
                name='email'
                className='d-block flex'
                rules={[
                  {required:true, message:"Enter Your Email"}
                ]} >
                <Input id='email' type='text' placeholder='Enter Your Email' />
              </Form.Item>
              <Form.Item
                label = 'Password'
                htmlFor='password'
                name='password'
                className='d-block flex'
                rules={[
                  {required:true, message:"Enter Password"}
                ]} >
                <Input id='password' type='password' placeholder='Enter Your password' />
              </Form.Item>
              <Form.Item>
                <Button type='primary'>Login</Button>
              </Form.Item>
            </Form>
        </div>

        {/* Right Panel */}
        <div className='w-1/3 bg-[#7B61FF] text-white p-10 flex flex-col justify-center gap-3 text-center'>
            <h2 className='text-3xl font-extrabold mb-4'>Hello,  Friend!</h2>
            <span className='inline-block'>Enter your personal details here and start your journey with us</span>
            <Button onClick={() => {navigate('/register')}} className=' m-3'>Register</Button>
        </div>
        
      </div>
    </div>
  )
}

export default Login