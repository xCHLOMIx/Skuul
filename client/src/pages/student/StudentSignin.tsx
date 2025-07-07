import React, { useRef, useState } from 'react'
import PrimaryButton from '../../components/universal/PrimaryButton'
import { GoShieldLock } from "react-icons/go";
import image from "../../assets/login-bg.svg"
import { Link } from 'react-router-dom';
import { useStudentSignin } from '../../hooks/student/useStudentSignin';
import ErrorComponent from '../../components/universal/ErrorComponent';


const StudentSignin: React.FC = () => {
    const [email, setEmail] = useState('')
    const inputRefs = useRef<HTMLInputElement[]>([])
    const { login, error, isLoading } = useStudentSignin()

    const handleChange = (e: any, index: number) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus()
        }
    }

    const handleKeyDown = (e: any, index: number) => {
        if (e.key === "Backspace") {
            if (e.target.value === '' && index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const pin = inputRefs.current.map((e) => e.value).join('')
        await login(email, pin)
    }

    return (
        <div className='h-full w-full flex overflow-hidden'>
            <div className='h-full max-lg:hidden min-w-2/3 flex justify-center items-center bg-primary'>
                <img src={image} className='w-3/4 opacity-90' alt="" />
            </div>
            <div className='h-full w-full px-12 flex flex-col justify-center gap-4'>
                <div className='flex items-center gap-3'>
                    <GoShieldLock color='#D55A29' size={32} />
                    <h1 className='text-2xl font-bold'>Student Sign in</h1>
                </div>
                {error && <ErrorComponent error={error} /> }
                <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
                    <div className='flex flex-col gap-2.5'>
                        <label htmlFor="" className='font-light'>Email:</label>
                        <input
                            type="email"
                            placeholder='example@gmail.com'
                            className='input'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-2.5'>
                        <label htmlFor="" className='font-light'>PIN:</label>
                        <div className='grid grid-cols-6 gap-3 max-sm:gap-1'>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <input
                                    ref={(el) => { if (el) inputRefs.current[index] = el }}
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    className='input text-center pwd'
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                />
                            ))}
                        </div>
                    </div>
                    <PrimaryButton type='submit' isLoading={isLoading} handleClick={() => { }} icon='' styles='hover:bg-white hover:text-primary border-2 transition duration-200 border-primary hover:border-primary' text='Sign in' />
                </form>
                <Link to='/student/signup' className='self-end font-bold text-primary cursor-pointer'>
                    New? Sign up here
                </Link>
            </div>
        </div>
    )
}

export default StudentSignin