import React, { Component } from 'react';
import Note from '../Note/Note.js';
import NotefulContext from '../NotefulContext';
import { findNote } from '../notes-helpers';
import PropTypes from 'prop-types';
import './NotePageMain.css';

class NotePageMain extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = NotefulContext

  onDeleteNote = noteId => {
    this.props.history.push('/')
  }

  render () {
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          content={note.content}
          onDeleteNote={this.onDeleteNote}
        />
      </section>
    )
  }
}

NotePageMain.propTypes= {
  match: PropTypes.object,
}

export default NotePageMain;