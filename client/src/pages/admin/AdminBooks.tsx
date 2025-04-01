import React from 'react'
import Book from '../../components/universal/Book'
import { useFetch } from '../../hooks/useFetch'
import LoadingComponent from '../../components/admin/LoadingComponent'

interface BookInterface {
    _id: string,
    title: string,
    author: string,
    quantity: number,
    status: string,
    createdAt: Date,
    updatedAt: Date
}

const AdminBooks: React.FC = () => {
    const { data, isLoading }: { data: BookInterface[], isLoading: boolean } = useFetch("http://localhost:4000/books")

    return (
        <div>
            <div>
                <h1 className='text-3xl font-bold text-primary'>Dashboard</h1>
                <span className='text-sm text-alt3'>Welcome back, Chlomi</span>
            </div>
            <div className='mt-5'>
                <h2 className='font-bold text-2xl text-primary'>All books</h2>
                <div className='mt-3 grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-3.5'>
                    {isLoading &&
                        Array.from({ length: 5 }).map((_, index) => (
                            <LoadingComponent key={index} />
                        ))
                    }
                    {data.map((book) => (
                        <Book book={book} key={book._id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminBooks
