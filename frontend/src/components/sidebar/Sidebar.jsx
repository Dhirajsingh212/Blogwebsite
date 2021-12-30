import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

export default function Sidebar() {
  const [cats, setcats] = useState([]);

  useEffect(() => {
    const fetchcat = async () => {
      const res = await axios.get('/catagories');
      setcats(res.data);
    };
    fetchcat();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
      </div>
      <img
        className="sidebarImg"
        src="https://images.pexels.com/photos/9737456/pexels-photo-9737456.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt=""
      />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto voluptas
        quis error ducimus nesciunt laboriosam, vel modi alias accusamus
        consequatur!
      </p>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATAGORIES</span>
      </div>
      <ul className="sidebarList">
        {cats.map((c, i) => (
          <Link to={`/?cat=${c.name}`} className="link" key={i}>
            <li className="sidebarListItem">{c.name}</li>
          </Link>
        ))}
      </ul>
      <div className="sidebarItem">
        <span className="sidebarTitle">
          <div className="sidebarSocial">
            <i className="sidebarIcon fab fa-facebook-square"></i>
            <i className="sidebarIcon fab fa-twitter-square"></i>
            <i className="sidebarIcon fab fa-pinterest-square"></i>
            <i className="sidebarIcon fab fa-instagram-square"></i>
          </div>
        </span>
      </div>
    </div>
  );
}
