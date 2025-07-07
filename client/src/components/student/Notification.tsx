import React from "react"
import { PiBellRinging, PiBell } from "react-icons/pi";
import { RiBook2Line } from "react-icons/ri"
import { VscLibrary } from "react-icons/vsc"

interface Student {
    _id: string,
    firstName: string,
    lastName: string,
}

interface Notification {
    _id: string,
    student: Student[],
    books: string[],
    status: string,
    deadline: Date,
    createdAt: Date
    updatedAt: Date
}

interface Props {
    notification: Notification
}

const Notification: React.FC<Props> = ({ notification }) => {
    return (
        <div className='bg-white border flex flex-col gap-3 border-alt4 p-4 max-md:p-3 max-sm:p-2'>
            <div className='flex items-start justify-between gap-3'>
                <div className="flex items-center gap-3">
                    <div className="bg-primary p-2.5">
                        <VscLibrary size={24} className="max-md:w-5 max-sm:w-4 h-auto" color='white' />
                    </div>
                    <div>
                        <h2 className='font-semibold text-xl max-md:text-lg max-sm:text-base'>Library</h2>
                        <span className="text-alt3 max-md:text-sm max-sm:text-xs">Book return notification</span>
                    </div>
                </div>
                <div className={`flex gap-3 items-center ${notification.status != 'Read' ? 'bg-red-400' : 'bg-alt7'} p-2 px-3 max-md:px-2 font-bold text-white`}>
                    {notification.status != 'Read' && <PiBellRinging size={20} className="max-md:w-4.5 max-sm: max-sm:w-4 h-auto" />}
                    {notification.status == 'Read' && <PiBell size={20} color='white' className="max-md:w-4.5 max-sm: max-sm:w-4 h-auto" />}
                    <span className="max-md:text-sm max-sm:text-xs">{notification.status}</span>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <p className="max-md:text-sm max-sm:text-xs">{notification.student[0].firstName}, we’d love to remind you to return the following books to the library:</p>
                {notification.books.map((book) => (
                    <div key={book} className='ml-5 flex flex-col gap-2.5'>
                        <div className='flex items-center text-base font-semibold gap-2.5'>
                            <div className='bg-[#00000010] p-2.5 max-md:p-2 w-max rounded-lg'>
                                <RiBook2Line size={16} />
                            </div>
                            <h3 className="max-md:text-sm max-sm:text-xs">{book}</h3>
                        </div>
                    </div>
                ))}
                <p className="max-md:text-sm max-sm:text-xs">
                    Please return them not later than
                    &nbsp;
                    <span className="font-semibold">
                        {new Date(notification.deadline).toLocaleDateString()}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Notification