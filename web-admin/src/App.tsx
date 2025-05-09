import { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { BookOpenText, GraduationCap, LayoutDashboard, Users } from 'lucide-react'
import Student from './components/Student';

function App() {
  const [login, setLogin] = useState(false)
  const [tab, setTab] = useState('dashboard')
  return (
    <>
      {login ?
        <>
          <nav>
            <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors">
              <Users className="w-10 h-10" />
              <span>Students</span>
            </button>
            <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors">
            <BookOpenText className="w-10 h-10" />
              <span>Courses</span>
            </button>
            <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors">
            <GraduationCap className="w-20 h-5" />
              <span>Instructors</span>
            </button>
            
          </nav>
          {tab == 'dashboard' ? <Dashboard /> : null}
          {tab == 'students' ? <Student /> : null}
        </>
        :
        <Login setLogin={setLogin} />}
    </>
  )
}

export default App
