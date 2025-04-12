import { AlertContextProvider } from "./context/universal/AlertContext"
import { BookContextProvider } from "./context/universal/BookContext"
import AppLayout from "./layouts/AppLayout"

function App() {
  return (
    <BookContextProvider>
      <AlertContextProvider>
        <AppLayout />
      </AlertContextProvider>
    </BookContextProvider>
  )
}

export default App
