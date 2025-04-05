import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminLayout from "./layouts/AdminLayout"
import AdminSignin from "./pages/admin/AdminSignin"
import StudentSignin from "./pages/student/StudentSignin"

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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
