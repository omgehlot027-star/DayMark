export default function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <div className={`task-card-item ${task.completed ? 'completed' : ''}`}>
    
      <button
        className={`custom-checkbox ${task.completed ? 'checked' : ''}`}
        onClick={() => onToggleTask(task.id)}
        aria-label="Toggle task"
      >
        {task.completed && (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </button>

 
      <div className="task-info">
        <div className="task-title-text">{task.text}</div>
        <div className="task-meta-row">
          <span className="task-date-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {task.dueDate ? task.dueDate : "No due date"}
          </span>

          <span className={`status-pill ${task.completed ? 'status-completed' : 'status-pending'}`}>
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button className="icon-btn edit-icon-btn" title="Edit task">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
        </button>

        <button className="icon-btn delete-icon-btn" onClick={() => onDeleteTask(task.id)} title="Delete task">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}