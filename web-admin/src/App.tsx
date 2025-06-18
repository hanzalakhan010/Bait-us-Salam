import { BookOpenText, CalendarClock, FileText, GraduationCap, LayoutDashboard, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Applicaions from './components/Applications';
import SingleApplication from './components/Applications/singleApplication';
import Courses from './components/Courses';
import CourseView from './components/Courses/courseView';
import NewCourse from './components/Courses/newCourse';
import Dashboard from './components/Dashboard';
import Instructors from './components/Instructors';
import NewInstructor from './components/Instructors/newInstructor';
import Login from './components/Login';
import Sessions from './components/Sessions';
import AddSession from './components/Sessions/AddSession';
import Students from './components/Students';
import NewStudent from './components/Students/newStudent';
import SingleStudent from './components/Students/singleStudent';
import { FullscreenLoader } from './components/FullScreenLoader';

function App() {
  const [tab, setTab] = useState('dashboard')
  const [authState, setAuth] = useState<"loading" | "authenticated" | "unauthenticated">('loading')
  const checkAuth = async () => {
    let response = await fetch('http://localhost:5000/api/v1/auth/auth', {
      method: "POST",
      credentials: 'include',

    })
    if (response.status == 200) {
      setAuth('authenticated')
    }
    else {
      setAuth('unauthenticated')
    }
  }
  useEffect(() => {
    checkAuth()
  }, [])
  return (
    <>

      <>
        {
          authState == 'authenticated' && (<>
            <nav>
              <div>
                <Link to='/dasboard' onClick={() => setTab('dashboard')} className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors ${tab == 'dashboard' ? 'active' : null}`}>
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
              </div>
              <div>
                <Link to='/students' onClick={() => setTab('students')} className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors ${tab == 'students' ? 'active' : null} `}>
                  <Users className="w-10 h-10" />
                  <span>Students</span>
                </Link>
              </div>
              <div>
                <Link to='/courses' onClick={() => setTab('courses')} className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors ${tab == 'courses' ? 'active' : null} `}>
                  <BookOpenText className="w-10 h-10" />
                  <span>Courses</span>
                </Link>
              </div>
              <div>
                <Link to='/instructors' onClick={() => setTab('instructors')} className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors ${tab == 'instructors' ? 'active' : null} `}>
                  <GraduationCap className="w-20 h-5" />
                  <span>Instructors</span>
                </Link>
              </div>
              <div>
                <Link to='/applications' onClick={() => setTab('applications')} className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors ${tab == 'applications' ? 'active' : null} `}>
                  <FileText className="w-20 h-5" />
                  <span>Applications</span>
                </Link>
              </div>
              <div>
                <Link to='/sessions' onClick={() => setTab('sessions')} className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors ${tab == 'sessions' ? 'active' : null} `}>
                  <CalendarClock className="w-20 h-5" />
                  <span>Sessions</span>
                </Link>
              </div>
            </nav>
            <Routes>
              <Route path="/dasboard" element={<Dashboard />} />
              {/* For Student  */}
              <Route path="/students" element={<Students />} />
              <Route path="/studentActions/new" element={<NewStudent />} />
              <Route path='/students/:id' element={<SingleStudent />} />
              {/* For Courses  */}
              <Route path="/courses" element={<Courses />} />
              <Route path="/courseActions/new" element={<NewCourse />} />
              <Route path='/courses/:id' element={<CourseView />} />
              {/* For Instructors */}
              <Route path="/instructors" element={<Instructors />} />
              <Route path="/instructorActions/new" element={<NewInstructor />} />
              {/* For Applications */}
              <Route path="/applications" element={<Applicaions />} />
              <Route path='/applications/:id' element={<SingleApplication />} />
              {/* For sessions */}
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/sessionsActions/new" element={<AddSession />} />
              <Route path='/sessions/:id' element={<SingleApplication />} />
            </Routes>
          </>
          )}
        {authState == 'unauthenticated' && <Login setAuth={setAuth} />}
        {authState == 'loading' && <FullscreenLoader />}


        <Toaster position="bottom-right" reverseOrder={false} toastOptions={{
          style: {
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
          },
          duration: 4000,
        }} />
      </>
    </>
  )
}

export default App
