import React from "react"
import { GoBell } from "react-icons/go";
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
    date: Date,
    createdAt: Date
    updatedAt: Date
}

interface Props {
    notification: Notification
}

const Notification: React.FC<Props> = ({ notification }) => {
    return (
        <div className='bg-white border flex flex-col gap-3 border-alt4 p-4'>
            <div className='flex items-start justify-between gap-3'>
                <div className="flex items-center gap-3">
                    <div className="bg-primary p-2.5">
                        <VscLibrary size={24} color='white' />
                    </div>
                    <div>
                        <h2 className='font-semibold text-xl'>Library</h2>
                        <span className="text-alt3">Book return notification</span>
                    </div>
                </div>
                <div className={`flex gap-3 items-center ${notification.status != 'Read' ? 'bg-red-400' : 'bg-alt7' } p-2 px-3 font-bold text-white`}>
                    {notification.status != 'Read' && <PiBellRinging size={20} />}
                    {notification.status == 'Read' && <PiBell size={20} color='white' />}
                    <span>{notification.status}</span>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <p>Gutabarwa, we’d love to remind you to return the following books to the library</p>
                {notification.books.map((book) => (
                    <div key={book} className='ml-5 flex flex-col gap-2.5'>
                        <div className='flex items-center text-base font-semibold gap-2.5'>
                            <div className='bg-[#00000010] p-2.5 w-max rounded-lg'>
                                <RiBook2Line size={16} />
                            </div>
                            <h3>{book}</h3>
                        </div>
                    </div>
                ))}
                <p>Please return them not later than 15th - June - 2025</p>
            </div>
        </div>
    )
}

export default Notification