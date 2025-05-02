import { useState } from "react"
import { useAlertContext } from "../universal/useAlertContext"
import { useNavigate } from "react-router-dom"

export const useStudentSignup = () => {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigator = useNavigate()
    const { dispatch } = useAlertContext()

    const login = async (email: string, firstName: string, lastName: string, theClass: string, pin: string) => {
        setIsLoading(true)
        const response = await fetch('/api/students/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, firstName: firstName.toUpperCase(), lastName, theClass, pin })
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)

        } else {
            setIsLoading(false)
            setError('')
            navigator('/student/signin')
            dispatch({ type: 'SET_ALERT', payload: 'Successfully signed up!' })
            const timer = setTimeout(() => {
                dispatch({ type: 'REMOVE_ALERT' })
            }, 3000)

            return () => clearTimeout(timer)
        }
    }

    return { login, isLoading, error }
}