import React from "react"

const BookLoading : React.FC = () => {
    return (
        <div className='bg-white min-h-64 justify-between border border-alt5 animated p-3 flex flex-col' >
            <div className='text-end self-end flex flex-col items-end'>
                <div className={`bg-gray-200 w-12 h-5 px-2 py-1`}></div>
                <div className="w-5 h-3.5 bg-gray-200 mt-1"></div>
            </div>
            <div>
                <div className="w-full h-7 bg-gray-200"></div>
                <div className="w-full h-7 mt-1 bg-gray-200"></div>
                <div className="w-1/2 h-4 mt-2 bg-gray-200"></div>
            </div>
        </div>
    )
}

export default BookLoading