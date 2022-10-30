import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";


export const useAuthContext = () => {

    const context = useContext(AuthContext);

    if(!context) {
        throw Error('AuthContext Yüklenmedi!');
    }

    return context
}