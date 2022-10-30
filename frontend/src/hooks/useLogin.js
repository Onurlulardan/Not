import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";



export const useLogin = () => {

    const [loading, setLoading] = useState(null);
    const [errors, setErrors] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {

        setLoading(true);
        setErrors(null);

        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });

        const json = await response.json();

        if(!response.ok) {
            setLoading(false);
            setErrors(json.Errors)
        }

        if(response.ok) {
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({ type: 'LOGIN', payload: json });
            setLoading(false);
        }
    }

    return { login, loading, errors }

}