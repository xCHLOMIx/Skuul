import React from 'react'
import PrimaryButton from './PrimaryButton'
import { Link } from 'react-router-dom'

interface MainNavbarProps {
    theLink: string,
    text: string
}

const MainNavbar: React.FC<MainNavbarProps> = ({ theLink, text }) => {
    return (
        <div className='w-full fixed flex justify-end  p-3'>
            <Link to={theLink}>
                <PrimaryButton text={text} />
            </Link>
        </div>
    )
}

export default MainNavbar