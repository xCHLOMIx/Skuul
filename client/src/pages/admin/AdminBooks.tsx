import React, { useEffect, useState } from 'react'
import Book from '../../components/universal/Book'
import { useFetch } from '../../hooks/universal/useFetch'
import BookLoading from '../../components/admin/BookLoading'
import { IoAdd } from 'react-icons/io5'
import { BookForm } from '../../components/admin/BookForm'
import { useBookContext } from '../../hooks/universal/useBookContext'

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
    const { data, isLoading }: { data: BookInterface[], isLoading: boolean } = useFetch("/api/books")
    const { state, dispatch } = useBookContext()

    useEffect(() => {
        if (!isLoading && data) {
            dispatch({ type: 'SET_BOOKS', payload: data })
        }
    }, [data, isLoading, dispatch])
    const [form, setForm] = useState<boolean>(false)

    return (
        <div>
            <div>
                <h1 className='text-3xl font-bold text-primary'>Books</h1>
                <span className='text-sm text-alt3'>All books</span>
            </div>
            <div className='mt-5'>
                <div className='flex flex-col justify-between'>
                    <div className='flex justify-between'>
                        <h2 className='font-bold text-2xl text-primary'>All books</h2>
                        <button onClick={() => setForm(!form)} className='bg-primary p-3 border-2 flex items-center gap-3 transition duration-200 border-primary hover:text-primary hover:bg-white cursor-pointer text-white hover:border-primary'>
                            <IoAdd size={24} className={`${form ? "rotate-45" : ""} transition-all duration-300`} />
                            <span>{form ? "Close" : "Add book"}</span>
                        </button>
                    </div>
                    {form && <BookForm />}
                </div>
                <div className='mt-3 grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-3.5'>
                    {isLoading &&
                        Array.from({ length: 5 }).map((_, index) => (
                            <BookLoading key={index} />
                        ))
                    }
                    {state.books.map((book) => (
                        <Book book={book} key={book._id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminBooks
