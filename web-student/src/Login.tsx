import React, { useState } from 'react';
import { notifyError, notifySuccess } from './notification';
import { host } from './constants';

interface loginProp {
    setAuthState: React.Dispatch<React.SetStateAction<'authenticated' | 'loading' | 'unauthenticated'>>;
}
const Login: React.FC<loginProp> = ({ setAuthState }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const login = async () => {
        try {

            let response = await fetch(`${host}/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: credentials.email, password: credentials.password,
                    role: 'student'
                })
            })
            let data = await response.json()
            if (response.status == 201) {
                setAuthState('authenticated')
                notifySuccess(data.message)
                localStorage.setItem('student', JSON.stringify(data.student))
            }
            else {
                notifyError(data.error)
            }
        }
        catch {
            notifyError('Error connecting to server')
        }

    }
    return (
        <div id='loginDiv'>
            <h1>BWT Tech Park </h1>
            <h1>Student Login</h1>
            <input placeholder='Email' type='email' value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
            <input placeholder='Password' type='password' value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
            <button onClick={login}>Login</button>
        </div>
    );
};

export default Login;