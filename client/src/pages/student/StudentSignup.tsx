import React, { useRef, useState } from 'react'
import PrimaryButton from '../../components/universal/PrimaryButton'
import image from "../../assets/login-bg.svg"
import { GoShieldLock } from 'react-icons/go'
import { classes } from '../../data/classes'
import { PiCaretDownBold } from "react-icons/pi";
import { Link } from 'react-router-dom'

const StudentSignup = () => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastname] = useState('')
    const [theClass, setTheClass] = useState('Select your Class')
    const inputRefs = useRef<HTMLInputElement[]>([])
    const [isClicked, setIsClicked] = useState(false)


    const handleChange = (e: any, index: number) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) inputRefs.current[index + 1].focus()
    }

    const handleKeyDown = (e: any, index: number) => {
        if (e.key === "Backspace" && e.target.value === '' && index > 0) inputRefs.current[index - 1].focus()
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <div className='h-full w-full flex overflow-hidden'>
            <div className='h-full max-lg:hidden min-w-2/3 flex justify-center items-center bg-primary'>
                <img src={image} className='w-3/4 opacity-90' alt="" />
            </div>
            <div className='h-full w-full px-12 flex flex-col justify-center gap-4'>
                <div className='flex items-center gap-3'>
                    <GoShieldLock color='#D55A29' size={32} />
                    <h1 className='text-2xl font-bold'>Student Login</h1>
                </div>
                <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
                    <div className='flex flex-col gap-2.5'>
                        <label htmlFor="" className='font-light'>First name:</label>
                        <input
                            type="text"
                            placeholder='John'
                            className='input'
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-2.5'>
                        <label htmlFor="" className='font-light'>Last name:</label>
                        <input
                            type="email"
                            placeholder='Doe'
                            className='input'
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-2.5'>
                        <label htmlFor="" className='font-light'>Class:</label>
                        <div onClick={() => setIsClicked(!isClicked)} className='input relative cursor-pointer'>
                            <div className='flex justify-between items-center'>
                                <span
                                    className={`${theClass == "Select your Class" ? "text-gray-400" : "text-black"}`}
                                >
                                    {theClass}
                                </span>
                                <PiCaretDownBold size={18} />
                            </div>
                            <div className={`absolute ${isClicked ? "block" : "hidden"} dropdown`}>
                                {classes.map((oneClass) => (
                                    <div onClick={() => setTheClass(oneClass.name)}
                                        className='p-3  hover:bg-gray-200 cursor-pointer transition duration-200'
                                    >
                                        {oneClass.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
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
                        <div className='grid grid-cols-6 gap-3'>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <input
                                    ref={(el) => { if (el) inputRefs.current[index] = el }}
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    className='input text-center'
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                />
                            ))}
                        </div>
                    </div>
                    <PrimaryButton handleClick={() => { }} icon='' styles='hover:bg-white hover:text-primary border-2 transition duration-200 border-primary hover:border-primary' text='Sign up' />
                </form>
                <Link to='/student/signin' className='self-end font-bold text-primary cursor-pointer'>
                    Have account? Sign in here
                </Link>
            </div>
        </div>
    )
}

export default StudentSignup