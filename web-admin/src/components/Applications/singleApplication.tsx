import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css'
// {
//     "application": {
//       "course_name": "next js",
//       "created_at": "Mon, 02 Jun 2025 19:12:09 GMT",
//       "exam_status": "pending",
//       "id": 28,
//       "interview_status": "pending",
//       "requirements": {
//         "files": [
//           [
//             "file_1",
//             "voter.csv"
//           ],
//           [
//             "file_2",
//             "1674082654917.jpeg"
//           ]
//         ]
//       },
//       "status": "pending",
//       "student_id": 3,
//       "submitter": {
//         "docs_folder": "336a53ec-42d1-4bde-8847-224f88e13c3e",
//         "email": "thisishamzakhan@outlook.com",
//         "id": 3,
//         "name": "Hamza"
//       }
//     }
//   }
interface Submitter {
    docs_folder: string,
    email: string,
    id: number,
    name: string
}
interface Requirement {
    [key: string]: string;
}
interface Requirements {
    files: string[][],
    form: Requirement[]

}

interface Application {
    id: number,
    course_name: string,
    student_id?: number,
    applicant_id?: number,
    created_at: string,
    exam_status: string,
    interview_status: string,
    status: string,
    submitter_id: number
    submitter: Submitter,
    requirements: Requirements
}
const SingleApplication: React.FC = () => {
    const { id } = useParams();
    const [application, setApplication] = useState<Application>()
    const loadApplication = async () => {
        let response = await fetch(`http://localhost:5000/api/v1/applications/${id}`, {
            headers: {
                "Token": localStorage.getItem('token') || '',
                "Email": localStorage.getItem('email') || ''
            }
        })
        let data = await response.json()
        // console.log(data)
        if (response.status == 200) {
            setApplication(data.application)
        }
    }
    useEffect(() => { loadApplication() }, [])
    return (
        <div id='ApplicationView'>
            <h1>Application for:  `{application?.course_name}` </h1>
            <div>

                <p>Submitter Type: {application?.applicant_id ? "Applicant" : "Student"}</p>
                <p><i>Submitter ID: </i>{application?.student_id || application?.applicant_id}</p>
                <p><i>Submitter: </i>{application?.submitter.name}</p>
                <p><i>Date: </i>{application?.created_at}</p>
                <p><i>Course:</i> {application?.course_name}</p>
            </div>
            <div>
                {application?.requirements.files.map((file) => <img></img>)}
            </div>
            <form>
                <h4>Interview Status</h4>
                <select>
                    <option value='Scheduled'>Scheduled</option>
                    <option value='Attempted'>Attempted</option>
                    <option value='Missed'>Missed</option>
                    <option value='Result Published'>Result Published</option>
                </select>
                <h4>Exam Status</h4>
                <select>
                    <option value='Scheduled'>Scheduled</option>
                    <option value='Attempted'>Attempted</option>
                    <option value='Missed'>Missed</option>
                    <option value='Grading'>Grading in Progress</option>
                    <option value='Graded'>Graded</option>
                    <option value='Result Published'>Result Published</option>
                </select>
            </form>
        </div>
    );
};

export default SingleApplication;