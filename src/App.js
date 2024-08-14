import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About'; // Example additional route
import NoteState from './context/notes/NoteState';

 import Login from './components/Login';
import Signup from './components/Signup'; 
// import Users from './components/Users'; // Example additional route
// import NotFound from './components/NotFound'; // Example 404 page

function App() {
  return (
    <>
<NoteState>
    <Router>
      <Navbar />
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/users" element={<Users />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  </NoteState>
        </>
  );
}

export default App;
