import React, { createContext, useEffect, useReducer } from "react";

interface Student {
    firstName: string,
    token: string
}

interface ContextInterface {
    state: { student: Student },
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

    useEffect(() => {
        const loggedIn = localStorage.getItem('student')
        let admin;

        if (loggedIn) admin = JSON.parse(loggedIn)
        dispatch({ type: 'SIGN_IN', payload: loggedIn })
    }, [])
    return (
        <StudentAuthContext.Provider value={{ state, dispatch }}>
            {children}
        </StudentAuthContext.Provider>
    )
}