import { useEffect, useState } from 'react';
import './App.css'
import { Link, Route, Routes } from 'react-router-dom';
import Login from './Login';
import { host } from './constants';
import { Loader2, Menu, X } from 'lucide-react';
import Profile from './components/Profile';
import { Toaster } from 'react-hot-toast';
import { notifySuccess } from './notification';
import Courses from './components/Courses';
import Applications from './components/Applications';
import ApplicationView from './components/Applications/ApplicationView';
import AvailableCourses from './components/AvailableCourses';
import Apply from './components/AvailableCourses/Apply';
function App() {
  const [authState, setAuthState] = useState<'authenticated' | 'loading' | 'unauthenticated'>("loading")
  const [navOpen, setNavOpen] = useState(false)
  const checkAuth = async () => {
    try {
      let response = await fetch(`${host}/api/v1/auth/auth`, {
        method: 'POST', credentials: 'include'
      })
      if (response.status == 200) {
        setAuthState('authenticated')
      }
      else setAuthState('unauthenticated')
    }
    catch {
      alert('Error connecting to server')
    }
  }
  const logout = async () => {
    setAuthState('unauthenticated')
    localStorage.clear()
    notifySuccess('Logout Successfully')
    try {
      await fetch(`${host}/api/v1/auth/logout`, { method: 'POST', credentials: 'include' })
    } catch {
      alert('Error connecting to server')
    }

  }
  useEffect(() => {
    checkAuth();
  }, [])
  return (
    <>
      {authState == 'authenticated' && (
        <div id='navDiv'>
          {navOpen ?
            (
              <nav>
                <button onClick={() => setNavOpen(false)}><X /></button>
                <Link to='/profile' onClick={() => { setNavOpen(false) }}>Profile</Link>
                <Link to='/courses' onClick={() => { setNavOpen(false) }}>Courses</Link>
                <Link to='/grades' onClick={() => { setNavOpen(false) }}>GradeBook</Link>
                <Link to='/applications' onClick={() => { setNavOpen(false) }}>Applications</Link>
                <Link to='/available_courses' onClick={() => { setNavOpen(false) }}>Available Courses</Link>
                <a onClick={() => { setNavOpen(false); logout() }}>Logout</a>
              </nav>
            ) : <div>
              <button onClick={() => setNavOpen(true)}><Menu /></button>
            </div>
          }
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/applications/:application_id" element={<ApplicationView />} />
            <Route path="/available_courses" element={<AvailableCourses />} />
            <Route path='/apply/:course_id' element={<Apply />}></Route>
          </Routes>
        </div >
      )
      }
      {authState == 'loading' && (
        <div className="flex items-center justify-center h-32">
          <Loader2 className="animate-spin text-gray-500" size={100} />
        </div>
      )}
      {authState == 'unauthenticated' && <Login setAuthState={setAuthState} />}
      <Toaster position="top-right" reverseOrder={false} toastOptions={{
        style: {
          borderRadius: '8px',
          background: '#333',
          color: '#fff',
        },
        duration: 4000,
      }} />
    </>
  )
}

export default App
