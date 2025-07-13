import React from 'react'
import PrimaryButton from '../../components/universal/PrimaryButton'
import { useFetch } from '../../hooks/universal/useFetch';
import { GrPowerReset } from 'react-icons/gr';
import { ScaleLoader } from 'react-spinners';
import FirstReader from '../../components/admin/FirstReader';
import LeaderboardItem from '../../components/admin/LeaderboardItem';

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

const StudentLeaderboard: React.FC = () => {
    const { data, isLoading }: { data: Reader[], isLoading: boolean } = useFetch('/api/books/readers')

    return (
        <div className='h-full'>
            <div>
                <h1 className='text-3xl max-md:text-2xl max-sm:text-xl font-bold text-primary'>Leaderboard</h1>
                <span className='text-sm max-md:text-xs max-sm:text-[10] text-alt3'>Leaderboard for the best readers</span>
            </div>
            <div className={`${isLoading ? "flex justify-center items-center h-full" : ""} mt-5`}>
                {!isLoading &&
                    <div className='flex justify-between'>
                        <h2 className='font-bold text-2xl max-md:text-xl max-sm:text-lg text-primary'>All readers</h2>
                        <PrimaryButton type='button' isLoading={false} handleClick={() => { }} icon={<GrPowerReset size={20} />} text='Reset Leaderboard' styles='py-2.5 flex items-center gap-3' />
                    </div>
                }
                {isLoading && <ScaleLoader color='#2D3355AA' height={30} width={4} />}
                <div className="mt-3 grid grid-cols-1 gap-3.5">
                    {data && data
                        .map((reader, index) => {
                            if (index === 0) {
                                return (
                                    <FirstReader reader={reader} index={index} key={reader._id} />
                                )
                            }
                            return (
                                <LeaderboardItem index={index} reader={reader} key={reader._id} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default StudentLeaderboard