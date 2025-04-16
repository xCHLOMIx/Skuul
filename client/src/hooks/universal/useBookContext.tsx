import { useContext } from "react"
import { BookContext } from "../../context/universal/BookContext"

export const useBookContext = () => {
    const context = useContext(BookContext)

    if (!context) {
        throw Error("useBookContext must be used inside the BookContextProvider")
    }

    return context
}