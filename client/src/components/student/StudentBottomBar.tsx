import React from 'react'
import { links } from '../../data/studentLinks'
import { FiLogOut } from "react-icons/fi";
import { Link, useParams } from 'react-router-dom';
import { useStudentSignout } from '../../hooks/student/useStudentSignout';

const StudentBottomBar: React.FC = () => {
    const theLink = useParams()['*']
    const { signOut } = useStudentSignout()

    const handleClick = async () => {
        signOut()
    }

    return (
        <div className='bg-primary fixed z-20 p-3 bottom-0 hidden w-full h-max max-md:flex justify-between'>
            {links.map((link) => (
                <Link key={link.id} to={link.destination}>
                    <div className={`${theLink == link.text.toLocaleLowerCase() ? "bg-alt" : ""} hover:bg-alt flex items-center gap-4 cursor-pointer px-4 max-md:px-3.5 py-3`}>
                        {link.icon}
                    </div>
                </Link>
            ))}
            <div onClick={handleClick} className='flex items-center min-w-24 hover:bg-alt bg-alt cursor-pointer px-2.5 justify-between'>
                <div className='flex items-center gap-4'>
                    <span className='font-medium text-xs text-white'>Sign out</span>
                </div>
                <FiLogOut size={20} color='white' />
            </div>
        </div>
    )
}

export default StudentBottomBar