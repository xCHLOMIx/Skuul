import { createContext, ReactNode, useReducer } from "react";

export const AlertContext = createContext({})

const alertReducer = (state: { alert: string }, action: any) => {
    switch (action.type) {
        case 'GET_ALERT':
            return state
        case 'SET_ALERT':
            return { alert: action.payload }
        default:
            return state
    }
}

export const AlertContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(alertReducer, {
        alert: null
    })

    return (
        <AlertContext.Provider value={{ state, dispatch }}>
            {children}
        </AlertContext.Provider>
    )
}