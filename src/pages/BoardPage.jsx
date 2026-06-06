import {ClipboardList} from "lucide-react";
import PageHeader from "../shared/components/PageHeader/PageHeader";
import EmptyState from "../shared/components/EmptyState/EmptyState";
import {useLocalStorage} from "../shared/hooks/useLocalStorage";
import {mockTasks} from "../shared/data/mockData";
import "./style/BoardPage.css";

const boardColumns = [
    {
        id: "todo",
        title: "Todo",
        description: "Tasks waiting to be started.",
    },
    {
        id: "in-progress",
        title: "In Progress",
        description: "Tasks currently being worked on.",
    },
    {
        id: "completed",
        title: "Completed",
        description: "Finished and delivered tasks.",
    },
];

export default function BoardPage() {
    const [tasks] = useLocalStorage("taskflow-tasks", mockTasks);

    const hasTasks = tasks.length > 0;

    return (
        <div className="board-page">
            <PageHeader
                eyebrow="Board"
                title="Kanban workflow"
                description="Visualize your tasks by status and understand where your work is moving."
            />

            {hasTasks ? (
                <section className="board-columns">
                    {boardColumns.map((column) => {
                        const columnTasks = tasks.filter((task) => task.status === column.id);

                        return (
                            <div className="board-column" key={column.id}>
                                <div className="board-column-header">
                                    <div>
                                        <h2>{column.title}</h2>
                                        <p>{column.description}</p>
                                    </div>

                                    <span>{columnTasks.length}</span>
                                </div>

                                <div className="board-column-list">
                                    {columnTasks.map((task) => (
                                        <article className="board-task-card" key={task.id}>
                                            <h3>{task.title}</h3>
                                            <p>{task.description}</p>

                                            <div className={`board-priority priority-${task.priority}`}>
                                                {task.priority}
                                            </div>
                                        </article>
                                    ))}

                                    {columnTasks.length === 0 && (
                                        <div className="board-column-empty">No tasks in this column.</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </section>
            ) : (
                <EmptyState
                    icon={ClipboardList}
                    title="No tasks on the board"
                    description="Create tasks first, then they will automatically appear here based on their status."
                />
            )}
        </div>
    );
}
