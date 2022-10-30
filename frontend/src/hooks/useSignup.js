import React, { useState } from "react";
import {useAuthContext} from './useAuthContext';

export const useSignup = () => {

    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {

        setLoading(true);
        setErrors(null);

        const response = await fetch('/api/users/signup', {
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
            dispatch({type: 'LOGIN', payload: json});
            setLoading(false);
        }
    }

    return { signup, loading, errors }

}

