import { AdminAuthContextProvider } from "./context/admin/AdminAuthContext"
import { AlertContextProvider } from "./context/universal/AlertContext"
import { BookContextProvider } from "./context/universal/BookContext"
import AppLayout from "./layouts/AppLayout"

function App() {
  return (
    <AdminAuthContextProvider>
      <BookContextProvider>
        <AlertContextProvider>
          <AppLayout />
        </AlertContextProvider>
      </BookContextProvider>
    </AdminAuthContextProvider>
  )
}

export default App
