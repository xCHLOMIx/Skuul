import React, { useEffect, useState } from 'react'
import { links } from '../../data/link'
import Book from '../../components/universal/Book'

interface Book {
    _id: string,
    title: string,
    author: string,
    quantity: number,
    status: string,
    createdAt: Date,
    updatedAt: Date
}

const AdminBooks: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([])
    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch('http://localhost:4000/books')
            const data = await response.json()

            setBooks(data)
        }

        fetchData()
    }, [])

    console.log(books)
    return (
        <div>
            <div>
                <h1 className='text-3xl font-bold text-primary'>Dashboard</h1>
                <span className='text-sm text-alt3'>Welcome back, Chlomi</span>
            </div>
            <div className='mt-5'>
                <h2 className='font-bold text-2xl text-primary'>All books</h2>
                <div className='mt-3 grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-3.5'>
                    {books.map((book) => (
                        <Book book={book} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminBooks