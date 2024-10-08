import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import { ClickCounter, HeartButton } from "./hooksExercise";
import ToggleTheme from './hooksExercise';

let idCounter = 0;

function App() {
  const [notes, setNotes] = useState(dummyNotesList); 
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    liked: false,
  };

  const [createNote, setCreateNote] = useState(initialNote);
  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault(); 
    setNotes([...notes, { ...createNote, id: idCounter++, liked: false }]); 
    setCreateNote(initialNote); 
  };

  const [favorites, setFavorites] = useState<number[]>([]);
  const toggleFavorite = (noteId: number) => {
    setFavorites((Favorites) =>
      Favorites.includes(noteId)
        ? Favorites.filter((id) => id !== noteId) 
        : [...Favorites, noteId] 
    );
  };

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const updateNoteHandler = (noteId: number, field: keyof Note, value: string) => {
    setNotes(notes.map(note => 
      note.id === noteId ? { ...note, [field]: value } : note
    ));
  };

  const deleteNote = (noteId: number) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };
  
  return (
    <div className='app-container'>
  	<form className="note-form" onSubmit={createNoteHandler}>
    	<div>
      	<input
        	placeholder="Note Title"
        	onChange={(event) =>
          	setCreateNote({ ...createNote, title: event.target.value })}
        	required>
      	</input>
    	</div>

    	<div>
      	<textarea
        	onChange={(event) =>
          	setCreateNote({ ...createNote, content: event.target.value })}
        	required>
      	</textarea>
    	</div>

    <div>
     	<select
       	onChange={(event) =>
         	setCreateNote({ ...createNote, label: event.target.value as Label})}
       	required>
       	<option value={Label.personal}>Personal</option>
       	<option value={Label.study}>Study</option>
       	<option value={Label.work}>Work</option>
       	<option value={Label.other}>Other</option>
     	</select>
   	</div>

    	<div><button type="submit">Create Note</button></div>
  	</form>

    <div className="notes-grid">
    	{notes.map((note) => (
      	<div
        	key={note.id}
        	className="note-item"
      	>
        	<div className="notes-header">
              <HeartButton
                isFavorited={favorites.includes(note.id)}
                toggleFavorite={() => toggleFavorite(note.id)}
              />
              <button onClick={() => deleteNote(note.id)}>x</button>
            </div>
            <h2
              contentEditable
              onInput={(e) =>
                updateNoteHandler(note.id, 'title', e.currentTarget.textContent || '')
              }
            > {note.title} </h2>
            <p
              contentEditable
              onInput={(e) =>
                updateNoteHandler(note.id, 'content', e.currentTarget.textContent || '')
              }
            > {note.content} </p>
            <select value={note.label} onChange={(e) =>
              updateNoteHandler(note.id, 'label', e.target.value as Label)
            }>
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>
        ))}
      </div>

      <div className="favorites-list">
        <h2>List of Favorites:</h2>
        <ul>
          {notes
            .filter((note) => favorites.includes(note.id)) 
            .map((favoriteNote) => (
              <li key={favoriteNote.id}>{favoriteNote.title}</li>
            ))}
        </ul>
      </div>
      <ToggleTheme />
    </div>
  );
}
export default App;