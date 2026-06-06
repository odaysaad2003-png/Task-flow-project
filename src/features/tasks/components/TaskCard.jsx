import {CalendarDays, CheckCircle2, Circle, Clock3, Flag} from "lucide-react";
import "../style/TaskCard.css";

const statusConfig = {
    todo: {
        label: "Todo",
        icon: Circle,
    },
    "in-progress": {
        label: "In Progress",
        icon: Clock3,
    },
    completed: {
        label: "Completed",
        icon: CheckCircle2,
    },
};

const priorityConfig = {
    low: {
        label: "Low",
    },
    medium: {
        label: "Medium",
    },
    high: {
        label: "High",
    },
};

export default function TaskCard({task}) {
    const status = statusConfig[task.status] || statusConfig.todo;
    const priority = priorityConfig[task.priority] || priorityConfig.low;

    const StatusIcon = status.icon;

    return (
        <article className="task-card">
            <div className="task-card-header">
                <div className={`task-status-badge task-status-${task.status}`}>
                    <StatusIcon size={15} />
                    <span>{status.label}</span>
                </div>

                <div className={`task-priority-badge task-priority-${task.priority}`}>
                    <Flag size={14} />
                    <span>{priority.label}</span>
                </div>
            </div>

            <div className="task-card-body">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
            </div>

            <div className="task-card-footer">
                <div className="task-date">
                    <CalendarDays size={16} />
                    <span>Due {task.dueDate}</span>
                </div>
            </div>
        </article>
    );
}
