import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminLayout from "./layouts/AdminLayout"
import AdminLogin from "./pages/admin/AdminLogin"

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
            path='/admin/login'
            element={<AdminLogin />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
