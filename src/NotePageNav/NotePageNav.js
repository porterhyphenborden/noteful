import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import { findNote, findFolder } from '../notes-helpers'
import './NotePageNav.css';

class NotePageNav extends Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }

  static contextType = NotefulContext;

  render () {
    const { notes, folders, } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
    return (
      <div className='NotePageNav'>
          <button 
              type='button'
              className='go-back'
              onClick={() => this.props.history.goBack()}>
              Go Back
          </button>
          {folder && (
              <h3 className='folder-name'>
                  {folder.name}
              </h3>
          )}
      </div>
    )
  }


}

export default NotePageNav;