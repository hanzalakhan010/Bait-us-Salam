import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles.css'
import StatusControl from './StatusControl';
import { notifyError, notifySuccess } from '../../notifications';
interface Submitter {
    docs_folder: string,
    email: string,
    id: number,
    name: string
}
// interface Requirement {
//     [key: string]: string;
// }
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
const SingleApplication: React.FC = () => {
    const { id } = useParams();
    const [application, setApplication] = useState<Application>()
    const [comment, setComment] = useState('')
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
                if (!data.application?.comments) {
                    data.application.comments = []
                }
                setApplication(data.application)
                // console.log(data.application?.status[data.application?.status.length - 1].status)
            }
        }
        catch {
            notifyError('Error connecting to server')
        }
    }
    const addComment = async () => {
        let response = await fetch(`http://localhost:5000/api/v1/applications/${id}/comment`,
            {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ comment }),
                headers: { 'Content-Type': 'Application/json' }
            }
        )
        let data = await response.json()
        if (response.status == 201) {
            let comments = application?.comments
            comments?.push(data.comment)
            setComment('')
            notifySuccess("Added Comment")
        }

    }

    useEffect(() => {
        loadApplication()
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
            <section>
                <h3>Requirement Form</h3>
                {application?.requirements.form.map((req, index) => <div key={index}>
                    <p><span style={{ display: 'inline-block' }}>{req[0]}:</span> {req[1]}</p>
                </div>)}
            </section>
            <section id='filesDiv'>
                <h3>Files</h3>
                <div id='files'>
                    {application?.requirements?.files.map((file, index) =>
                        <div key={index}>
                            <p>{file[0]}</p>
                            <img key={index} src={`http://localhost:5000/uploads/${application?.submitter.docs_folder}/${file[1]}`} />
                        </div>

                    )}
                </div>
            </section>
            <section id='statusDiv'>
                <StatusControl application_id={id} label='Application' />
                <StatusControl application_id={id} label='Exam' />
                <StatusControl application_id={id} label='Interview' />

            </section>
            <section>
                <h4>Comments</h4>
                <div>
                    <input value={comment} onChange={(e) => { setComment(e.target.value) }} />
                    <button onClick={addComment}>Comment</button>
                </div>

                {application?.comments.map((comment, index) =>
                    <div key={index} className='comments'>
                        <span className='author'>By:<b>{comment.author}</b></span>

                        <span className='timestamp'>At: <b>{new Date(comment.timestamp).toDateString()}</b></span>
                        <br />
                        <span className='text'><i>{comment.text}</i></span>
                    </div>)}
            </section>
        </div >
    );
};

export default SingleApplication;