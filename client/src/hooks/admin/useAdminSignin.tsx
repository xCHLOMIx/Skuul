import { useState } from "react"
import { useAlertContext } from "../universal/useAlertContext"
import { useAdminAuthContext } from "./useAdminAuthContext"
import { useNavigate } from "react-router-dom"

export const useAdminSignin = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const { dispatch: alert } = useAlertContext()
    const { dispatch: adminDispatch } = useAdminAuthContext()
    const navigator = useNavigate()

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        setError('')
        const admin = { email, password }
        const response = await fetch("/api/admin/signin", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(admin)
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            setIsLoading(false)
            setError('')
            adminDispatch({ type: 'SIGNIN', payload: json })
            alert({ type: 'SET_ALERT', payload: 'Successfully signed in' })
            navigator('/admin/dashboard')
            localStorage.setItem('admin', JSON.stringify(json))
            const timer = setTimeout(() => {
                alert({ type: 'REMOVE_ALERT', payload: 'Successfully signed in' })
            }, 3000)
            return () => clearTimeout(timer)
        }
    }

    return { login, error, isLoading }
}