import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { notifyError, notifySuccess } from "../../../notifications"

interface Student {
    name: string,
    father_name: string,
    cnic: string,
    father_cnic: string,
    dob: string,
    address: string,
    phone: string,
    email: string,

}
const EditStudent: React.FC = () => {
    const [editing, setEditing] = useState(false)
    const [student, setStudent] = useState<Student>({
        name: '',
        father_name: '',
        cnic: '',
        father_cnic: '',
        dob: '',
        address: '',
        phone: '',
        email: '',

    })
    const { id } = useParams();
    const navigate = useNavigate();
    const editStudent = async () => {

        let response = await fetch(`http://localhost:5000/api/v1/students/${id}/details/`,
            {
                credentials: 'include',
                method: "PATCH",
                headers: {
                    'Content-Type': "Application/json",
                },
                body: JSON.stringify(student)

            }
        )
        let data = await response.json()
        if (response.status == 200) {
            notifySuccess(data.message)
        }
        else {
            notifyError(data.error)
        }



    }
    const loadStudentDetails = async () => {
        try {
            let response = await fetch(`http://localhost:5000/api/v1/students/${id}/details/`);
            if (response.status === 200) {
                let data = await response.json();
                const formattedDob = data.dob ? new Date(data.dob).toISOString().split('T')[0] : '';

                setStudent({
                    ...data.student,
                    dob: formattedDob, // Set the formatted `dob`
                });
            } else if (response.status === 404) {
                // alert("Student not found");
                navigate('/students')
            } else {
                alert("An error occurred while fetching the student data");
            }
        } catch (error) {
            console.error("Error fetching student:", error);
            alert("Failed to fetch student data");
        }
    };
    useEffect(() => {
        loadStudentDetails()

    }, [])
    return (<>

        <div className="form-container">
            <div className="form">
                <h1 className="form-title">Edit Student</h1>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">First Name:</label>
                        <input type="text" id="name" name="name" className="form-input"
                            disabled={!editing}
                            required
                            value={student.name}
                            onChange={(e) => setStudent({ ...student, name: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="father_name" className="form-label">Father Name:</label>
                        <input type="text" id="father_name" name="father_name" className="form-input"
                            disabled={!editing}
                            required
                            value={student.father_name}
                            onChange={(e) => setStudent({ ...student, father_name: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cnic" className="form-label">CNIC/Bay Form</label>
                        <input type="text" id="cnic" name="cnic" className="form-input" required
                            disabled={!editing}

                            value={student.cnic}
                            onChange={(e) => setStudent({ ...student, cnic: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="father_cnic" className="form-label">Father CNIC</label>
                        <input type="text" id="father_cnic" name="father_cnic" className="form-input" required
                            disabled={!editing}

                            value={student.father_cnic}
                            onChange={(e) => setStudent({ ...student, father_cnic: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob" className="form-label">Date of Birth</label>
                        <input type="date" id="dob" name="dob" className="form-input"
                            disabled={!editing}
                            required
                            value={student.dob}
                            onChange={(e) => setStudent({ ...student, dob: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address" className="form-label">Address:</label>
                        <input type="text" id="address" name="address" className="form-input"
                            disabled={!editing}
                            required
                            value={student.address}
                            onChange={(e) => setStudent({ ...student, address: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="form-label">Phone:</label>
                        <input type="tel" id="phone" name="phone" className="form-input"
                            disabled={!editing}
                            value={student.phone}
                            required
                            onChange={(e) => setStudent({ ...student, phone: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" id="email" name="email" className="form-input"
                            disabled={!editing}
                            required
                            value={student.email}
                            onChange={(e) => setStudent({ ...student, email: e.target.value })} />
                    </div>
                    <div className="form-group">

                        <button className="form-button" onClick={() => {
                            if (editing) {
                                editStudent()
                            }
                            setEditing(!editing)
                        }}>{editing ? "Save" : "Edit"}</button>
                    </div>

                </div>
            </div>
        </div>
    </>)
}
export default EditStudent;