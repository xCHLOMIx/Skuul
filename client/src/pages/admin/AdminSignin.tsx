import React, { useState } from 'react'
import PrimaryButton from '../../components/universal/PrimaryButton'
import { GoShieldLock } from "react-icons/go";
import image from "../../assets/login-bg.svg"
import { useAdminSignin } from '../../hooks/admin/useAdminSignin';

const AdminSignin: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {login, isLoading, error } = useAdminSignin()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        await login(email, password)
    }
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
                email: {email} password {password}
                {error && <div className='bg-red-50 p-3 border-2 border-red-300 text-red-400'>{error}</div>}
                <form className='w-full flex flex-col gap-4' onSubmit={(e) => handleSubmit(e)}>
                    <div className='flex flex-col gap-2.5'>
                        <label htmlFor="" className='font-light'>Email:</label>
                        <input
                            type="email"
                            placeholder='example@gmail.com'
                            className='p-3.5 border border-gray-300 outline-0'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-2.5'>
                        <label htmlFor="" className='font-light'>Password:</label>
                        <input
                            type="password"
                            placeholder='•••••••••'
                            className='p-3.5 border border-gray-300 outline-0'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <PrimaryButton type='submit' isLoading={isLoading} icon='' styles='hover:bg-white hover:text-primary border-2 transition duration-200 border-primary hover:border-primary' text='Log in' />
                </form>
            </div>
        </div>
    )
}

export default AdminSignin