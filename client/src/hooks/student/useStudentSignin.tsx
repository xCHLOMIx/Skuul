import { useNavigate } from "react-router-dom"
import { useAlertContext } from "../universal/useAlertContext"
import { useState } from "react"
import { useStudentAuthContext } from "./useStudentAuthContext"

export const useStudentSignin = () => {
    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigator = useNavigate()
    const { dispatch } = useAlertContext()
    const { dispatch: studentDispatch } = useStudentAuthContext()

    const login = async (email: string, pin: string) => {
        setIsLoading(true)
        const response = await fetch('/api/students/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, pin })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        } else {
            setIsLoading(false)
            studentDispatch({ type: 'SIGN_IN', payload: json })
            localStorage.setItem('student', JSON.stringify(json))
            navigator('/student/dashboard')
            dispatch({ type: 'SET_ALERT', payload: 'Successfully signed in!' })
            const timer = setTimeout(() => {
                dispatch({ type: 'REMOVE_ALERT' })
            }, 3000)

            return () => clearTimeout(timer)
        }
    }

    return { login, error, isLoading }
}