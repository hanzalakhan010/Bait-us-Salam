import React, { useState } from 'react';
import './styles.css'
import ForgetPassword from './forgetPassword';
interface LoginProps {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
const Login: React.FC<LoginProps> = ({ setLogin }) => {
    const [state, setState] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [password, setpassword] = useState('')
    const login = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let response = await fetch('http://localhost:5000/api/v1/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({ email, password })
        })
        let data = await response.json()
        if (response.status == 200) {
            setLogin(true)
        }
        else {
            setError(data.error)
        }
    }
    return (
        <div>
            {state == 'forgetPassword' ? <ForgetPassword /> : (
                <form onSubmit={login}>
                    <h1>Admin Login</h1>
                    <div>
                        <label>Email</label>
                        <input placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>Password</label>
                        <input placeholder='Password' type='password' value={password} onChange={(e) => setpassword(e.target.value)} />
                    </div>
                    <p>{error}</p>
                    <button>Login</button>
                </form>
            )}
        </div>
    );
};

export default Login;