import BoardTaskCard from "../components/BoardTaskCard";
import "../style/BoardColumn.css";

export default function BoardColumn({title, description, tasks, onTaskStatusChange}) {
    const hasTasks = tasks.length > 0;

    return (
        <div className="board-column">
            <div className="board-column-header">
                <div>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>

                <span>{tasks.length}</span>
            </div>

            <div className="board-column-list">
                {hasTasks ? (
                    tasks.map((task) => <BoardTaskCard key={task.id} task={task} onStatusChange={onTaskStatusChange} />)
                ) : (
                    <div className="board-column-empty">No tasks in this column.</div>
                )}
            </div>
        </div>
    );
}
