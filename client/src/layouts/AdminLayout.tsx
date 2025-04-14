import React from 'react'
import AdminSidebar from '../components/admin/AdminSidebar'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminBooks from '../pages/admin/AdminBooks'
import AdminBorrowers from '../pages/admin/AdminBorrowers'
import AdminLeaderboard from '../pages/admin/AdminLeaderboard'
import { AdminAuthContextProvider } from '../context/admin/AdminAuthContext'

const AdminLayout: React.FC = () => {
    return (
        <>
            <AdminAuthContextProvider>
                <div className='h-full flex'>
                    <AdminSidebar />
                    <div className='bg-alt2 w-full p-10 overflow-y-scroll bar'>
                        <Routes>
                            <Route
                                path='/dashboard'
                                element={<AdminDashboard />}
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
            </AdminAuthContextProvider>
        </>
    )
}

export default AdminLayout