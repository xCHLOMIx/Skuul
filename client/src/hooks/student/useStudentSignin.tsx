import { useNavigate } from "react-router-dom"
import { useAlertContext } from "../universal/useAlertContext"
import { useState } from "react"

export const useStudentSignin = () => {
    const [error, setError] = useState<string>('')
    const navigator = useNavigate()
    const { dispatch } = useAlertContext()

    const login = async (email: string, pin: string) => {
        const response = await fetch('/api/students/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, pin })
        })
        const json = await response.json()
        console.log(json)
        if (!response.ok) {
            setError(json.error)
        } else {
            navigator('/student/dashboard')

            dispatch({ type: 'SET_ALERT', payload: 'Successfully signed in!' })
            const timer = setTimeout(() => {
                dispatch({ type: 'REMOVE_ALERT' })
            }, 3000)

            return () => clearTimeout(timer)
        }
    }

    return { login, error }
}