import { useContext, useState } from 'react';
import Sidebar from './../../components/sidebar/Sidebar';
import './setting.css';
import { Context } from './../../context/Context';
import axios from 'axios';

export default function Setting() {
  const PF = 'http://localhost:8000/images/';
  const { user, dispatch } = useContext(Context);
  const [file, setfile] = useState(null);
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [success, setsuccess] = useState(false);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_START' });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      updatedUser.profilePic = filename;
      try {
        await axios.post('/upload', data);
      } catch (err) {}
    }
    try {
      const res = await axios.put('/users/' + user._id, updatedUser);
      setsuccess(true);
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'UPDATE_FAILURE' });
    }
  };
  return (
    <div className="setting">
      <div className="settingWrapper">
        <div className="settingTitle">
          <span className="settingUpdateTitle">Update your account</span>
          <span className="settingDeleteTitle">Delete your account</span>
        </div>
        <form className="settingForm" onSubmit={SubmitHandler}>
          <label>Profile Picture</label>
          <div className="settingPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={(e) => setfile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setusername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setemail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <button className="settingSubmit" type="submit">
            Update
          </button>
          {success && (
            <span className="text-success text-center mt-4">
              profile has been updated!
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
