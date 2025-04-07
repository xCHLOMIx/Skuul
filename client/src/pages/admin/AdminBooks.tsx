import React, { use, useEffect, useState } from 'react'
import Book from '../../components/universal/Book'
import { useFetch } from '../../hooks/useFetch'
import BookLoading from '../../components/admin/BookLoading'
import PrimaryButton from '../../components/universal/PrimaryButton'
import { IoAdd } from 'react-icons/io5'
import { LuSave } from 'react-icons/lu'

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
    const [form, setForm] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [author, setAuthor] = useState<string>('')
    const [quantity, setQuantity] = useState<number>(1)
    const [error, setError] = useState<string>('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("YES")
        const book = { title, author, quantity }
        setLoading(true)

        const postData = async () => {
            const response = await fetch('http://localhost:4000/books/add-book', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(book)
            })
            const json = await response.json()
            if (!response.ok) {
                setLoading(false)
                setError(json.error)
            }
            if (response.ok) {
                setLoading(false)
                setError('')
            }
        }
        postData()
    }
    return (
        <div>
            <div>
                <h1 className='text-3xl font-bold text-primary'>Dashboard</h1>
                <span className='text-sm text-alt3'>Welcome back, Chlomi</span>
            </div>
            <div className='mt-5'>
                <div className='flex flex-col justify-between'>
                    <div className='flex justify-between'>
                        <h2 className='font-bold text-2xl text-primary'>All books</h2>
                        <button onClick={() => setForm(!form)} className='bg-primary p-3 border-2 flex items-center gap-3 transition duration-200 border-primary hover:text-primary hover:bg-white cursor-pointer text-white hover:border-primary'>
                            <IoAdd size={24} className={`${form ? "rotate-45" : ""} transition-all duration-300`} />
                            {!form &&
                                <span>Add book</span>
                            }
                        </button>
                    </div>
                    <div className={`${form ? "flex" : "hidden"} flex flex-col gap-2.5 w-full mt-3 bg-white p-4 border border-alt5`}>
                        {error && <div className='bg-red-50 p-3 border-2 border-red-300 text-red-400'>{error}</div>}
                        <form className='w-full flex flex-col gap-2.5' onSubmit={(e) => handleSubmit(e)}>
                            <div className='flex flex-col gap-2.5 w-full'>
                                <label htmlFor="" className='font-light'>Book title:</label>
                                <input type="text" className='input w-full' placeholder='Rich Dad Poor Dad' onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-2.5 w-full'>
                                <label htmlFor="" className='font-light'>Book title:</label>
                                <input type="text" className='input w-full' placeholder='Rich Dad Poor Dad' onChange={(e) => setAuthor(e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-2.5 w-full'>
                                <label htmlFor="" className='font-light'>Book author:</label>
                                <input type="text" className='input w-full' placeholder='Robert Kiyosaki' onChange={(e) => setQuantity(parseInt(e.target.value))} />
                            </div>
                            <PrimaryButton text='Save' styles='mt-2 w-max px-10' handleClick={() => { }} type='submit' icon={<LuSave size={22} />} isLoading={loading} />
                        </form>
                    </div>
                </div>
                <div className='mt-3 grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-3.5'>
                    {isLoading &&
                        Array.from({ length: 5 }).map((_, index) => (
                            <BookLoading key={index} />
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
