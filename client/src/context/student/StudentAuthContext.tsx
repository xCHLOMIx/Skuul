import React, { createContext, useReducer } from "react";

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

    return (
        <StudentAuthContext.Provider value={{ state, dispatch }}>
            {children}
        </StudentAuthContext.Provider>
    )
}