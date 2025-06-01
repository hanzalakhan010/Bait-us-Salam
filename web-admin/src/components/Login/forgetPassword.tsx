import React from 'react';

const ForgetPassword: React.FC = () => {
    return (
        <>
            <h1>Forget Password</h1>
            <input placeholder='Recovery Email' />
            <button>Send OTP</button>
        </>
    );
};

export default ForgetPassword;