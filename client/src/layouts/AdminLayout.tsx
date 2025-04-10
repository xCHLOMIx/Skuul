import React from 'react'
import AdminSidebar from '../components/admin/AdminSidebar'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminBooks from '../pages/admin/AdminBooks'
import AdminBorrowers from '../pages/admin/AdminBorrowers'
import useAlertContext from '../hooks/useAlertContext'

const AdminLayout: React.FC = () => {
    return (
        <>
        
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
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default AdminLayout