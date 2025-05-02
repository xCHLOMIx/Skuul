import { AdminAuthContextProvider } from "./context/admin/AdminAuthContext"
import { StudentAuthContextProvider } from "./context/student/StudentAuthContext"
import { AlertContextProvider } from "./context/universal/AlertContext"
import { BookContextProvider } from "./context/universal/BookContext"
import UniversalLayout from "./layouts/UniversalLayout"

function App() {
  return (
    <AdminAuthContextProvider>
      <StudentAuthContextProvider>
        <BookContextProvider>
          <AlertContextProvider>
            <UniversalLayout />
          </AlertContextProvider>
        </BookContextProvider>
      </StudentAuthContextProvider>
    </AdminAuthContextProvider>
  )
}

export default App
