import React, { useState } from 'react'
import Student from '../components/universal/Student'
import PrimaryButton from '../components/universal/PrimaryButton'

interface StudentInterface {
    id: number,
    name: string,
    theClass: string
}

const students: StudentInterface[] = [
    { id: 1, name: "Gutabarwa Chlomi", theClass: "L5 SOD" },
    { id: 2, name: "Mugisha Arsene Wenger", theClass: "L5 SOD" },
    { id: 3, name: "Habiyambere Isonga Hilton", theClass: "L3 SOD" },
    { id: 4, name: "Birimwimana Jireh Faith", theClass: "L5 SOD" },
]

const BorrowBookPage: React.FC = () => {
    const [search, setSearch] = useState<string>('');
    const [theStudent, setTheStudent] = useState<StudentInterface>();

    const results: StudentInterface[] = students.filter((student) => student.name.toLowerCase().includes(search.toLowerCase()));
    console.log(results)
    return (
        <div className='bg-alt2 h-screen flex items-start flex-col gap-10 px-80 justify-center'>
            {
                !search &&
                <div className='w-full'>
                    <h1 className='font-bold text-6xl'>Hello 👋</h1>
                    <p className='text-alt3'>Welcome to WMHS Library</p>
                </div>
            }
            <div className='flex flex-col gap-2 w-full'>
                <div className='flex gap-2'>
                    <h3>Who are you 🤔?</h3>
                    <p className='text-primary font-bold'>{theStudent && theStudent.name + " ? Click Next"}</p>
                </div>
                <form action="" className='w-full'>
                    <input
                        type="text"
                        placeholder='Search by student name...'
                        onChange={(e) => setSearch(e.target.value)}
                        className='bg-white p-4 border-8 outline-0 border-black/10 w-full'
                    />
                </form>
                <div className={`${results && search ? "" : "hidden"} bar w-full end bg-white flex overflow-y-scroll max-h-96 flex-col justify-between p-3 gap-2 border border-alt5`}>
                    {results && search &&
                        <div className='font-bold'>Results for "{search}"</div>
                    }
                    {results && search && results.map((student) => (
                        <div onClick={() => setTheStudent(student)} key={student.id}>
                            <Student student={student} />
                        </div>
                    ))}
                </div>
                {theStudent &&
                    <div className='w-full flex justify-end'>
                        <PrimaryButton text='Next' styles='px-10 flex' />
                    </div>
                }
            </div>
        </div>
    )
}

export default BorrowBookPage