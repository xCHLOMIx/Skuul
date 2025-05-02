import React from 'react'
import AdminSidebar from '../components/admin/AdminSidebar'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminBooks from '../pages/admin/AdminBooks'
import AdminBorrowers from '../pages/admin/AdminBorrowers'
import AdminLeaderboard from '../pages/admin/AdminLeaderboard'

const AdminLayout: React.FC = () => {
    const loggedIn = localStorage.getItem('admin')
    let admin;

    if (loggedIn) {
        admin = JSON.parse(loggedIn)
    }

    return (
        <>
            <div className='h-full flex'>
                <AdminSidebar admin={admin.admin} />
                <div className='bg-alt2 w-full p-10 overflow-y-scroll bar'>
                    <Routes>
                        <Route
                            path='/dashboard'
                            element={<AdminDashboard admin={admin.admin} />}
                        />
                        <Route
                            path='/books'
                            element={<AdminBooks />}
                        />
                        <Route
                            path='/borrowers'
                            element={<AdminBorrowers />}
                        />
                        <Route
                            path='/leaderboard'
                            element={<AdminLeaderboard />}
                        />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default AdminLayout