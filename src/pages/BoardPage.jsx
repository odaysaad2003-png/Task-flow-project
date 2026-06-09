import {ClipboardList} from "lucide-react";
import PageHeader from "../shared/components/PageHeader/PageHeader";
import EmptyState from "../shared/components/EmptyState/EmptyState";
import BoardColumn from "../features/board/components/BoardColumn";
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
    const [tasks , setTasks] = useLocalStorage("taskflow-tasks", mockTasks);

    const hasTasks = tasks.length > 0;


    function handleUpdateTaskStatus(taskId, newStatus) {
        const today = new Date().toISOString().split("T")[0];

        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === taskId
                    ? {
                          ...task,
                          status: newStatus,
                          updatedAt: today,
                      }
                    : task
            )
        );
    }

    return (
        <div className="board-page">
            <PageHeader
                eyebrow="Board"
                title="Kanban Workflow"
                description="Visualize your tasks by status and understand where your work is moving."
            />

            {hasTasks ? (
                <section className="board-columns">
                    {boardColumns.map((column) => {
                        const columnTasks = tasks.filter((task) => task.status === column.id);

                        return (
                            <BoardColumn
                                key={column.id}
                                title={column.title}
                                description={column.description}
                                tasks={columnTasks}
                                onTaskStatusChange={handleUpdateTaskStatus}
                            />
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
