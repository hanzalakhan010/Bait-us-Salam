import React, { useEffect, useState } from 'react';
import './newStudent.css';
import { useParams } from 'react-router-dom';

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

const SingleStudent: React.FC = () => {
    const [student, setStudent] = useState<Student>({
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
    const { id } = useParams();

    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const editStudent = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (student.password != student.r_password) {
            setError('Passwords dont match')
            setMessage('')
        }
        else {
            console.log(student)
            let response = await fetch(`http://localhost:5000/api/v1/student/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        'Content-Type': "Application/json"
                    },
                    body: JSON.stringify(student)

                }
            )
            let data = await response.json()
            if (response.status == 200) {
                setMessage(data.message)
            }
            else {
                setError(data.error)
            }
        }



    }
    const loadStudent = async () => {
        let response = await fetch(`http://localhost:5000/api/v1/student/${id}`)
        let data = await response.json()
        setStudent(data)
    }
    useEffect(() => {
        loadStudent()

    }, [])
    return (
        <div className="form-container">
            <form className="form" onSubmit={editStudent}>
                <h1 className="form-title">New Student</h1>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="first_name" className="form-label">First Name:</label>
                        <input type="text" id="first_name" name="first_name" className="form-input" required
                            value={student.first_name}
                            onChange={(e) => setStudent({ ...student, first_name: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last_name" className="form-label">Last Name:</label>
                        <input type="text" id="last_name" name="last_name" className="form-input" required
                            value={student.last_name}
                            onChange={(e) => setStudent({ ...student, last_name: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cnic" className="form-label">CNIC/Bay Form</label>
                        <input type="text" id="cnic" name="cnic" className="form-input" required
                            value={student.cnic}
                            onChange={(e) => setStudent({ ...student, cnic: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="father_cnic" className="form-label">Father CNIC</label>
                        <input type="text" id="father_cnic" name="father_cnic" className="form-input" required
                            value={student.father_cnic}
                            onChange={(e) => setStudent({ ...student, father_cnic: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age" className="form-label">Age:</label>
                        <input type="number" id="age" name="age" className="form-input"
                            required
                            value={student.age}
                            onChange={(e) => setStudent({ ...student, age: parseInt(e.target.value) })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address" className="form-label">Address:</label>
                        <input type="text" id="address" name="address" className="form-input"
                            required
                            value={student.address}
                            onChange={(e) => setStudent({ ...student, address: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="form-label">Phone:</label>
                        <input type="tel" id="phone" name="phone" className="form-input"
                            value={student.phone}
                            required
                            onChange={(e) => setStudent({ ...student, phone: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" id="email" name="email" className="form-input"
                            required
                            value={student.email}
                            onChange={(e) => setStudent({ ...student, email: e.target.value })} />
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" id="password" name="password" className="form-input"
                            required
                            value={student.password}
                            onChange={(e) => setStudent({ ...student, password: e.target.value })} />
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="r_password" className="form-label">Repeat Password:</label>
                        <input type="password" id="r_password" name="password" className="form-input"
                            required
                            value={student.r_password}
                            onChange={(e) => setStudent({ ...student, r_password: e.target.value })} />
                    </div>
                </div>
                <p className='error'>{error}</p>
                <p className='success'>{message}</p>
                <button className="form-button">Edit</button>
            </form>
        </div>
    );
};

export default SingleStudent;