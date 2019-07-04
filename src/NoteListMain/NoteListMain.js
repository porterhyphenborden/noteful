import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note.js';
import NotefulContext from '../NotefulContext';
import { getNotesForFolder } from '../notes-helpers';
import PropTypes from 'prop-types';
import './NoteListMain.css';

class NoteListMain extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = NotefulContext;

  render ()  {
    const { folderId } = this.props.match.params
    const folderIdInt = parseInt(folderId)
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderIdInt)
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li className='note-in-list' key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <Link className='add-note-button' to='/add-note'>
          Add Note
        </Link>
      </section>
    )
  }
}

NoteListMain.propTypes= {
  match: PropTypes.object,
}

export default NoteListMain;