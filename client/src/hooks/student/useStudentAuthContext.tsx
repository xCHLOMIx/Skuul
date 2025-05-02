import { useContext } from "react"
import { StudentAuthContext } from "../../context/student/StudentAuthContext"

export const useStudentAuthContext = () => {
    const context = useContext(StudentAuthContext)

    if (!context) {
        throw Error("useStudentAuthContext must be used inside the StudentAuthContextProvider")
    }

    return context
}