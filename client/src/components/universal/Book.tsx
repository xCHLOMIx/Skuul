import React from 'react'

interface Book {
    _id: string,
    title: string,
    author: string,
    quantity: number,
    status: string,
    createdAt: Date,
    updatedAt: Date
}

interface Prop {
    book :  Book
}

const Book : React.FC<Prop> = ({ book }) => {
    return (
        <div key={book._id} className='bg-white min-h-64 justify-between border border-alt5 p-3 flex flex-col'>
            <div className='text-end self-end'>
                <div className={`${book.status == "Available" ? "bg-green-100" : "bg-red-200"} w-max px-2 py-1`}>
                    <span className='text-xs'>{book.status}</span>
                </div>
                <span className='text-xs'><b>{book.quantity}</b> left</span>
            </div>
            <div>
                <h2 className='font-bold text-2xl'>{book.title}</h2>
                <h3 className='text-sm font-light'>{book.author}</h3>
            </div>
        </div>
    )
}

export default Book