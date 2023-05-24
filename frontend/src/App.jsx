
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <Router>
         <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/login' element={<Login />} />
         <Route path='/dashboard' element={<Dashboard />} />
         <Route path='/profile' element={<Profile />} />
         </Routes>
      </Router>
    </div>
  );
}

export default App;
