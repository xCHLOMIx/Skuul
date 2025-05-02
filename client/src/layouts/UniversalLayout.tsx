import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AdminLayout from "./AdminLayout"
import AdminSignin from "../pages/admin/AdminSignin"
import StudentSignin from "../pages/student/StudentSignin"
import StudentSignup from "../pages/student/StudentSignup"
import { useAlertContext } from "../hooks/universal/useAlertContext"
import { useAdminAuthContext } from "../hooks/admin/useAdminAuthContext"
import StudentLayout from "./StudentLayout"
import { useStudentAuthContext } from "../hooks/student/useStudentAuthContext"

function UniversalLayout() {
    const { state } = useAlertContext()
    const { state: adminState } = useAdminAuthContext()
    const { state: studentState } = useStudentAuthContext()

    return (
        <>
            {!adminState.isLoading &&
                <div className="h-screen">
                    <div className={`${state.alert ? "top-0" : "-top-10"} transition-all duration-500 ease-in-out border border-green-200 bg-green-100 z-50 absolute w-full h-10 flex items-center justify-center text-sm text-center font-bold text-green-500`}>
                        <h4>{state.alert}</h4>
                    </div>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/admin/*"
                                element={adminState.admin ? <AdminLayout /> : <Navigate to="/admin/signin" />}
                            />
                            <Route
                                path="/student/*"
                                element={studentState.student ? <StudentLayout /> : <Navigate to="/student/signin" />}
                            />
                            <Route
                                path='/admin/signin'
                                element={!adminState.admin ? <AdminSignin /> : <Navigate to="/admin/dashboard" />}
                            />
                            <Route
                                path='/student/signin'
                                element={<StudentSignin />}
                            />
                            <Route
                                path='/student/signup'
                                element={<StudentSignup />}
                            />
                        </Routes>
                    </BrowserRouter>
                </div>
            }
        </>
    )
}

export default UniversalLayout
