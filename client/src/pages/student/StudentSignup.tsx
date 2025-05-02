import React, { useRef, useState } from 'react'
import PrimaryButton from '../../components/universal/PrimaryButton'
import image from "../../assets/login-bg.svg"
import { GoShieldLock } from 'react-icons/go'
import { classes } from '../../data/classes'
import { PiCaretCircleLeftLight, PiCaretDownBold } from "react-icons/pi";
import { Link } from 'react-router-dom'
import { useStudentSignup } from '../../hooks/student/useStudentSignup'

const StudentSignup = () => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastname] = useState('')
    const [theClass, setTheClass] = useState('Select your Class')
    const inputRefs = useRef<HTMLInputElement[]>([])
    const [isClicked, setIsClicked] = useState(false)
    const [two, setTwo] = useState(false)
    const [one, setOne] = useState(true)
    const { login, isLoading, error } = useStudentSignup()


    const handleChange = (e: any, index: number) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) inputRefs.current[index + 1].focus()
    }

    const handleKeyDown = (e: any, index: number) => {
        if (e.key === "Backspace" && e.target.value === '' && index > 0) inputRefs.current[index - 1].focus()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const pin = inputRefs.current.map((e) => e.value).join('')

        await login(email, firstName, lastName, theClass, pin)
    }

    return (
        <div className='h-full w-full flex overflow-hidden'>
            <div className='h-full max-lg:hidden min-w-2/3 w-2/3  p-28 flex justify-center items-center bg-primary'>
                <img src={image} className='h-full opacity-90' alt="" />
            </div>
            <div className='h-full w-full px-12 flex flex-col justify-center gap-4'>
                <div className='flex items-center gap-3'>
                    <GoShieldLock color='#D55A29' size={32} />
                    <h1 className='text-2xl font-bold'>Student Sign up</h1>
                </div>
                {error && <div className='bg-red-50 p-3 border-2 border-red-300 text-red-400'>{error}</div>}
                <form onSubmit={handleSubmit} className='w-full transition duration-300 flex flex-col overflow-hidden items-center h-[372px]  relative'>
                    <section className={`absolute ${two ? "-translate-x-full" : ""} ${one ? "left-0" : ""} px-1 w-full transition-all duration-300 flex flex-col gap-4`}>
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
                                type="text"
                                placeholder='Doe'
                                className='input'
                                onChange={(e) => setLastname(e.target.value)}
                            />
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
                        <PrimaryButton icon='' handleClick={() => { setTwo(true); setOne(false) }} text='Next' isLoading={false} type='button' styles='w-full' />
                    </section>
                    <section className={`absolute ${two ? "left-0" : ""} ${one ? "left-full" : ""} px-1 transition-all w-full duration-300 flex flex-col gap-4`}>
                        <div onClick={() => { setTwo(false); setOne(true) }} className='p-2 border-2 border-primary hover:bg-primary flex items-center gap-2 hover:text-white transition duration-300 cursor-pointer w-max'>
                            <PiCaretCircleLeftLight size={18} />
                            <span className='text-sm'>Back</span>
                        </div>
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
                                    <div key={oneClass.name} onClick={() => setTheClass(oneClass.name)}
                                        className='p-3  hover:bg-gray-200 cursor-pointer transition duration-200'
                                    >
                                        {oneClass.name}
                                    </div>
                                ))}
                            </div>
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
                                        className='input text-center pwd'
                                        onChange={(e) => {
                                            setOne(false)
                                            setTwo(true)
                                            handleChange(e, index)
                                        }}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                    />
                                ))}
                            </div>
                        </div>
                        <PrimaryButton icon='' handleClick={() => { }} text='Sign up' isLoading={isLoading} type='submit' styles='w-full' />
                    </section>
                </form>
                <Link to='/student/signin' className='self-end font-bold text-primary cursor-pointer'>
                    Have account? Sign in here
                </Link>
            </div>
        </div>
    )
}

export default StudentSignup