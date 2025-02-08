import React from 'react'
import GoogleButton from '../components/GoogleButton'
import Form from '../components/Form'

const Login = () => {
  return (
    <div className='h-screen bg-[#242424] text-white grid place-items-center px-4'>
        <div className="bg-black py-16 px-28 rounded-lg flex flex-col gap-10 w-[90%] sm:w-[80%] max-w-[600px]">
            <div className='grid place-items-center'>
                <img src="/logoo.webp" alt="x-logo" className='h-[60px]'/>
            </div>
            <h1 className='text-xl md:text-2xl font-bold text-center'>Sign in to X</h1>
            <GoogleButton/>
            <Form/>
        </div>
    </div>
  )
}

export default Login