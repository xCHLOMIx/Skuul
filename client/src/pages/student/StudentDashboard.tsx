import React from 'react'
import { useFetch } from '../../hooks/universal/useFetch'

interface Student {
  id: string,
  name: string,
  token: string
}

interface Prop {
  student: Student
}

const StudentDashboard: React.FC<Prop> = ({ student }) => {
  const books = useFetch("/api/books")
  console.log(student.name)
  return (
    <div>
      <div>
        <h1 className='text-3xl font-bold text-primary'>Dashboard</h1>
        <span className='text-sm text-alt3'>Welcome back, <span className='font-bold capitalize'>{student.name.toLowerCase()}</span></span>
      </div>
      <div className='mt-5'>
        <h2 className='font-bold text-2xl text-primary'>Overview</h2>
        <div className='mt-3 grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-3.5'>
          <div className='bg-white border border-alt4 p-[18px] flex justify-between'>
            <div className='flex flex-col justify-between'>
              <h3 className='font-bold text-xl max-xl:text-base max-md:text-sm text-primary'>Books</h3>
              <div className="bg-customg h-8  w-8"></div>
            </div>
            <div className='bg-primary w-20 h-20 flex justify-center items-center'>
              <span className='text-white text-xl'>{(books.data.length).toString().padStart(4, "0")}</span>
            </div>
          </div>
          <div className='bg-white border border-alt4 p-[18px] flex justify-between'>
            <div className='flex flex-col justify-between'>
              <h3 className='font-bold text-xl max-xl:text-base max-md:text-sm text-primary'>Borrowed books</h3>
              <div className="bg-customp h-8  w-8"></div>
            </div>
            <div className='bg-primary w-20 h-20 flex justify-center items-center'>
              <span className='text-white text-xl'>10</span>
            </div>
          </div>
          <div className='bg-white border border-alt4 p-[18px] flex justify-between'>
            <div className='flex flex-col justify-between'>
              <h3 className='font-bold text-xl max-xl:text-base max-md:text-sm text-primary'>Nothing</h3>
              <div className="bg-secondary h-8  w-8"></div>
            </div>
            <div className='bg-primary w-20 h-20 flex justify-center items-center'>
              <span className='text-white text-xl'>00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard