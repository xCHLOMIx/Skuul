import React, { createContext, useEffect, useReducer, useState } from "react";

interface Student {
    id: string,
    name: string,
    token: string
}

interface ContextInterface {
    state: { student: Student, isLoading: boolean },
    dispatch: React.Dispatch<any>
}

const studentReducer = (state: { student: Student }, action: any) => {
    switch (action.type) {
        case 'SIGN_IN':
            return { student: action.payload }
        case 'SIGN_OUT':
            return { student: null }
        default:
            return state
    }
}

export const StudentAuthContext = createContext<ContextInterface | undefined>(undefined)

export const StudentAuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(studentReducer, {
        student: null
    })
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const loggedIn = localStorage.getItem('student')
        let student;

        if (loggedIn) student = JSON.parse(loggedIn)
        dispatch({ type: 'SIGN_IN', payload: student })
        setIsLoading(false)
    }, [])
    return (
        <StudentAuthContext.Provider value={{ state: { student: state.student, isLoading }, dispatch }}>
            {children}
        </StudentAuthContext.Provider>
    )
}