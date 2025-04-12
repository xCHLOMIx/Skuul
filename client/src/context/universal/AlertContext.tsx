import { createContext, ReactNode, useReducer } from "react";

interface AlertContextType {
    state: { alert: string | null },
    dispatch: React.Dispatch<any>
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined)

const alertReducer = (state: { alert: string }, action: any) => {
    switch (action.type) {
        case 'GET_ALERT':
            return state
        case 'SET_ALERT':
            return { alert: action.payload }
        case 'REMOVE_ALERT':
            return { alert: null }
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