import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import './Note.css'

export default function Note(props) {
  return (
    <div className='Note'>
      <h2>
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>
      <p>
        Last modified: <Moment format="MM/DD/YYYY">{props.modified}</Moment>
      </p>
    </div>
  )
}