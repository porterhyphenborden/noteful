import React from 'react'
import Note from '../Note/Note.js'
import './NotePageMain.css'

export default function NotePageMain(props) {
  return (
    <section className='NotePageMain'>
      <Note
        id={props.note.id}
        name={props.note.name}
        modified={props.note.modified}
      />
      <div className='note-content'>
        <p>{props.note.content}</p>
      </div>
    </section>
  )
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}