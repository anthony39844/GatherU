import Home from './components/Home/Home'
import './App.css'
import Events from './components/Events/Events';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignUp/SignUp';
import EventForm from './components/EventForm/EventForm';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/SignUp" element={<SignIn />} />
          <Route path="/EventForm" element={<EventForm />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
