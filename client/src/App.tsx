import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminLayout from "./layouts/AdminLayout"

function App() {

  return (
    <div className="h-screen">
      <BrowserRouter>
        <Routes>
          <Route
            path="/admin/*"
            element={<AdminLayout />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
