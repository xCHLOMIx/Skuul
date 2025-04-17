import React, { createContext, ReactNode, useEffect, useReducer } from "react";

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
        admin: null
    })

    useEffect(() => {
        const result = localStorage.getItem('admin')
        let admin = null
        if (result) {
            admin = JSON.parse(result)
        }

        if (admin) {
            dispatch({ type: 'SIGNIN', payload: admin })
        }
    }, [])
    console.log('AdminAuthContext state:', state)

    return (
        <AdminAuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AdminAuthContext.Provider>
    )
}