import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import './singlePost.css';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

export default function SinglePost() {
  const { user } = useContext(Context);
  const PF = 'http://localhost:8000/images/';
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [post, setpost] = useState({});
  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');
  const [updateMode, setupdateMode] = useState(false);

  useEffect(() => {
    const getpost = async () => {
      const res = await axios.get(`/posts/${path}`);
      setpost(res.data);
      settitle(res.data.title);
      setdesc(res.data.desc);
    };
    getpost();
  }, [path]);

  const deleteHandler = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace('/');
    } catch (err) {}
  };

  const updateHandler = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setupdateMode(false);
    } catch (err) {}
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fas fa-edit"
                  onClick={() => {
                    setupdateMode(true);
                  }}
                ></i>
                <i
                  className="singlePostIcon fas fa-trash-alt"
                  onClick={deleteHandler}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => {
              setdesc(e.target.value);
            }}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={updateHandler}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
