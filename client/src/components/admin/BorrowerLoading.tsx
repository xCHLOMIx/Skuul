import React from 'react'
import { RiBookLine } from 'react-icons/ri'

const BorrowerLoading: React.FC = () => {
    return (
        <div className='bg-white border flex flex-col gap-3 border-alt4 p-4 animated'>
            <div className='h-6 w-1/3 bg-gray-200'></div>
            <div className='ml-5 flex flex-col gap-2.5'>
                <div className='flex items-center text-base font-semibold gap-2.5'>
                    <div className='bg-[#00000010] p-2.5 w-max rounded-lg'>
                        <RiBookLine size={16} />
                    </div>
                    <div className='h-5 w-1/5 bg-gray-200'></div>
                </div>
                <div className='flex items-center text-base font-semibold gap-2.5'>
                    <div className='bg-[#00000010] p-2.5 w-max rounded-lg'>
                        <RiBookLine size={16} />
                    </div>
                    <div className='h-5 w-1/4 bg-gray-200'></div>
                </div>
            </div>
        </div>
    )
}

export default BorrowerLoading