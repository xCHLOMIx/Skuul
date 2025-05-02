import { useAlertContext } from "../universal/useAlertContext"
import { useAdminAuthContext } from "./useAdminAuthContext"

export const useAdminSignout = () => {
    const { dispatch } = useAdminAuthContext()
    const { dispatch: alertDispatch } = useAlertContext()

    const logout = () => {
        localStorage.removeItem('admin')
        dispatch({ type: 'SIGNOUT' })
        alertDispatch({ type: 'SET_ALERT', payload: "Successfully signed out!" })
    }

    return { logout }
}