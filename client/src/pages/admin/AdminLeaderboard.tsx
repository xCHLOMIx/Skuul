import React from 'react'
import PrimaryButton from '../../components/universal/PrimaryButton'
import { useFetch } from '../../hooks/useFetch';
import BorrowerLoading from '../../components/admin/BorrowerLoading';
import { GrPowerReset } from 'react-icons/gr';
import { ScaleLoader } from 'react-spinners';

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

const AdminLeaderboard: React.FC = () => {
    const { data, isLoading }: { data: Reader[], isLoading: boolean } = useFetch('/api/books/readers')

    console.log(data)
    return (
        <div>
            <div>
                <h1 className='text-3xl font-bold text-primary'>Borrowers</h1>
                <span className='text-sm text-alt3'>All students that borrowed books</span>
            </div>
            <div className='mt-5'>
                <div className='flex justify-between'>
                    <h2 className='font-bold text-2xl text-primary'>All borrowers</h2>
                    <PrimaryButton type='button' isLoading={false} handleClick={() => { }} icon={<GrPowerReset size={20} />} text='Reset Leaderboard' styles='py-2.5 flex items-center gap-3' />
                </div>
                {isLoading && <ScaleLoader color='black' height={12} width={4} />}
                <div className='mt-3 grid grid-cols-1 gap-3.5'>
                    {data && data.map((reader, index) => (
                        <div key={reader._id} className='bg-white border flex justify-between gap-3 border-alt4 p-4'>
                            <div className='flex items-center gap-3'>
                                <div className='bg-primary h-[50px]  w-[50px] flex items-center justify-center'>
                                    <span className='text-2xl font-bold text-white'>{reader.firstName[0]}</span>
                                </div>
                                <div>
                                    <div className='flex items-center gap-3'>
                                        <h2 className='font-semibold text-xl'>{reader.firstName} {reader.lastName}</h2>
                                        <div className={`p-2 py-1.5 flex items-center rounded-xl ${reader.theClass.includes('5') ? "bg-customy w-max" : ""} ${reader.theClass.includes('4') ? "bg-customg w-max" : ""} ${reader.theClass.includes('3') ? "bg-customp w-max" : ""}`}>
                                            <span className='font-semibold text-xs'>{reader.theClass}</span>
                                        </div>
                                    </div>
                                    <span className='text-sm'><b>{reader.booksDone}</b> books read</span>
                                </div>
                            </div>
                            <div className='bg-primary h-[50px]  w-[50px] flex items-center justify-center'>
                                <span className='text-2xl font-bold text-white'>{index}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminLeaderboard