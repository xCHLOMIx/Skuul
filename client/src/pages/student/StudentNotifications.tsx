import React from 'react'
import { useFetch } from '../../hooks/universal/useFetch';
import BorrowerLoading from '../../components/admin/BorrowerLoading';
import Notification from '../../components/student/Notification';

interface Student {
    _id: string,
    firstName: string,
    lastName: string,
}

interface NotificationInteface {
    _id: string,
    student: Student[],
    books: string[],
    status: string,
    deadline: Date,
    createdAt: Date
    updatedAt: Date
}

const StudentNotifications: React.FC = () => {
    const { data, isLoading }: { data: NotificationInteface[], isLoading: boolean } = useFetch('/api/notifications/')
    return (
        <div>
            <div>
                <h1 className='text-3xl font-bold text-primary'>Borrowers</h1>
                <span className='text-sm text-alt3'>All students that borrowed books</span>
            </div>
            <div className='mt-5'>
                <div className='flex justify-between'>
                    <h2 className='font-bold text-2xl text-primary'>All borrowers</h2>
                </div>
                <div className='mt-3 grid grid-cols-1 gap-3.5'>
                    {isLoading && <BorrowerLoading />}
                    {data && data.map((notification) => (
                        <Notification key={notification._id} notification={notification}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StudentNotifications