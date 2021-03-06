import { useContext, useState } from 'react';
import axios from 'axios';
import { Context } from './../../context/Context';
import './write.css';

export default function Write() {
  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');
  const [file, setfile] = useState(null);
  const { user } = useContext(Context);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      file,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newPost.photo = filename;
      try {
        await axios.post('/upload', data);
      } catch (err) {}
    }
    try {
      const res = await axios.post('/posts', newPost);
      window.location.replace('/post/' + res.data._id);
    } catch (err) {}
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={SubmitHandler}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={(e) => setfile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell Your Story..."
            type="text"
            className="writeInput writeText"
            value={desc}
            onChange={(e) => setdesc(e.target.value)}
          ></textarea>
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
