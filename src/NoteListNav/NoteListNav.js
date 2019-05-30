import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import { NavLink, Link } from 'react-router-dom';
import './NoteListNav.css';

class NoteListNav extends Component {
  static contextType = NotefulContext;

  render () {
    const { folders=[] } = this.context
    return (
      <div className="NoteListNav">
        <ul className="folder-list">
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink className="folder-link"
                to={`/folder/${folder.id}`}
              >
                {folder.name}
              </NavLink>
            </li>
          )}
        </ul>
        <Link className='add-folder-button' to='/add-folder'>
          Add Folder
        </Link>
      </div>
    )
  }
}

export default NoteListNav;