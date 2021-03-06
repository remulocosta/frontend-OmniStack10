import React from 'react';
import { FaGithub, FaEdit, FaTrashAlt } from 'react-icons/fa';

import './styles.css';

function DevItem({ dev, deleteDev, editDev }) {
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <div className="footer-item">
        <a href={`https://github.com/${dev.github_username}`}>
          <FaGithub color="#FFF" size={18} />
        </a>
        <div>
          <button onClick={() => editDev(dev)}>
            <FaEdit color="#FFF" size={16} />
          </button>
          <button className="btn-remove" onClick={() => deleteDev(dev)}>
            <FaTrashAlt color="#FFF" size={16} />
          </button>
        </div>
      </div>
    </li>
  );
}

export default DevItem;
