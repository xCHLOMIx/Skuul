import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminLayout from "../layouts/AdminLayout"
import AdminSignin from "../pages/admin/AdminSignin"
import StudentSignin from "../pages/student/StudentSignin"
import StudentSignup from "../pages/student/StudentSignup"
import { AlertContextProvider } from "../context/AlertContext"

function AppLayout() {
    const text = "Sign up successful!"
    return (
        <div className="h-screen">
            <div className={`${text ? "translate-y-0" : "-translate-y-10"} transition duration-200 bg-green-100 absolute w-full p-2 text-sm text-center font-bold text-green-500`}>
                <h4>{text}</h4>
            </div>
            <AlertContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/admin/*"
                            element={<AdminLayout />}
                        />
                        <Route
                            path='/admin/signin'
                            element={<AdminSignin />}
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
            </AlertContextProvider>
        </div>
    )
}

export default AppLayout
