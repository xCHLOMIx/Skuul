import React from 'react'

interface Student {
  id: number,
  name: string,
  theClass: string
}

interface Prop {
  student: Student
}

const Student: React.FC<Prop> = ({ student }) => {
  return (
    <div className='bg-white flex justify-between p-3 border items-center cursor-pointer border-alt5'>
      <h4 className='font-semibold text-xl'>{student.name}</h4>
      <div className={`p-2 py-1.5 flex items-center rounded-xl ${student.theClass.includes('5') ? "bg-customy w-max" : ""} ${student.theClass.includes('4') ? "bg-customg w-max" : ""} ${student.theClass.includes('3') ? "bg-customp w-max" : ""}`}>
        <span className='font-semibold text-xs'>{student.theClass}</span>
      </div>
    </div>
  )
}

export default Student