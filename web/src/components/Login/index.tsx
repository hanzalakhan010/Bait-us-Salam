import React from 'react';
import './styles.css'
interface LoginProps {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
const Login: React.FC<LoginProps> = ({ setLogin }) => {
    const [forgotPassword, setForgotPassword] = React.useState(false);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle login logic here
    };

    return (
        <div>
        </div>
    );
};

export default Login;