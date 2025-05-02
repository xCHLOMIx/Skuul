import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentSidebar from '../components/student/StudentSidebar'
import StudentDashboard from '../pages/student/StudentDashboard'
import StudentLeaderboard from '../pages/student/StudentLeaderboard'
import StudentNotifications from '../pages/student/StudentNotifications'
import StudentBooks from '../pages/student/StudentBooks'

const StudentLayout: React.FC = () => {
    const loggedIn = localStorage.getItem('student')
    let student;

    if(loggedIn) {
        student = JSON.parse(loggedIn)
    }

    return (
        <>
            <div className='h-full flex'>
                <StudentSidebar student={student.student} />
                <div className='bg-alt2 w-full p-10 overflow-y-scroll bar'>
                    <Routes>
                        <Route
                            path='/dashboard'
                            element={<StudentDashboard student={student.student} />}
                        />
                        <Route
                            path='/books'
                            element={<StudentBooks />}
                        />
                        <Route
                            path='/notifications'
                            element={<StudentNotifications />}
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