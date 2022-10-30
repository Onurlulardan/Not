import React, { createContext, useReducer } from "react";


export const notContext = createContext();


export const notReducer = (state, action) => {

    switch (action.type) {
        case 'CREATE_NOTE':
            return {
                notes: [action.payload, ...state.notes]
            }
        
        case 'FILL_NOTE':

            return {
                notes: action.payload
            }

        case 'DELETE_NOTE':

            return {
                notes: state.notes.filter((n) => n._id !== action.payload._id)
            }
    
        default:
            return state
    }
}

export const NotContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(notReducer, {
        notes: null
    });

    return (
        <notContext.Provider value={{...state, dispatch}}>
            { children }
        </notContext.Provider>
    )

}