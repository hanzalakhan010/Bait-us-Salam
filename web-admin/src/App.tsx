import { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Student from './components/Student';

function App() {
  const [login, setLogin] = useState(false)
  const [tab, setTab] = useState('dashboard')
  return (
    <>
      {login ?
        <>
          {tab == 'dashboard' ? <Dashboard /> : null}
          {tab == 'students' ? <Student /> : null}
        </>
        :
        <Login setLogin={setLogin} />}
    </>
  )
}

export default App
