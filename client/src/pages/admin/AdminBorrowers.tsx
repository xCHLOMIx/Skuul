import React from 'react'
import PrimaryButton from '../../components/universal/PrimaryButton'
import { GoBell } from "react-icons/go";
import { RiBookLine } from "react-icons/ri";
import { useFetch } from '../../hooks/useFetch';

interface BookInterface {
    _id: string,
    title: string,
    author: string,
    quantity: number,
    status: string,
    createdAt: Date,
    updatedAt: Date
}

interface Borrower {
    _id: string,
    firstName: string,
    lastName: string,
    theClass: string,
    email: string,
    password: string,
    books: BookInterface[]
    createdAt: Date
    updatedAt: Date
}

const AdminBorrowers: React.FC = () => {
    const { data, isLoading }: { data: Borrower[], isLoading: boolean } = useFetch('http://localhost:4000/books/borrowers')

    console.log(data)
    return (
        <div>
            <div>
                <h1 className='text-3xl font-bold text-primary'>Borrowers</h1>
                <span className='text-sm text-alt3'>All students that borrowed books</span>
            </div>
            <div className='mt-5'>
                <div className='flex justify-between'>
                    <h2 className='font-bold text-2xl text-primary'>All borrowers</h2>
                    <PrimaryButton icon={<GoBell size={20} />} text='Remind students' styles='py-2.5 flex items-center gap-3' />
                </div>
                <div className='mt-3 grid grid-cols-1 gap-3.5'>
                    {data && data.map((borrower) => (
                        <div key={borrower._id} className='bg-white border flex flex-col gap-3 border-alt4 p-4'>
                            <div className='flex items-center gap-3'>
                                <h2 className='font-semibold text-xl'>{borrower.firstName} {borrower.lastName}</h2>
                                <div className='p-2 py-1.5 flex items-center rounded-xl bg-customg w-max'><span className='font-semibold text-xs'>{borrower.theClass}</span></div>
                            </div>
                            {borrower.books.map((book) => (
                                <div key={book._id} className='ml-5 flex flex-col gap-2.5'>
                                    <div className='flex items-center text-base font-semibold gap-2.5'>
                                        <div className='bg-[#00000010] p-2.5 w-max rounded-lg'>
                                            <RiBookLine size={16} />
                                        </div>
                                        <h3>{book.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminBorrowers