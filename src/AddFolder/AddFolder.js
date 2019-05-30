import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import ValidationError from './ValidationError';

class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.folderNameInput = React.createRef();
        this.state = {
            folderName: '',
            folderNameValid: false,
            formValid: false,
            validationMessage: ''
        }
    }

    static defaultProps = {
        history: {
          push: () => { }
        },
    }

    static contextType = NotefulContext;

    updateFolderName(folderName) {
        this.setState({folderName}, () => {this.validateName(folderName)});
    }

    validateName(fieldValue) {
        let fieldError = this.state.validationMessage;
        const folders = this.context.folders;
        let hasError = false;
        const found = folders.some(el => el.name === fieldValue);
    
        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
            fieldError = 'Name is required';
            hasError = true;
        } else {
            if (found) {
                fieldError = 'That folder already exists!';
                hasError = true;
            } else {
                fieldError = '';
                hasError = false;
            }
        }
    
        this.setState({
            validationMessage: fieldError,
            folderNameValid: !hasError
        }, this.formValid );
    }

    formValid() {
        this.setState({
            formValid: this.state.folderNameValid,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const folder = {
            name: this.state.folderName,
        };
        fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folder)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => Promise.reject(err))
            }
            return res.json()
        })
        .then(folder => {
            this.context.addFolder(folder)
            this.props.history.push(`/folder/${folder.Id}`)
        })
        .catch(error => {
            console.error({ error })
        })
    }

    render () {
        return (
            <form className="add-folder-form" onSubmit={e => this.handleSubmit(e)}>
                <h2>Add a folder</h2>
                <div className="form-group">
                    <label htmlFor="folderName">Folder Name</label>
                    <input type="text" name="folderName" id="folderName" onChange={e => this.updateFolderName(e.target.value)}/>
                    <ValidationError hasError={!this.state.folderNameValid} message={this.state.validationMessage}/>
                </div>
                <button type="submit" disabled={!this.state.formValid}>
                    Save
                </button>
            </form>
        )
    }
}

export default AddFolder;