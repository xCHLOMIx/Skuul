import React from "react"
import { RiBook2Line } from "react-icons/ri"

interface BookInterface {
    _id: string,
    title: string,
    author: string,
    quantity: number,
    status: string,
    createdAt: Date,
    updatedAt: Date
}

interface BorrowerInterface {
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

interface Props {
    borrower: BorrowerInterface
}

const Borrower: React.FC<Props> = ({ borrower }) => {
    return (
        <div key={borrower._id} className='bg-white border flex flex-col gap-3 border-alt4 p-4'>
            <div className='flex items-center gap-3'>
                <h2 className='font-semibold text-xl'>{borrower.firstName} {borrower.lastName}</h2>
                <div className={`p-2 py-1.5 flex items-center rounded-xl ${borrower.theClass.includes('5') ? "bg-customy w-max" : ""} ${borrower.theClass.includes('4') ? "bg-customg w-max" : ""} ${borrower.theClass.includes('3') ? "bg-customp w-max" : ""}`}>
                    <span className='font-semibold text-xs'>{borrower.theClass}</span>
                </div>
            </div>
            {borrower.books.map((book) => (
                <div key={book._id} className='ml-5 flex flex-col gap-2.5'>
                    <div className='flex items-center text-base font-semibold gap-2.5'>
                        <div className='bg-[#00000010] p-2.5 w-max rounded-lg'>
                            <RiBook2Line size={16} />
                        </div>
                        <h3>{book.title}</h3>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Borrower