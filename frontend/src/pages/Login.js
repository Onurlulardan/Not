import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, errors, loading } = useLogin();

    const handleSubmit = async (e) => {

        e.preventDefault();
        await login(email, password);

    }

  return (
    <form className='signup' onSubmit={(e) => {handleSubmit(e)}}>
        <h3>Giriş Yap</h3>
        <label htmlFor="email">E-mail : </label>
        <input id='email' type="email" onChange={(e) => { setEmail(e.target.value) }} />

        <label htmlFor="password">Şifre : </label>
        <input id='password' type="password" onChange={(e) => { setPassword(e.target.value) }} />

        <button disabled={loading} type='submit'>Kaydet</button>
        {errors && (<div className='error'> {errors} </div>)}
    </form>
  )
}

export default Login