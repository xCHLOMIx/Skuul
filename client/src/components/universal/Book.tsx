import React from 'react'

interface Book {
    _id?: string,
    title: string,
    author: string,
    quantity: number,
    status?: string,
    createdAt?: Date,
    updatedAt?: Date
}

interface Prop {
    book: Book
    styles?: string
}

const Book: React.FC<Prop> = ({ book, styles }) => {
    return (
        <div className={`bg-white min-h-64 justify-between border ${styles} border-alt5 p-3 flex flex-col`}>
            <div className='text-end self-end'>
                <div className={`${book.status == "Available" ? "bg-green-100" : "bg-red-200"} w-max px-2 py-1`}>
                    <span className='text-xs max-md:text-[10]'>{book.status}</span>
                </div>
                <span className='text-xs max-md:text-[10]'><b>{book.quantity}</b> left</span>
            </div>
            <div>
                <h2 className='font-bold text-2xl max-md:text-xl max-sm:text-lg'>{book.title}</h2>
                <h3 className='text-sm max-md:text-xs max-sm:text-[10] font-light'>{book.author}</h3>
            </div>
        </div>
    )
}

export default Book