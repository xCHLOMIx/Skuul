import { useAlertContext } from "../universal/useAlertContext"
import { useStudentAuthContext } from "./useStudentAuthContext"

export const useStudentSignout = () => {
    const { dispatch } = useStudentAuthContext()
    const {dispatch: alertDispatch} = useAlertContext()

    const signOut = async () => {
        dispatch({ type: 'SIGN_OUT' })
        alertDispatch({ type: 'SET_ALERT', payload: "Successfully signed out!" })
        localStorage.removeItem('student')
    }

    return { signOut }
}