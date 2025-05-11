import React from 'react';
import './newStudent.css';



const NewStudent: React.FC = () => {
    return (
        <div className="form-container">
            <form className="form">
                <h1 className="form-title">New Student</h1>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="first_name" className="form-label">First Name:</label>
                        <input type="text" id="first_name" name="first_name" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last_name" className="form-label">Last Name:</label>
                        <input type="text" id="last_name" name="last_name" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cnic" className="form-label">CNIC/Bay Form</label>
                        <input type="text" id="cnic" name="cnic" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="father_cnic" className="form-label">Father CNIC</label>
                        <input type="text" id="father_cnic" name="father_cnic" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age" className="form-label">Age:</label>
                        <input type="number" id="age" name="age" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address" className="form-label">Address:</label>
                        <input type="text" id="address" name="address" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="form-label">Phone:</label>
                        <input type="tel" id="phone" name="phone" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" id="email" name="email" className="form-input" />
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" id="password" name="password" className="form-input" />
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="r_password" className="form-label">Repeat Password:</label>
                        <input type="password" id="r_password" name="password" className="form-input" />
                    </div>
                </div>
                <button type="submit" className="form-button">Submit</button>
            </form>
        </div>
    );
};

export default NewStudent;