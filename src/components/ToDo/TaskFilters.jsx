export default function TaskFilter({ currentFilter, onFilterChange }) {
  const filters = ['all', 'pending', 'completed'];

  return (
    <div className="task-filter-pill-container">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`filter-pill ${currentFilter === filter ? 'active' : ''}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}