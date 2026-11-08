import TaskItem from './TaskItem';

export default function TaskList({ tasks, currentFilter, onToggleTask, onDeleteTask }) {
  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === 'pending') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    return <p className="empty-message">No tasks available.</p>;
  }

  return (
    <div className="task-cards-list">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}