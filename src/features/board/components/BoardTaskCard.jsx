import "../style/BoardTaskCard.css";

export default function BoardTaskCard({task}) {
    return (
        <article className="board-task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            <div className={`board-priority priority-${task.priority}`}>{task.priority}</div>
        </article>
    );
}
