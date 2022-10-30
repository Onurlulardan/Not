import React, { useContext } from "react";
import { notContext } from "../context/noteContext";


export const useNoteContext = () => {
    const context = useContext(notContext);

    if(!context) {
        throw new Error('useNoteContext Yüklenmedi!');
    }

    return context
}

