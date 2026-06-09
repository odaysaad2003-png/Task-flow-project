import "../style/BoardTaskCard.css";
const nextStatusActions = {
    todo: [
        {
            label: "Start",
            nextStatus: "in-progress",
        },
        {
            label: "Complete",
            nextStatus: "completed",
        },
    ],
    "in-progress": [
        {
            label: "Back to Todo",
            nextStatus: "todo",
        },
        {
            label: "Complete",
            nextStatus: "completed",
        },
    ],
    completed: [
        {
            label: "Reopen",
            nextStatus: "in-progress",
        },
    ],
};

export default function BoardTaskCard({task , onStatusChange}) {


      // @ts-ignore
      const actions = nextStatusActions[task.status] || [];

    return (
        <article className="board-task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            <div className={`board-priority priority-${task.priority}`}>{task.priority}</div>
            {actions.length > 0 && (
                <div className="board-task-actions">
                    {actions.map((action) => (
                        <button
                            key={action.nextStatus}
                            type="button"
                            onClick={() => onStatusChange(task.id, action.nextStatus)}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            )}
        </article>
    );
}
