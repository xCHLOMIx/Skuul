import React from 'react'
import PrimaryButton from '../../components/universal/PrimaryButton'
import { useFetch } from '../../hooks/universal/useFetch';
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

    return (
        <div className='h-full'>
            <div>
                <h1 className='text-3xl font-bold text-primary'>Leaderboard</h1>
                <span className='text-sm text-alt3'>Leaderboard for the best readers</span>
            </div>
            <div className={`${isLoading ? "flex justify-center items-center h-full" : ""} mt-5`}>
                {!isLoading &&
                    <div className='flex justify-between'>
                        <h2 className='font-bold text-2xl text-primary'>All borrowers</h2>
                        <PrimaryButton type='button' isLoading={false} handleClick={() => { }} icon={<GrPowerReset size={20} />} text='Reset Leaderboard' styles='py-2.5 flex items-center gap-3' />
                    </div>
                }
                {isLoading && <ScaleLoader color='#2D3355AA' height={30} width={4} />}
                <div className="mt-3 grid grid-cols-1 gap-3.5">
                    {data && data
                        .map((reader, index) => {
                            if (index === 0) {
                                return (
                                    <div className='flex flex-col items-center gap-8' key={reader._id}>
                                        <div className='relative w-32 h-32 bg-primary flex justify-center items-center'>
                                            <span className='font-bold text-white text-5xl'>{reader.firstName[0]}</span>
                                            <div className='absolute top-10/12 bg-[#F4D476] px-4 py-2 '>
                                                <span className='font-bold'>{(index + 1).toString().padStart(2, "0")}</span>
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-center'>
                                            <div className='flex items-center gap-2'>
                                                <span className='font-bold text-xl'>{reader.firstName} {reader.lastName}</span>
                                                <div className={`p-2 py-1.5 flex items-center rounded-xl ${reader.theClass.includes('5') ? "bg-customy w-max" : ""} ${reader.theClass.includes('4') ? "bg-customg w-max" : ""} ${reader.theClass.includes('3') ? "bg-customp w-max" : ""}`}>
                                                    <span className='font-semibold text-xs'>{reader.theClass}</span>
                                                </div>
                                            </div>
                                            <span className='text-sm'><b>{reader.booksDone}</b> books read</span>
                                        </div>
                                    </div>
                                )
                            }
                            return (
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
                                    <div className={`${index === 1 ? "bg-[#F3D8FC]" : "bg-[#CBF9CF]"} ${index === 2 ? "bg-[#FBE7B1]" : ""} h-[50px]  w-[50px] flex items-center justify-center`}>
                                        <span className='text-base font-bold'>{(index + 1).toString().padStart(2, "0")}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminLeaderboard