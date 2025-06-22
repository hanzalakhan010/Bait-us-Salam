import React, { useEffect, useState } from 'react';
import { host } from '../../constants';
import { notifyError } from '../../notification';

interface Profile {
    name: string,
    father_name: string,
    cnic: string,
    father_cnic: string,
    docs_folder: string,
    dob: Date,
    address: string,
    phone: string,
    email: string,
}
interface Student {
    id: number,
    email: string,
}
const Profile: React.FC = () => {
    const [profile, setProfile] = useState<Profile>()
    const student: Student = localStorage.getItem('student') ? JSON.parse(localStorage.getItem('student') as string) : null;

    const loadProfile = async () => {
        if (!student) {
            notifyError('Student data not found in  localstorage,Logout first')
            return
        }
        let resposnse = await fetch(`${host}/api/v1/students/${student.id}/details`, {
            credentials: 'include'
        })
        let data = await resposnse.json()
        if (resposnse.ok) {
            setProfile(data.student)
        }
    }
    useEffect(() => {
        loadProfile()
    }, [])
    return (
        <div id='profile'>
            <h1>Profile</h1>
            <h2><b>Name : </b>{profile?.name}</h2>
            <p><b>Email :</b> {profile?.email}</p>
            <p><b>Father Name: </b>{profile?.father_name}</p>
            <p><b>CNIC :</b> {profile?.cnic}</p>
            <p><b>Father CNIC : </b>{profile?.father_cnic}</p>
            <p><b>Address :</b> {profile?.address}</p>
            <p><b>Phone :</b>{profile?.phone}</p>
        </div>
    );
};

export default Profile;