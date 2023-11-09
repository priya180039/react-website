import React from 'react';
import landingBg from '../assets/landingBg.jpg';
import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook } from 'react-icons/ai';

const Landing = () => {
    return (
        <div className="relative w-full h-screen bg-zinc-900/90">
            <img src={landingBg} alt='Background' className='absolute w-full h-full object-cover mix-blend-overlay' />
            <div className='flex justify-center items-center h-full'>
                <form className='max-w-[400px] w-full mx-auto bg-white p-8 text-white'>
                    <h2 className='text-4xl font-bold text-center py-4'>BRAND.
                    </h2>
                    <div className='flex justify-between py-8'>
                        <p className='border shadow-lg hover:shadow-xl px-6 py-2 relative'><AiFillFacebook /> Facebook
                        </p>
                        <p className='border shadow-lg hover:shadow-xl px-6 py-2 relative'><FcGoogle /> Google
                        </p>
                    </div>
                    <div>
                        <label>Username</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type='password' />
                    </div>
                    <button>Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default Landing