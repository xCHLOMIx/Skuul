import React, { createContext, ReactNode, useReducer } from "react";

interface Book {
    _id: string,
    title: string,
    author: string,
    quantity: number,
    status: string,
    createdAt: Date,
    updatedAt: Date
}

interface BookContextType {
    state : { books : Book[]},
    dispatch : React.Dispatch<any>
}

export const BookContext = createContext<BookContextType | undefined>(undefined)

const bookReducer = (state: { books: Book[] }, action: any) => {
    switch (action) {
        case 'SET_BOOKS':
            return { books: action.payload }
        case 'ADD_BOOK':
            return { books: [action.payload, ...state.books] }
        default:
            return state
    }
}

export const BookContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(bookReducer, {
        books: []
    })

    return (
        <BookContext.Provider value={{ state, dispatch }}>
            {children}
        </BookContext.Provider>
    )
}