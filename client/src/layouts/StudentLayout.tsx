import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentSidebar from '../components/student/StudentSidebar'
import StudentDashboard from '../pages/student/StudentDashboard'
import StudentLeaderboard from '../pages/student/StudentLeaderboard'
import StudentNotifications from '../pages/student/StudentNotifications'
import StudentBooks from '../pages/student/StudentBooks'
import { useStudentAuthContext } from '../hooks/student/useStudentAuthContext'

const StudentLayout: React.FC = () => {
    const { state: studentState } = useStudentAuthContext()
    console.log(studentState.student.name)
    return (
        <>
            <div className='h-full flex'>
                <StudentSidebar student={studentState.student} />
                <div className='bg-alt2 w-full p-10 overflow-y-scroll bar'>
                    <Routes>
                        <Route
                            path='/dashboard'
                            element={<StudentDashboard student={studentState.student} />}
                        />
                        <Route
                            path='/books'
                            element={<StudentBooks />}
                        />
                        <Route
                            path='/notifications'
                            element={<StudentNotifications student={studentState.student} />}
                        />
                        <Route
                            path='/leaderboard'
                            element={<StudentLeaderboard />}
                        />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default StudentLayout