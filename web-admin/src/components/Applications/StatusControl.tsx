import React, { useEffect, useState } from 'react';
import { notifyError, notifySuccess } from '../../notifications';
import { data } from 'react-router-dom';
interface StatusControlProp {
    application_id: string | undefined;
    label: keyof typeof validTransitions;
    // currentStatus: string;
}

interface Status {
    at: Date,
    by: string,
    status: string
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



const StatusControl: React.FC<StatusControlProp> = ({ application_id, label }) => {
    const [status, setStatus] = useState<Status[]>()
    const [currentStatus, setCurrentStatus] = useState('')
    const loadStatus = async () => {
        let response = await fetch(`http://localhost:5000/api/v1/applications/${application_id}/status/${label}`,
            {
                credentials: 'include'
            }
        )
        let data = await response.json()
        if (response.status == 200) {
            setStatus(data.status)
            setCurrentStatus(data.status[data.status.length - 1].status)
        }
        console.log(data)
    }
    const changeStatus = async () => {
        let response = await fetch(`http://localhost:5000/api/v1/applications/${application_id}/status/${label}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({ 'status': currentStatus })
        })
        let data = await response.json()
        if (response.status == 201) {
            notifySuccess(data.message)
            loadStatus()
        }
        else {
            notifyError(data.error)
        }
    }
    useEffect(() => {
        loadStatus()
    }, [])
    return (
        <div>
            <h4>{label} Status</h4>
            <select value={currentStatus}
                onChange={(e) => {
                    setCurrentStatus(e.target.value)
                }}>
                <option value={currentStatus}>{currentStatus}</option>
                {status && validTransitions[label]?.[status[status.length - 1]?.status]?.map((status) => (
                    <option key={status} value={status}>{status}</option>
                ))}
            </select>
            <button onClick={changeStatus}>Save</button>
        </div>
    );
};

export default StatusControl;