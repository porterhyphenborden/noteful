import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import NoteValidationError from './NoteValidationError'; 
import './AddNote.css';

class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteName: '',
            noteContent: '',
            folder: '',
            noteNameValid: false,
            noteContentValid: false,
            folderValid: false,
            formValid: false,
            validationMessages: {
                name: '',
                content: '',
                folder: ''
            }
        }
    }

    static defaultProps = {
        history: {
          push: () => { }
        },
    }

    static contextType = NotefulContext;

    updateNoteName(noteName) {
        this.setState({noteName}, () => {this.validateName(noteName)});
    }

    updateNoteContent(noteContent) {
        this.setState({noteContent}, () => {this.validateContent(noteContent)});
    }
    
    updateFolder(folder) {
        this.setState({folder}, () => {this.validateFolder(folder)});
    }

    validateName(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;
        
        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
            fieldErrors.name = 'Name is required.';
            hasError = true;
        } 
        else {
            fieldErrors.name = '';
            hasError = false;
        }
    
        this.setState({
            validationMessages: fieldErrors,
            noteNameValid: !hasError
        }, this.formValid );
    }

    validateContent(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;
        
        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
            fieldErrors.content = 'Note content is required.';
            hasError = true;
        } 
        else {
            fieldErrors.content = '';
            hasError = false;
        }
    
        this.setState({
            validationMessages: fieldErrors,
            noteContentValid: !hasError
        }, this.formValid );
    }

    validateFolder(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;
        
        if ((fieldValue === null) || (fieldValue === '...')) {
            fieldErrors.folder = 'Please select a folder';
            hasError = true;
        } 
        else {
            fieldErrors.folder = '';
            hasError = false;
        }
    
        this.setState({
            validationMessages: fieldErrors,
            folderValid: !hasError
        }, this.formValid );
    }

    formValid() {
        this.setState({
          formValid: this.state.noteNameValid && this.state.noteContentValid && this.state.folderValid
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const newNote = {
            name: this.state.noteName,
            content: this.state.noteContent,
            folder_id: this.state.folder,
            modified: new Date(),
        }
        fetch(`http://localhost:8000/noteful/api/notes`, {
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
                    <label htmlFor="noteName">Name</label>
                    <input type="text" name="noteName" id="noteName" onChange={e => this.updateNoteName(e.target.value)}/>
                    <NoteValidationError hasError={!this.state.noteNameValid} message={this.state.validationMessages.name}/>
                </div>
                <div className="form-group">
                    <label htmlFor='note-content'>Content</label>
                    <textarea id='note-content' name='note-content' onChange={e => this.updateNoteContent(e.target.value)}/>
                    <NoteValidationError hasError={!this.state.noteContentValid} message={this.state.validationMessages.content}/>
                </div>
                <div className="form-group">
                    <label htmlFor='folder-select'>Folder</label>
                    <select id='folder-select' name='folder-select' onChange={e => this.updateFolder(e.target.value)}>
                        <option value={null}>...</option>
                        {folders.map(folder =>
                            <option key={folder.id} value={folder.id}>
                                {folder.name}
                            </option>
                        )}
                    </select>
                    <NoteValidationError hasError={!this.state.folderValid} message={this.state.validationMessages.folder}/>
                </div>
                <button className='save-note' type="submit" disabled={!this.state.formValid}>
                    Save
                </button>
            </form>
        )
    }
}

export default AddNote;