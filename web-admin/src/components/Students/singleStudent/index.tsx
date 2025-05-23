import React, { useState } from 'react';
// import './newStudent/newStudent.css';
import EditStudent from './editStudent';
import Courses from './Courses';
import './styles.css'
import Applications from './Applicaions';


const SingleStudent: React.FC = () => {
    const [tab, setTab] = useState('editStudent')
    return (
        <div id='student'>
            <div id='studentNav'>
                <button onClick={()=>{setTab('editStudent')}}>Edit Student</button>
                <button onClick={()=>{setTab('applications')}}>Applications</button>
                <button onClick={()=>{setTab('courses')}}>Courses</button>
                <button onClick={()=>{setTab('actions')}}>Actions</button>
            </div>
            <div id='studentTab'>
                {tab == 'editStudent' ? (<EditStudent />) : null}
                {tab == 'applications' ? (<Applications />) : null}
                {tab == 'courses' ? (<Courses />) : null}

            </div>
        </div>
    );
};

export default SingleStudent;