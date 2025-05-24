import React from 'react';

const CourseSessions: React.FC = () => {
    return (
        <div id='sessions'>
            <h2>Course Sessions</h2>

            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Topic</th>
                        <th>Instructor notes</th>
                    </tr>
                </thead>
                <tbody> 
                    <tr>
                        <td>Hanzala</td>
                        <td>Hanzala</td>
                        <td>Hanzala</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CourseSessions;