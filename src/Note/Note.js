import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import NotefulContext from '../NotefulContext';
import './Note.css'

class Note extends Component {
  static contextType = NotefulContext;

  deleteNote(noteId, callback) {
    fetch(`http://localhost:9090/notes/` + `/${noteId}`, {
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
        return res.json()
      })
      .then(data => {
        callback(noteId)
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error(error)
      })
  }

  render () {
    const { name, id, modified } = this.props
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
              Last modified: <Moment format="MM/DD/YYYY">{modified}</Moment>
            </p>
            <button
              className='delete-note'
              onClick={() => {
                this.deleteNote(id, context.deleteNote)
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

export default Note;