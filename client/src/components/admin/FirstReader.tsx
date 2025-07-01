import React from 'react'

interface BookInterface {
    _id: string,
    title: string,
    author: string,
    quantity: number,
    status: string,
    createdAt: Date,
    updatedAt: Date
}

interface Reader {
    _id: string,
    firstName: string,
    lastName: string,
    theClass: string,
    email: string,
    password: string,
    books: BookInterface[],
    booksDone: number,
    createdAt: Date,
    updatedAt: Date,
}

interface Props {
    reader: Reader,
    index: number
}

const FirstReader: React.FC<Props> = ({ reader, index }) => {
    return (
        <div className='flex flex-col items-center gap-8'>
            <div className='relative w-32 h-32 bg-primary flex justify-center items-center'>
                <span className='font-bold text-white text-5xl max-md:text-4xl max-sm:text-3xl'>{reader.firstName[0]}</span>
                <div className='absolute top-10/12 max-md:text-sm max-sm:text-xs bg-[#F4D476] px-4 py-2 '>
                    <span className='font-bold'>{(index + 1).toString().padStart(2, "0")}</span>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <div className='flex items-center gap-2'>
                    <span className='font-bold text-xl max-md:text-lg max-sm:text-base'>{reader.firstName} {reader.lastName}</span>
                    <div className={`p-2 py-1.5 flex items-center ${reader.theClass.includes('5') ? "bg-customy w-max" : ""} ${reader.theClass.includes('4') ? "bg-customg w-max" : ""} ${reader.theClass.includes('3') ? "bg-customp w-max" : ""}`}>
                        <span className='font-semibold text-xs'>{reader.theClass}</span>
                    </div>
                </div>
                <span className='text-sm max-sm:text-[10] max-md:text-xs'><b>{reader.booksDone}</b> books read</span>
            </div>
        </div>
    )
}

export default FirstReader