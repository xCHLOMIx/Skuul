import React from 'react'
import { links } from '../../data/adminLinks'
import { FiLogOut } from "react-icons/fi";
import { Link, useParams } from 'react-router-dom';
import { useAdminSignout } from '../../hooks/admin/useAdminSignout';

const AdminSidebar: React.FC = () => {
    const theLink = useParams()['*']
    const { logout } = useAdminSignout()

    const handleClick = async () => {
        logout()
    }
    
    const loggedIn = localStorage.getItem('admin')
    let admin;

    if (loggedIn) {
        admin = JSON.parse(loggedIn)
    }
    console.log(admin)
    return (
        <div className='bg-primary min-w-xs p-5 h-full flex flex-col justify-between'>
            <div className='flex flex-col gap-4 justify-between'>
                <div>
                    <span className='font-bold text-xl text-white'>Skuul</span>
                </div>
                {links.map((link) => (
                    <Link key={link.id} to={link.destination}>
                        <div className={`${theLink == link.text.toLocaleLowerCase() ? "bg-alt" : ""} hover:bg-alt flex items-center gap-4 cursor-pointer px-4 py-3`}>
                            {link.icon}
                            <span className='font-medium text-sm text-white'>{link.text}</span>
                        </div>
                    </Link>
                ))}
            </div>
            <div>
                <div onClick={handleClick} className='flex items-center gap-4 hover:bg-alt cursor-pointer px-4 py-4 justify-between'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-primary px-3 max-w-9 py-1 outline-2 outline-white'>
                            <span className='font-bold text-white'>L</span>
                        </div>
                        <span className='font-medium text-sm text-white'>Sign out</span>
                    </div>
                    <FiLogOut size={24} color='white' />
                </div>
            </div>
        </div>
    )
}

export default AdminSidebar