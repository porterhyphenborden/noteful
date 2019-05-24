import React from 'react';
import './NotePageNav.css';

export default function NotePageNav(props) {
  return (
    <div className='NotePageNav'>
        <button 
            type='button'
            className='go-back'
            onClick={() => props.history.goBack()}>
            Go Back
        </button>
        {props.folder && (
            <h3 className='folder-name'>
                {props.folder.name}
            </h3>
        )}
    </div>
  )
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}