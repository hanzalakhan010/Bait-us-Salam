import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles.css'
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
interface Status {
    at: Date,
    by: string,
    status: string
}
interface Application {
    id: number,
    course_name: string,
    student_id?: number,
    applicant_id?: number,
    created_at: string,
    exam_status: Status[],
    interview_status: Status[],
    status: string,
    submitted_by: string,
    submitter: Submitter,
    requirements: Requirements
}
const SingleApplication: React.FC = () => {
    const { id } = useParams();
    const [application, setApplication] = useState<Application>()
    const [examStatus, setExamStatus] = useState('')
    const [interviewStatus, setInterviewStatus] = useState('')
    const loadApplication = async () => {
        try {
            let response = await fetch(`http://localhost:5000/api/v1/applications/${id}`, {
                credentials: 'include'
            })
            let data = await response.json()
            if (response.status == 200) {
                if (data.application.requirements) {
                    data.application.requirements = JSON.parse(data.application.requirements)
                }
                setApplication(data.application)
                setExamStatus(data.application?.exam_status[data.application?.exam_status.length - 1].status)
                setInterviewStatus(data.application?.interview_status[data.application?.interview_status.length - 1].status)
            }
        }
        catch {
            alert('Error connecting to server')
        }
    }
    useEffect(() => {
        loadApplication()
        console.log(application?.requirements.files)
    }, [])
    return (
        <div id='ApplicationView'>
            <h1>Application for:  `{application?.course_name}` </h1>
            <section>
                <p>Submitter Type: {application?.submitted_by.toLocaleUpperCase()}</p>
                <p><i>Submitter ID: </i>{application?.student_id || application?.applicant_id}</p>
                <p><i>Submitter: </i>{application?.submitter.name}: <Link to={`/${application?.submitted_by}s/${application?.student_id || application?.applicant_id}`}>Link</Link></p>
                <p><i>Date: </i>{application?.created_at ? new Date(application.created_at).toLocaleDateString() : 'N/A'}</p>
                <p><i>Course:</i> {application?.course_name}</p>
            </section>
            <section id='filesDiv'>
                <h3>Files</h3>
                <div id='files'>
                    {application?.requirements?.files.map((file, index) =>
                        <div>
                            <p>{file[0]}</p>
                            <img key={index} src={`http://localhost:5000/uploads/${application?.submitter.docs_folder}/${file[1]}`} />
                        </div>

                    )}
                </div>
            </section>
            <form>
                <>
                    <div>

                        <h4>Exam Status</h4>
                        <select value={examStatus}
                            onChange={(e) => { setExamStatus(e.target.value) }}
                        >
                            <option value='Pending'>Pending</option>
                            <option value='Scheduled'>Scheduled</option>
                            <option value='Attempted'>Attempted</option>
                            <option value='Missed'>Missed</option>
                            <option value='Grading'>Grading in Progress</option>
                            <option value='Graded'>Graded</option>
                            <option value='Result Published'>Result Published</option>
                        </select>
                        {examStatus == 'Scheduled' ? (<input type='date' />) : null}
                    </div>
                    <div>

                        <h4>Interview Status</h4>
                        <select value={interviewStatus}
                            onChange={(e) => {
                                setInterviewStatus(e.target.value)
                            }}>
                            <option value='Pending'>Pending</option>
                            <option value='Scheduled'>Scheduled</option>
                            <option value='Attempted'>Attempted</option>
                            <option value='Missed'>Missed</option>
                            <option value='Result Published'>Result Published</option>
                        </select>
                        {interviewStatus == 'Scheduled' ? (<input type='date' />) : null}
                    </div>
                </>
            </form>
            <section>
                <h4>Comments</h4>
                <textarea cols={60}rows={5} />
                <br />
                <button>Save</button>
            </section>
        </div>
    );
};

export default SingleApplication;