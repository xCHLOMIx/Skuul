import { AdminAuthContextProvider } from "./context/admin/AdminAuthContext"
import { StudentAuthContextProvider } from "./context/student/StudentAuthContext"
import { AlertContextProvider } from "./context/universal/AlertContext"
import { BookContextProvider } from "./context/universal/BookContext"
import UniversalLayout from "./layouts/UniversalLayout"

function App() {
  return (
    <StudentAuthContextProvider>
      <AdminAuthContextProvider>
        <BookContextProvider>
          <AlertContextProvider>
            <UniversalLayout />
          </AlertContextProvider>
        </BookContextProvider>
      </AdminAuthContextProvider>
    </StudentAuthContextProvider>
  )
}

export default App
