import React from 'react'
import PrimaryButton from '../../components/universal/PrimaryButton'
import { GoShieldLock } from "react-icons/go";
import image from "../../assets/login-bg.svg"

const AdminLogin: React.FC = () => {
    return (
        <div className='h-full w-full flex overflow-hidden'>
            <div className='h-full max-lg:hidden min-w-2/3 flex justify-center items-center bg-primary'>
                <img src={image} className='w-3/4 opacity-90' alt="" />
            </div>
            <div className='h-full w-full px-12 flex flex-col justify-center gap-4'>
                <div className='flex items-center gap-3'>
                    <GoShieldLock color='#D55A29' size={32} />
                    <h1 className='text-2xl font-bold'>Admin Login</h1>
                </div>
                <form className='w-full flex flex-col gap-4'>
                    <div className='flex flex-col gap-2.5'>
                        <label htmlFor="" className='font-light'>Email:</label>
                        <input
                            type="email"
                            placeholder='example@gmail.com'
                            className='p-3.5 border border-gray-300 outline-0'
                        />
                    </div>
                    <div className='flex flex-col gap-2.5'>
                        <label htmlFor="" className='font-light'>Password:</label>
                        <input
                            type="password"
                            placeholder='•••••••••'
                            className='p-3.5 border border-gray-300 outline-0'
                        />
                    </div>
                    <PrimaryButton styles='hover:bg-white hover:text-primary border-2 transition duration-200 border-primary hover:border-primary' text='Log in' />
                </form>
            </div>
        </div>
    )
}

export default AdminLogin