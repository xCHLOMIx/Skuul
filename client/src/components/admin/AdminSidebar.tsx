import React from 'react'
import { links } from '../../data/link'
import { FiLogOut } from "react-icons/fi";
import { Link } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
    return (
        <div className='bg-primary min-w-xs p-5 h-full flex flex-col justify-between'>
            <div className='flex flex-col gap-4 justify-between'>
                <div>
                    <span className='font-bold text-xl text-white'>Skuul</span>
                </div>
                {links.map((link) => (
                    <Link key={link.id} to={link.destination}>
                        <div className={`${link.status == "active" ? "bg-alt" : ""} flex items-center gap-4 cursor-pointer px-4 py-3`}>
                            {link.icon}
                            <span className='font-medium text-sm text-white'>{link.text}</span>
                        </div>
                    </Link>
                ))}
            </div>
            <div>
                <div className='flex items-center gap-4 cursor-pointer px-4 py-3 justify-between'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-primary px-2.5 py-1 outline-2 outline-white'>
                            <span className='font-bold text-white'>C</span>
                        </div>
                        <span className='font-medium text-sm text-white'>Profile</span>
                    </div>
                    <FiLogOut size={24} color='white' />
                </div>
            </div>
        </div>
    )
}

export default AdminSidebar