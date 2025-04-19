import { AdminAuthContextProvider } from "./context/admin/AdminAuthContext"
import { AlertContextProvider } from "./context/universal/AlertContext"
import { BookContextProvider } from "./context/universal/BookContext"
import UniversalLayout from "./layouts/UniversalLayout"

function App() {
  return (
    <AdminAuthContextProvider>
      <BookContextProvider>
        <AlertContextProvider>
          <UniversalLayout />
        </AlertContextProvider>
      </BookContextProvider>
    </AdminAuthContextProvider>
  )
}

export default App
