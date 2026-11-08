import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import TaskInput from "./components/ToDo/TaskInput";
import TaskList from "./components/ToDo/TaskList";
import TaskFilter from "./components/ToDo/TaskFilters";
import Notes from "./components/Notemaking/Home";

function TodoView() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Plan the week ahead", dueDate: "Oct 24", completed: false },
    { id: 2, text: "Review project notes", dueDate: "", completed: true }
  ]);
  const [filter, setFilter] = useState("all");

  const handleAddTask = (text, dueDate) => {
    const newTask = {
      id: Date.now(),
      text,
      dueDate,
      completed: false
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;


  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="todo-view-container">
   
      <header className="main-header">
        <div>
          <span className="subtitle-tag">YOUR DAY, IN ORDER</span>
          <h1 className="page-title">Today’s focus</h1>
          <p className="task-summary-subtitle">
            {pendingCount} {pendingCount === 1 ? "task" : "tasks"} waiting for your attention.
          </p>
        </div>
        <div className="current-date">{todayDate}</div>
      </header>

    
      <TaskInput onAddTask={handleAddTask} />

      
      <div className="tasks-section-header">
        <div>
          <h2 className="section-title">Your tasks</h2>
          <p className="section-subtitle">Keep moving, one check at a time.</p>
        </div>
        <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
      </div>

     
      <TaskList
        tasks={tasks}
        currentFilter={filter}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div id="first">
     
      <aside id="nav">
        <div id="page-name">
          <div id="logo">
            <div className="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div id="logo-name">Daymark</div>
          </div>
        </div>

        <div className="sidebar-section-label">WORKSPACE</div>

        <nav id="taskbar">
          <Link
            to="/"
            className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
          >
            <div className="nav-item-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="4" ry="4"></rect>
                <polyline points="9 11 12 14 22 4"></polyline>
              </svg>
              <span>Tasks</span>
            </div>
            <span className="badge">1</span>
          </Link>

          <Link
            to="/Home"
            className={`nav-item ${location.pathname === "/Home" ? "active" : ""}`}
          >
            <div className="nav-item-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
              <span>Notes</span>
            </div>
            <span className="badge badge-subtle">1</span>
          </Link>
        </nav>

     
        <div className="sidebar-progress-card">
          <span className="card-tag">THIS WEEK</span>
          <div className="progress-value">50% complete</div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: "50%" }}></div>
          </div>
          <p className="progress-subtext">1 of 2 tasks finished</p>
        </div>

        <div className="sidebar-footer">Small steps, clearly marked.</div>
      </aside>

     
      <main id="main">
        <Routes>
          <Route path="/" element={<TodoView />} />
          <Route path="/Home" element={<Notes />} />
        </Routes>
      </main>
    </div>
  );
}