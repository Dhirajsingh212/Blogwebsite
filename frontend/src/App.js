import Home from './pages/home/Home';
import TopBar from './components/topbar/TopBar';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import Setting from './pages/settings/Setting';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/Context';

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={user ? <Home /> : <Register />} />
        <Route path="/Login" element={user ? <Home /> : <Login />} />
        <Route path="/Write" element={user ? <Write /> : <Register />} />
        <Route path="/Setting" element={user ? <Setting /> : <Register />} />
        <Route path="/post/:id" element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;
