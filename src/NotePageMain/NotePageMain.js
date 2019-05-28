import React, { Component } from 'react';
import Note from '../Note/Note.js'
import NotefulContext from '../NotefulContext';
import { findNote } from '../notes-helpers'
import './NotePageMain.css'

class NotePageMain extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = NotefulContext

  handleDeleteNote = noteId => {
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
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='note-content'>
          <p>{note.content}</p>
        </div>
      </section>
    )
  }

}

export default NotePageMain;