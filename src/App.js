import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import NoteListMain from './NoteListMain/NoteListMain';
import NoteListNav from './NoteListNav/NoteListNav';
import NotePageMain from './NotePageMain/NotePageMain';
import NotePageNav from './NotePageNav/NotePageNav';
import ErrorBoundary from './ErrorBoundary';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import NotefulContext from './NotefulContext';
import './App.css';

class App extends Component {
  state = {
    folders: [],
    notes: [],
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note =>
      note.id !== noteId
    )
    this.setState({
      notes: newNotes
    })
  }

  addNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  addFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  componentDidMount() {
    Promise.all([
      fetch(`http://localhost:9090/notes`),
      fetch(`http://localhost:9090/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      addNote: this.addNote,
      addFolder: this.addFolder
    }
    return (
      <div className='App'>
        <header role='banner'>
          <Link to='/'>
            <h1>Noteful</h1>
          </Link>
        </header>
        <NotefulContext.Provider value={contextValue}>
          <div className='content'>
            <nav role='navigation'>
              <Route 
                exact path='/'
                component={NoteListNav}
              />
              <Route 
                exact path='/folder/:folderId'
                component={NoteListNav}
              />
              <Route 
                exact path='/note/:noteId'
                component={NotePageNav}
              />
              <Route
                path='/add-folder'
                component={NotePageNav}
              />
              <Route
                path='/add-note'
                component={NotePageNav}
              />
            </nav>
            <main role='main'>
              <Route
                exact path='/' 
                component={NoteListMain}
              />
              <Route
                exact path='/folder/:folderId' 
                component={NoteListMain}
              />
              <Route
                exact path='/note/:noteId'
                component={NotePageMain}
              />
              <Route
                path='/add-folder'
                render={ props =>
                  <ErrorBoundary>
                    <AddFolder {...props}/>
                  </ErrorBoundary>
                }
              />
              <Route
                path='/add-note'
                render={ props =>
                  <ErrorBoundary>
                    <AddNote {...props}/>
                  </ErrorBoundary>
                }
              />
            </main>
          </div>
        </NotefulContext.Provider>
      </div>
    );
  }
}

export default App;
