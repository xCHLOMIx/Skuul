import React from 'react'
import { links } from '../../data/adminLinks'
import { FiLogOut } from "react-icons/fi";
import { Link, useParams } from 'react-router-dom';
import { useAdminSignout } from '../../hooks/admin/useAdminSignout';

interface Prop {
    admin: string
}

const AdminBottomBar: React.FC<Prop> = ({ admin }) => {
    const theLink = useParams()['*']
    const { logout } = useAdminSignout()

    const handleClick = async () => {
        logout()
    }

    return (
        <div className='bg-primary fixed z-20 p-3 bottom-0 hidden w-full h-max max-md:flex justify-between'>
            <div className='flex gap-4 justify-between w-full'>
                {links.map((link) => (
                    <Link key={link.id} to={link.destination}>
                        <div className={`${theLink == link.text.toLocaleLowerCase() ? "bg-alt" : ""} hover:bg-alt flex items-center gap-4 cursor-pointer px-4 max-md:px-3.5 py-3`}>
                            {link.icon}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default AdminBottomBar