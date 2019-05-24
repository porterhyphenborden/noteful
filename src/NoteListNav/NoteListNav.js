import React from 'react';
import { NavLink } from 'react-router-dom';
import './NoteListNav.css';

function NoteListNav(props) {
  return (
    <div className="NoteListNav">
      <ul className="folder-list">
        {props.folder.map(folder =>
          <li key={folder.id}>
            <NavLink className="folder-link"
              to={`/folder/${folder.id}`}
            >
              {folder.name}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  )
}

NoteListNav.defaultProps = {
  folders: []
}

export default NoteListNav