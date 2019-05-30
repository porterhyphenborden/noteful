import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import './AddNote.css';

class AddNote extends Component {
    constructor(props) {
        super(props);
        this.noteNameInput = React.createRef();
        this.noteContentInput = React.createRef();
        this.folderSelect = React.createRef();
    }

    static defaultProps = {
        history: {
          push: () => { }
        },
    }

    static contextType = NotefulContext;

    handleSubmit(event) {
        event.preventDefault();
        const newNote = {
            name: this.noteNameInput.current.value,
            content: this.noteContentInput.current.value,
            folderId: this.folderSelect.current.value,
            modified: new Date(),
        }
        fetch(`http://localhost:9090/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newNote),
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => Promise.reject(err))
            }
            return res.json()
        })
        .then(note => {
            this.context.addNote(note)
            this.props.history.push(`/folder/${note.folderId}`)
        })
        .catch(error => {
            console.error({ error })
        })
    }

    render () {
        const { folders=[] } = this.context;
        return (
            <form className="add-note-form" onSubmit={e => this.handleSubmit(e)}>
                <h2>Add a note</h2>
                <div className="form-group">
                    <label htmlFor="noteName">Note Name</label>
                    <input type="text" name="noteName" id="noteName" ref={this.noteNameInput}/>
                </div>
                <div className="form-group">
                    <label htmlFor='note-content'>Content</label>
                    <textarea id='note-content' name='note-content' ref={this.noteContentInput}/>
                </div>
                <div className="form-group">
                    <label htmlFor='folder-select'>Folder</label>
                    <select id='folder-select' name='folder-select' ref={this.folderSelect}>
                        <option value={null}>...</option>
                        {folders.map(folder =>
                            <option key={folder.id} value={folder.id}>
                                {folder.name}
                            </option>
                        )}
                    </select>
                </div>
                <button className='save-note' type="submit">
                    Save
                </button>
            </form>
        )
    }
}

export default AddNote;