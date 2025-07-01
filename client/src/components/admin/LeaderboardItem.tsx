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


const LeaderboardItem: React.FC<Props> = ({ reader, index }) => {
    return (
        <div className='bg-white border flex justify-between gap-3 border-alt4 p-4 w-full max-md:p-3'>
            <div className='flex items-center gap-3 w-full'>
                <div className={`${index === 1 ? "bg-[#F3D8FC]" : "bg-[#CBF9CF]"} ${index === 2 ? "bg-[#FBE7B1]" : ""} h-[50px] min-w-[50px] flex items-center justify-center`}>
                    <span className='text-base font-bold'>{(index + 1).toString().padStart(2, "0")}</span>
                </div>
                <div className='w-full'>
                    <div className='flex items-center justify-between gap-3'>
                        <h2 className='font-semibold text-xl max-md:text-lg max-sm:text-sm'>{reader.firstName} {reader.lastName}</h2>
                        <div className={`p-2 py-1.5 flex  items-center ${reader.theClass.includes('5') ? "bg-customy w-max" : ""} ${reader.theClass.includes('4') ? "bg-customg w-max" : ""} ${reader.theClass.includes('3') ? "bg-customp w-max" : ""}`}>
                            <span className='font-semibold max-md:text-[10] max-sm:text-[8] text-xs'>{reader.theClass}</span>
                        </div>
                    </div>
                    <span className='text-sm max-md:text-xs max-sm:text-[10]'><b>{reader.booksDone}</b> books read</span>
                </div>
            </div>
        </div>
    )
}

export default LeaderboardItem