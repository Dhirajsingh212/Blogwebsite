import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css';

export default function Register() {
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    seterror(false);
    try {
      const res = await axios.post('/auth/register', {
        username,
        email,
        password,
      });
      res.data && window.location.replace('/Login');
    } catch (err) {
      seterror(true);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={submitHandler}>
        <label>Username</label>
        <input
          type="username"
          placeholder="Enter Your Username...."
          className="registerInput"
          value={username}
          onChange={(e) => {
            setusername(e.target.value);
          }}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Your Email...."
          className="registerInput"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Your Password..."
          className="registerInput"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link to="/Login" className="link">
          LOGIN
        </Link>
      </button>
      {error && (
        <span className="text-white mt-2">
          <b>Something went wrong!</b>
        </span>
      )}
    </div>
  );
}
