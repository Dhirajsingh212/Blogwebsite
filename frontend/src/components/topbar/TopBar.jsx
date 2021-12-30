import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './topbar.css';

export default function TopBar() {
  const PF = 'http://localhost:8000/images/';
  const { user, dispatch } = useContext(Context);

  const logoutHandler = () => {
    dispatch({ type: 'LOGOUT' });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/" className="link">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/" className="link">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/Write" className="link">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={logoutHandler}>
            {user ? (
              <Link to="/" className="link">
                LOGOUT
              </Link>
            ) : (
              ''
            )}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/Setting">
            <img className="topImg" src={PF + user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link to="/Login" className="link">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link to="/Register" className="link">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="searchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
