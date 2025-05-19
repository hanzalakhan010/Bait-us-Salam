import React, { useState } from 'react';
import './newStudent.css';

interface Student {
    name: string,
    father_name: string,
    cnic: string,
    father_cnic: string,
    dob: string,
    address: string,
    phone: string,
    email: string,
    password: string
    r_password: string
}

const NewStudent: React.FC = () => {
    const [newStudent, setNewStudent] = useState<Student>({
        name: '',
        father_name: '',
        cnic: '',
        father_cnic: '',
        dob: "",
        address: '',
        phone: '',
        email: '',
        password: '',
        r_password: ''

    })
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const createStudent = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (newStudent.password != newStudent.r_password) {
            setError('Passwords dont match')
        }
        if (isNaN(new Date(newStudent.dob).getTime())) {
            setError('Date of birth must be in correct format')
        }
        else {
            let response = await fetch('http://localhost:5000/api/v1/students/',
                {
                    method: "POST",
                    headers: {
                        'Content-Type': "Application/json"
                    },
                    body: JSON.stringify(newStudent)

                }
            )
            let data = await response.json()
            if (response.status == 201) {
                setError('')
                setMessage(data.message)
            }
            else {
                setMessage('')
                setError(data.error)
            }
        }



    }
    return (

        <div id = 'student'className="form-container">
            <form className="form" onSubmit={createStudent}>
                <h1 className="form-title">New Student</h1>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Student Name:</label>
                        <input type="text" id="name" name="name" className="form-input" required
                            value={newStudent.name}
                            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="father_name" className="form-label">Father Name:</label>
                        <input type="text" id="father_name" name="father_name" className="form-input" required
                            value={newStudent.father_name}
                            onChange={(e) => setNewStudent({ ...newStudent, father_name: e.target.value })} />
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
                        <label htmlFor="dob" className="form-label">Date of Birth(DD/MM/YYYY):</label>
                        <input type="text" id="dob" name="dob" className="form-input"
                            required
                            value={newStudent.dob}
                            onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value })} />
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
                <p className='success'>{message}</p>
                <button className="form-button">Submit</button>
            </form>
        </div>
    );
};

export default NewStudent;