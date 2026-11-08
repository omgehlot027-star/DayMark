import { useState } from 'react';

export default function TaskInput({ onAddTask }) {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    let formattedDate = '';
    if (dueDate) {
      const dateObj = new Date(dueDate);
      formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    onAddTask(text.trim(), formattedDate);
    setText('');
    setDueDate('');
  };

  return (
    <div className="add-task-card">
      <div className="add-task-header">
        <div className="plus-icon-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
        <div>
          <h3 className="add-task-title">Add a task</h3>
          <p className="add-task-subtitle">What needs to get done?</p>
        </div>
      </div>

      <form className="add-task-form" onSubmit={handleSubmit}>
        <div className="input-group flex-2">
          <label className="input-label">Task name</label>
          <input
            type="text"
            className="styled-input"
            placeholder="e.g. Send the project update"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="input-group flex-1">
          <label className="input-label">Due date</label>
          <input
            type="date"
            className="styled-input date-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-task-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add task
        </button>
      </form>
    </div>
  );
}