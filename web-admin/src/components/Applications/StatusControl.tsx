import React, { useState } from 'react';
interface StatusControlProp {
    application_id: string | undefined;
    label: keyof typeof validTransitions;
    currentStatus: string;
}


const validTransitions: Record<string, Record<string, string[]>> = {
    'Application': {
        "Pending": ["Under Review", "Editable"],
        "Under Review": ["Fulfilled", "Rejected", "Editable"],
        "Editable": ["Under Review"],
        "Fulfilled": [],
        "Rejected": []
    },
    'Exam': {
        "Pending": ["Scheduled"],
        "Scheduled": ["Attempted", "Missed"],
        "Attempted": ["Grading"],
        "Grading": ["Graded"],
        "Graded": ["Result Published"],
        "Result Published": []
    },
    "Interview": {
        "Pending": ["Scheduled"],
        "Scheduled": ["Attempted", "Missed"],
        "Attempted": ["Result Published"],
        "Missed": ["Result Published"],
        "Result Published": []
    }
}



const StatusControl: React.FC<StatusControlProp> = ({ application_id, label, currentStatus }) => {
    const [status, setStatus] = useState<string>(currentStatus)
    const changeStatus = async () => {
        let response = await fetch(`http://localhost:5000/api/v1/applications/${application_id}/status/${label}`, {
            method:'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({ status })
        })
        let data = await response.json()
        console.log(data)
    }
    return (
        <div>
            <h4>{label} Status</h4>
            <select value={status}
                onChange={(e) => {
                    setStatus(e.target.value)
                }}>
                <option value={currentStatus}>{currentStatus}</option>
                {validTransitions[label]?.[currentStatus]?.map((status) => (
                    <option key={status} value={status}>{status}</option>
                ))}
            </select>
            <button onClick={changeStatus}>Save</button>
        </div>
    );
};

export default StatusControl;