import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, loading, errors } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(email, password);

        await signup(email, password);
    }

  return (
    <form className='signup' onSubmit={(e) => {handleSubmit(e)}}>
        <h3>Üye Ol</h3>
        <label htmlFor="email">E-mail : </label>
        <input id='email' type="email" onChange={(e) => { setEmail(e.target.value) }} />

        <label htmlFor="password">Şifre : </label>
        <input id='password' type="password" onChange={(e) => { setPassword(e.target.value) }} />

        <button disabled={loading} type='submit'>Kaydet</button>
        {errors && (<div className='error'> {errors} </div>)}
    </form>
  )
}

export default Signup