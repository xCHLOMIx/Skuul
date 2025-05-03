import React, { createContext, ReactNode, useEffect, useReducer, useState } from "react";

interface Admin {
    title: string,
    token: string
}

interface ContextType {
    state: { admin: Admin, isLoading: boolean }
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
        admin: null
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const result = localStorage.getItem('admin')
        let admin = null

        if (result) admin = JSON.parse(result)
        dispatch({ type: 'SIGNIN', payload: admin })
        setIsLoading(false)
    }, [])

    return (
        <AdminAuthContext.Provider value={{ state: { admin: state.admin, isLoading }, dispatch }}>
            {children}
        </AdminAuthContext.Provider>
    )
}