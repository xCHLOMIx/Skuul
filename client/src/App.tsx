import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminLayout from "./layouts/AdminLayout"
import AdminSignin from "./pages/admin/AdminSignin"
import StudentSignin from "./pages/student/StudentSignin"
import StudentSignup from "./pages/student/StudentSignup"

function App() {

  return (
    <div className="h-screen">
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
    </div>
  )
}

export default App
