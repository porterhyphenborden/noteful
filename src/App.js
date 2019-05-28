import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import NoteListMain from './NoteListMain/NoteListMain';
import NoteListNav from './NoteListNav/NoteListNav';
import NotePageMain from './NotePageMain/NotePageMain';
import NotePageNav from './NotePageNav/NotePageNav';
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
            </nav>
            <main role='main'>
              <Route
                exact path='/' 
                component ={NoteListMain}
              />
              <Route
                exact path='/folder/:folderId' 
                component ={NoteListMain}
              />
              <Route
                exact path='/note/:noteId'
                component ={NotePageMain}
              />
            </main>
          </div>
        </NotefulContext.Provider>
      </div>
    );
  }
}

export default App;
