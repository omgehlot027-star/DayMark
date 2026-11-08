import React, { useState } from 'react';

import "../../index.css";

export default function Notes() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Weekly reflections & goals',
      category: 'Personal',
      text: 'Focus on finishing the Daymark design system and keeping tasks organized. Take time for a walk every evening.',
      date: 'Nov 8'
    }
  ]);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Ideas');
  const [text, setText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreateNote = (e) => {
    e.preventDefault();
    if (!title.trim() && !text.trim()) return;

    const newNote = {
      id: Date.now(),
      title: title.trim() || 'Untitled thought',
      category,
      text: text.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };

    setNotes([newNote, ...notes]);
    setTitle('');
    setText('');
    setCategory('Ideas');
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter((note) => {
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.text.toLowerCase().includes(query) ||
      note.category.toLowerCase().includes(query)
    );
  });

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="notes-view-container">
      {/* Top Header */}
      <header className="main-header">
        <div>
          <span className="subtitle-tag">YOUR THINKING SPACE</span>
          <h1 className="page-title">Notes & ideas</h1>
          <p className="task-summary-subtitle">
            Capture what matters before it slips away.
          </p>
        </div>
        <div className="current-date">{todayDate}</div>
      </header>

     
      <div className="add-task-card note-form-card">
        <div className="add-task-header">
          <div className="plus-icon-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <div>
            <h3 className="add-task-title">Create a note</h3>
            <p className="add-task-subtitle">Give that thought a place to live.</p>
          </div>
        </div>

        <form onSubmit={handleCreateNote}>
          <div className="note-form-row">
            <div className="input-group flex-3">
              <label className="input-label">Title</label>
              <input
                type="text"
                className="styled-input"
                placeholder="Untitled thought"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="input-group flex-1">
              <label className="input-label">Category</label>
              <select
                className="styled-input select-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Ideas">Ideas</option>
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Study">Study</option>
              </select>
            </div>
          </div>

          <div className="input-group full-width margin-top-md">
            <label className="input-label">Note</label>
            <textarea
              className="styled-input note-textarea"
              placeholder="Start writing..."
              rows="4"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>

          <div className="note-form-footer">
            <button type="submit" className="submit-task-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Create note
            </button>
          </div>
        </form>
      </div>

      {/* All Notes Header & Search */}
      <div className="tasks-section-header">
        <div>
          <h2 className="section-title">All notes</h2>
          <p className="section-subtitle">
            {notes.length} {notes.length === 1 ? 'note' : 'notes'} in your collection.
          </p>
        </div>

        <div className="note-search-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="note-search-input"
            placeholder="Search notes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

     
      {filteredNotes.length === 0 ? (
        <p className="empty-message">No notes found matching your search.</p>
      ) : (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <div key={note.id} className="note-card">
              <div className="note-card-header">
                <span className={`note-category-badge category-${note.category.toLowerCase()}`}>
                  {note.category}
                </span>

                <div className="task-actions">
                  <button className="icon-btn" title="Edit note">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  </button>
                  <button className="icon-btn delete-icon-btn" onClick={() => handleDeleteNote(note.id)} title="Delete note">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <h4 className="note-card-title">{note.title}</h4>
              <p className="note-card-text">{note.text}</p>
              <span className="note-card-date">{note.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}