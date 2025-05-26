import React from 'react'
import { Link } from 'react-router-dom'

const LandPage: React.FC = () => {
    return (
        <div className='flex flex-col w-full items-center gap-10 absolute bottom-0'>
            <div className='flex flex-col gap-8 items-center'>
                <h1 className='text-6xl text-primary font-bold'>Skull</h1>
                <p className='w-[500px] text-center text-black/60 text-lg'>All-in-one Library Management System to track books, handle reminders, and streamline borrowing fast, simple, and reliable.</p>
                <div className='flex gap-2'>
                    <Link to='/student/dashboard'>
                        <button className='bg-primary p-3 text-white px-4 cursor-pointer'>Get started</button>
                    </Link>
                    <Link to='/admin/dashboard'>
                        <button className='bg-white hover:bg-primary/6 duration-300 transition p-3 text-primary px-4 cursor-pointer'>Admin panel</button>
                    </Link>
                </div>
            </div>
            <div className='w-2/3 border-x-8 border-t-8 border-primary/10'>
                <img src="bg.jpeg" className='w-full' alt="" />
            </div>
        </div>
    )
}

export default LandPage