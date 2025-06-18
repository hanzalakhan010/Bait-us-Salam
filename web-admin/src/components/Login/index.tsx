import React, { useState } from 'react';
import './styles.css'
import ForgetPassword from './forgetPassword';
import { notifyError, notifySuccess } from '../../notifications';
interface LoginProps {
    setAuth: React.Dispatch<React.SetStateAction<"authenticated" | "loading" | "unauthenticated">>;
}
const Login: React.FC<LoginProps> = ({ setAuth }) => {
    const [forgotPassword, setForgotPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const login = async () => {
        try {

            let response = await fetch('http://localhost:5000/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password, role: 'admin' })
            })
            let data = await response.json()
            if (response.status == 201) {
                setAuth('authenticated')
                notifySuccess("Login Successfull")
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
            {forgotPassword ? <ForgetPassword /> : (
                <>
                    <h1>Admin Login</h1>
                    <label>Email</label>
                    <input placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input placeholder='Password' type='password' value={password} onChange={(e) => setpassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key == 'Enter') { login() }
                        }} />
                    <button onClick={login}>Login</button>
                </>
            )}
            <button onClick={() => setForgotPassword(!forgotPassword)}>{forgotPassword ? "Cancel" : 'Forgot password'} </button>
        </div>
    );
};

export default Login;