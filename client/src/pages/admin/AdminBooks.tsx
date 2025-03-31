import React, { useEffect, useState } from 'react'
import { links } from '../../data/link'

const AdminBooks: React.FC = () => {
    const [books, setBooks] = useState([])
    useEffect(() => {
        
        const fetchData = async () => {
            const response = await fetch('http://localhost:4000/books')
            const data = await response.json()
            
            setBooks(data)
        }
        
        fetchData()
    }, [])

    console.log(links[2].status)
    return (
        <div>
            <div>
                <h1 className='text-3xl font-bold text-primary'>Dashboard</h1>
                <span className='text-sm text-alt3'>Welcome back, Chlomi</span>
            </div>
            <div className='mt-5'>
                <h2 className='font-bold text-2xl text-primary'>All books</h2>
                <div className='mt-3 grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-3.5'>
                </div>
            </div>
        </div>
    )
}

export default AdminBooks