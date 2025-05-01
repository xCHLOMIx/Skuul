import React, { createContext, useReducer } from "react";

interface Student {
    _id: string,
    token: string
}

interface ContextInterface {
    state: { student: Student },
    dispatch: React.Dispatch<any>
}

const studentReducer = (state: { student: Student }, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return { student: action.payload }
        case 'LOGOUT':
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