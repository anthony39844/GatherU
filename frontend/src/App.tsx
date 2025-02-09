import Home from './components/Home/Home'
import './App.css'
import Events from './components/Events/Events';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignUp/SignUp';
import EventForm from './components/EventForm/EventForm';
import OrgEvents from './components/OrgEvents/OrgEvents';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/:status?" element={<Home />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/SignUp" element={<SignIn />} />
          <Route path="/EventForm" element={<EventForm />} />
          <Route path="/OrgEvents" element={<OrgEvents />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
