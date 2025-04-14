import React, { createContext, ReactNode, useReducer } from "react";

interface Admin {
    _id: string,
    token: string
}

interface ContextType {
    state: { admin: Admin }
    dispatch: React.Dispatch<any>
}

export const AdminAuthContext = createContext<ContextType | undefined>(undefined)

const adminAuthReducer = (state: { admin: Admin }, action: any) => {
    switch (action.type) {
        case 'SIGNIN':
            return { admin: action.payload }
        case 'SIGNOUT':
            return { admin: null }
        default:
            return state
    }
}

export const AdminAuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(adminAuthReducer, {
        admin: undefined
    })
    return (
        <AdminAuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AdminAuthContext.Provider>
    )
}