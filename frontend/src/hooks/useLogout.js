import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNoteContext } from "./useNoteContext";

export const useLogout = () => {

    const { dispatch } = useAuthContext();
    const { dispatch: noteDispatch } = useNoteContext();

    const logout = () => {
        localStorage.removeItem('user');
        noteDispatch({type: 'FILL_NOTE', payload: null})
        dispatch({type: 'LOGOUT'});

    }

    return {logout}
}
