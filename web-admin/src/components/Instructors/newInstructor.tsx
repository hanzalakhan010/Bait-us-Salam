import React, { useState } from 'react';
import './newInstructor.css';


interface Instructor {
    id: number,
    instructor_name: string,
    phone: string
    email: string,
    bio: string,
}


const NewInstructor: React.FC = () => {
    const [newInstructor, setNewInstructor] = useState<Instructor>({
        id: 0,
        instructor_name: '',
        phone: '',
        email: '',
        bio: ''
    })
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const addInstructor = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()


        let response = await fetch('http://localhost:5000/api/v1/instructors/',
            {
                method: "POST",
                headers: {
                    'Content-Type': "Application/json"
                },
                body: JSON.stringify(newInstructor)

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
    return (
        <div id='course' className="form-container">
            <form className="form" onSubmit={addInstructor}>
                <h1 className="form-title">New Instructor</h1>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="instructor_name" className="form-label">Instructor Name:</label>
                        <input type="text" id="instructor_name" name="instructor_name" className="form-input" required
                            value={newInstructor.instructor_name}
                            onChange={(e) => setNewInstructor({ ...newInstructor, instructor_name: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="instructor_phone" className="form-label">Instructor Email:</label>
                        <input type="text" id="instructor_phone" name="instructor_email" className="form-input" required
                            value={newInstructor.email}
                            onChange={(e) => setNewInstructor({ ...newInstructor, email: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="instructor_phone" className="form-label">Instructor Phone:</label>
                        <input type="text" id="instructor_phone" name="instructor_phone" className="form-input" required
                            value={newInstructor.phone}
                            onChange={(e) => setNewInstructor({ ...newInstructor, phone: e.target.value })} />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="bio" className="form-label">Instructor Bio:</label>
                        <textarea id="bio" name="bio" className="form-input"
                            value={newInstructor.bio}
                            onChange={(e) => setNewInstructor({ ...newInstructor, bio: e.target.value })} />
                    </div>

                </div>
                <p className='error'>{error}</p>
                <p className='success'>{message}</p>
                <button className="form-button">Add</button>
            </form>
        </div>
    );
};

export default NewInstructor;