import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import NoteListMain from './NoteListMain/NoteListMain';
import NoteListNav from './NoteListNav/NoteListNav';
import NotePageMain from './NotePageMain/NotePageMain';
import NotePageNav from './NotePageNav/NotePageNav';
import STORE from './store';
import { getNotesForFolder, findNote, findFolder } from './notes-helpers';
import './App.css';

class App extends Component {
  state = {
    folders: [],
    notes: [],
  }

  componentDidMount() {
    this.setState(STORE);
    console.log(STORE);
  }

  render() {
    const { folders, notes } = this.state;
    return (
      <div className='App'>
        <header role='banner'>
          <Link to='/'>
            <h1>Noteful</h1>
          </Link>
        </header>
        <div className='content'>
          <nav role='navigation'>
            <Route 
              exact path='/'
              render={(routerProps) =>
                <NoteListNav
                  folder={folders}
                  notes={notes}
                  {...routerProps}
                />
              }>
            </Route>
            <Route 
              exact path='/folder/:folderId'
              render={(routerProps) =>
                <NoteListNav
                  folder={folders}
                  notes={notes}
                  {...routerProps}
                />
              }>
            </Route>
            <Route 
              exact path='/note/:noteId'
              render={routerProps => {
                const { noteId } = routerProps.match.params
                const note = findNote(notes, noteId) || {}
                const folder = findFolder(folders, note.folderId)
                return (
                  <NotePageNav
                    folder={folder}
                    {...routerProps}
                  />
                )
              }}
            >
            </Route>
          </nav>
          <main role='main'>
            <Route
              exact path='/' render={routerProps => {
                const { folderId } = routerProps.match.params;
                const notesForFolder = getNotesForFolder(notes, folderId);
                return (
                  <NoteListMain
                    notes={notesForFolder}
                    {...routerProps}
                  />
                )
              }}
            >
            </Route>
            <Route
              exact path='/folder/:folderId' render={routerProps => {
                const { folderId } = routerProps.match.params;
                const notesForFolder = getNotesForFolder(notes, folderId);
                return (
                  <NoteListMain
                    notes={notesForFolder}
                    {...routerProps}
                  />
                )
              }}
            >
            </Route>
            <Route
              exact path='/note/:noteId'
              render={routerProps => {
                const { noteId } = routerProps.match.params
                const note = findNote(notes, noteId) || {}
                return (
                  <NotePageMain
                    note={note}
                    {...routerProps}
                  />
                )
              }}>
            </Route>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
