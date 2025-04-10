import { AlertContextProvider } from "./context/AlertContext"
import AppLayout from "./layouts/AppLayout"

function App() {
  return (
    <AlertContextProvider>
      <AppLayout />
    </AlertContextProvider>
  )
}

export default App
