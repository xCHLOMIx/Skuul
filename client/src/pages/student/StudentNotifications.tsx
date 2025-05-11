import React from 'react'
import { useFetch } from '../../hooks/universal/useFetch';
import BorrowerLoading from '../../components/admin/BorrowerLoading';
import Notification from '../../components/student/Notification';
import { GoBellSlash } from "react-icons/go";

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

interface TheStudent {
    id: string,
    name: string,
    token: string
}

interface Prop {
    student: TheStudent
}

const StudentNotifications: React.FC<Prop> = ({ student }) => {
    const { data, isLoading }: { data: NotificationInteface[], isLoading: boolean } = useFetch(`/api/notifications/${student.id}`)
    console.log(data)
    return (
        <div className='h-full'>
            <div>
                <h1 className='text-3xl font-bold text-primary'>Notifications</h1>
                <span className='text-sm text-alt3'>These are Notifications for book return</span>
            </div>
            <div className={`${!data.length ? "flex justify-center items-center h-full" : ""} ${data.length ? "mt-5" : "-mt-16"} h-full`}>
                <div className='flex justify-between'>
                    {(data.length && !isLoading) ?
                        (<h2 className='font-bold text-2xl text-primary'>
                            All notifications
                        </h2>) : (
                            <div className='font-bold flex justify-center flex-col items-center text-xl gap-5 text-alt7'>
                                <GoBellSlash size={100} />
                                No notifications
                            </div>
                        )
                    }
                </div>
                <div className='mt-3 grid grid-cols-1 gap-3.5'>
                    {isLoading && <BorrowerLoading />}
                    {data && data.map((notification) => (
                        <Notification key={notification._id} notification={notification} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StudentNotifications