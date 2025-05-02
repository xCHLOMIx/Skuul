import { useAlertContext } from "../universal/useAlertContext"
import { useStudentAuthContext } from "./useStudentAuthContext"

export const useStudentSignout = () => {
    const { dispatch } = useStudentAuthContext()
    const { dispatch: alertDispatch } = useAlertContext()

    const signOut = async () => {
        localStorage.removeItem('student')
        dispatch({ type: 'SIGN_OUT' })
        alertDispatch({ type: 'SET_ALERT', payload: "Successfully signed out!" })

        const timer = setTimeout(() => {
            alertDispatch({ type: 'REMOVE_ALERT' })
        }, 3000)

        return () => clearTimeout(timer)
    }

    return { signOut }
}