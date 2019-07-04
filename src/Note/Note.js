import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';
import './Note.css'

class Note extends Component {
  static contextType = NotefulContext;

  static defaultProps = {
    name: '',
    id: '',
    content: '',
    modified: '',
    onDeleteNote: () => {},
  }

  handleDeleteNote(noteId) {
    fetch(config.API_ENDPOINT + `notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error
          })
        }
        //return res.json()
      })
      .then(() => {
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error(error)
      })
  }

  render () {
    const { id, name, modified, content } = this.props
    return (
      <NotefulContext.Consumer>
        {(context) => (
          <div className='Note'>
            <h2>
              <Link to={`/note/${id}`}>
                {name}
              </Link>
            </h2>
            <p>
              Last modified: {format(modified, 'Do MMM YYYY')}
            </p>
            <div className='note-content'>
              <p>{content}</p>
            </div>
            <button
              className='delete-note'
              onClick={() => {
                this.handleDeleteNote(id)
              }}
            >
              Delete
            </button>
          </div>
        )}
      </NotefulContext.Consumer>
    )
  }
}

Note.propTypes= {
  name: PropTypes.string,
  content: PropTypes.string,
  onDeleteNote: PropTypes.func,
}

export default Note;