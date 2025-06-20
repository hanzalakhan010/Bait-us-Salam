import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { host } from '../../constants';
interface Student {
    id: number,
    email: string,
}
interface Submitter {
    docs_folder: string,
    email: string,
    id: number,
    name: string
}
interface Requirements {
    files: string[][],
    form: string[][]

}

interface Comment {
    text: string,
    author: string,
    timestamp: Date,
}
interface Application {
    id: number,
    course_name: string,
    student_id?: number,
    applicant_id?: number,
    created_at: string,
    submitted_by: string,
    submitter: Submitter,
    requirements: Requirements
    comments: Comment[]
}
const ApplicationView: React.FC = () => {
    const student: Student = localStorage.getItem('student') ? JSON.parse(localStorage.getItem('student') as string) : null;
    const { application_id } = useParams()
    const [application, setApplication] = useState<Application>()
    const loadApplication = async () => {
        let response = await fetch(`${host}/api/v1/students/${student.id}/applications/${application_id}`, { credentials: 'include' })
        let data = await response.json()
        if (response.status == 200) {
            if (data.application.requirements) {
                data.application.requirements = JSON.parse(data.application.requirements)
            }
            if (!data.application?.comments) {
                data.application.comments = []
            }
            setApplication(data.application)
        }

    }
    useEffect(() => {
        loadApplication()
    }, [])
    return (<div id='ApplicationView'>
        <h1>Application for:  `{application?.course_name}` </h1>
        <section>
            <p><i>Date: </i>{application?.created_at ? new Date(application.created_at).toLocaleDateString() : 'N/A'}</p>
            <p><i>Course:</i> {application?.course_name}</p>
        </section>
        <section>
            <h3>Requirement Form</h3>
            {application?.requirements.form.map((req, index) => <div key={index}>
                <p><span style={{ display: 'inline-block' }}>{req[0]}:</span> {req[1]}</p>
            </div>)}
        </section>
        <section id='filesDiv'>
            {application?.requirements?.files.length != 0 && (
                <>
                    <h3>Files</h3>
                    <div id='files'>
                        {application?.requirements?.files.map((file, index) =>
                            <div key={index}>
                                <p>{file[0]}</p>
                                <img key={index} src={`http://localhost:5000/uploads/${application?.submitter.docs_folder}/${file[1]}`} />
                            </div>

                        )}
                    </div>
                </>
            )}
        </section>
        <section>
            {application?.comments.length == 0 ? <h3>No comments</h3> : (
                <>
                    <h4>Comments</h4>
                    {application?.comments.map((comment, index) =>
                        <div key={index} className='comments'>
                            <span className='author'>By:<b>{comment.author}</b></span>

                            <span className='timestamp'>At: <b>{new Date(comment.timestamp).toDateString()}</b></span>
                            <br />
                            <span className='text'><i>{comment.text}</i></span>
                        </div>)}
                </>
            )}
        </section>
    </div >
    );
};

export default ApplicationView;