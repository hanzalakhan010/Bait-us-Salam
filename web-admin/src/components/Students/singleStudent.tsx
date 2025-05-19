import React from 'react';
import './newStudent/newStudent.css';
import EditStudent from './editStudent';
import Courses from './Courses';


const SingleStudent: React.FC = () => {

    return (
        <>
            <EditStudent />
            <Courses/>
        </>
    );
};

export default SingleStudent;