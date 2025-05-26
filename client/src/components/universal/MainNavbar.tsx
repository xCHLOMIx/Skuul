import React from 'react'
import PrimaryButton from './PrimaryButton'
import { Link } from 'react-router-dom'

interface MainNavbarProps {
    theLink: string,
    text: string
}

const MainNavbar: React.FC<MainNavbarProps> = ({ theLink, text }) => {
    return (
        <div className='w-full fixed flex gap-3 justify-end  p-3'>
            <Link to='/admin/dashboard'>
                <button className='p-4 cursor-pointer hover:bg-primary/10 transition duration-300 font-bold text-primary'>
                    Admin panel
                </button>
            </Link>
            <Link to={theLink}>
                <PrimaryButton text={text} />
            </Link>
        </div>
    )
}

export default MainNavbar