import { useAdminAuthContext } from "./useAdminAuthContext"

export const useAdminSignout = () => {
    const { dispatch } = useAdminAuthContext()

    const logout = () => {
        localStorage.removeItem('admin')
        dispatch({ type: 'SIGNOUT' })
    }

    return { logout }
}