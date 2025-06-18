import React, { useState } from 'react';
import './style.css'
import AddSession from './AddSession';
import { Link } from 'react-router-dom';

const Sessions: React.FC = () => {
    const [editSession, setEditSession] = useState(false)
    return (
        <div id='sessionsDiv'>
            <h1>Sessions</h1>
            <Link to='/sessionsActions/new'>Add Session</Link>
            {/* {!editSession && (
            )}
            <button
                onClick={() => { setEditSession(!editSession) }}
            >
                {editSession ? 'Cancel' : "Add Session"}
            </button>
            {editSession ? (<AddSession />) : null} */}
        </div>
    );
};

export default Sessions;