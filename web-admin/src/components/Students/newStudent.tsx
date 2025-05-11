import React, { useState } from 'react';
import './newStudent.css';

interface Student {
    first_name: string,
    last_name: string,
    cnic: string,
    father_cnic: string,
    age: number,
    address: string,
    phone: string,
    email: string,
    password: string
    r_password: string
}

const NewStudent: React.FC = () => {
    const [newStudent, setNewStudent] = useState<Student>({
        first_name: '',
        last_name: '',
        cnic: '',
        father_cnic: '',
        age: 0,
        address: '',
        phone: '',
        email: '',
        password: '',
        r_password: ''

    })
    const [error, setError] = useState('')
    const createStudent = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (newStudent.password != newStudent.r_password) {
            setError('Passwords dont match')
        }



    }
    return (
        <div className="form-container">
            <form className="form" onSubmit={createStudent}>
                <h1 className="form-title">New Student</h1>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="first_name" className="form-label">First Name:</label>
                        <input type="text" id="first_name" name="first_name" className="form-input" required
                            value={newStudent.first_name}
                            onChange={(e) => setNewStudent({ ...newStudent, first_name: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last_name" className="form-label">Last Name:</label>
                        <input type="text" id="last_name" name="last_name" className="form-input" required
                            value={newStudent.last_name}
                            onChange={(e) => setNewStudent({ ...newStudent, last_name: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cnic" className="form-label">CNIC/Bay Form</label>
                        <input type="text" id="cnic" name="cnic" className="form-input" required
                            value={newStudent.cnic}
                            onChange={(e) => setNewStudent({ ...newStudent, cnic: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="father_cnic" className="form-label">Father CNIC</label>
                        <input type="text" id="father_cnic" name="father_cnic" className="form-input" required
                            value={newStudent.father_cnic}
                            onChange={(e) => setNewStudent({ ...newStudent, father_cnic: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age" className="form-label">Age:</label>
                        <input type="number" id="age" name="age" className="form-input"
                            required
                            value={newStudent.age}
                            onChange={(e) => setNewStudent({ ...newStudent, age: parseInt(e.target.value) })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address" className="form-label">Address:</label>
                        <input type="text" id="address" name="address" className="form-input"
                            required
                            value={newStudent.address}
                            onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="form-label">Phone:</label>
                        <input type="tel" id="phone" name="phone" className="form-input"
                            value={newStudent.phone}
                            required
                            onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" id="email" name="email" className="form-input"
                            required
                            value={newStudent.email}
                            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} />
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" id="password" name="password" className="form-input"
                            required
                            value={newStudent.password}
                            onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })} />
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="r_password" className="form-label">Repeat Password:</label>
                        <input type="password" id="r_password" name="password" className="form-input"
                            required
                            value={newStudent.r_password}
                            onChange={(e) => setNewStudent({ ...newStudent, r_password: e.target.value })} />
                    </div>
                </div>
                <p className='error'>{error}</p>
                <button className="form-button">Submit</button>
            </form>
        </div>
    );
};

export default NewStudent;