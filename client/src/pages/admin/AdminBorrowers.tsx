import React, { useState } from 'react'
import PrimaryButton from '../../components/universal/PrimaryButton'
import { GoBell } from "react-icons/go";
import { useFetch } from '../../hooks/universal/useFetch';
import BorrowerLoading from '../../components/admin/BorrowerLoading';
import Borrower from '../../components/admin/Borrower';
import ReminderForm from '../../components/admin/ReminderForm';

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
    const { data, isLoading }: { data: Borrower[], isLoading: boolean } = useFetch('/api/books/borrowers')
    const [form, setForm] = useState<boolean>(false)

    return (
        <div>
            <div>
                <h1 className='text-3xl font-bold text-primary'>Borrowers</h1>
                <span className='text-sm text-alt3'>All students that borrowed books</span>
            </div>
            <div className='mt-5'>
                <div className='flex flex-col justify-between'>
                    <div className='flex justify-between'>
                        <h2 className='font-bold text-2xl text-primary'>All borrowers</h2>
                        <PrimaryButton type='button' isLoading={false} handleClick={() => setForm(!form)} icon={<GoBell size={20} />} text='Remind students' styles='py-2.5 flex items-center gap-3' />
                    </div>
                    {form && <ReminderForm />}
                </div>
                <div className='mt-3 grid grid-cols-1 gap-3.5'>
                    {isLoading && <BorrowerLoading />}
                    {data && data.map((borrower) => (
                        <Borrower borrower={borrower} key={borrower._id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminBorrowers