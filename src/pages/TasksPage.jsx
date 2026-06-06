import {Plus, ListTodo} from "lucide-react";
import PageHeader from "../shared/components/PageHeader/PageHeader";
import Button from "../shared/components/Butoon/Button";
import EmptyState from "../shared/components/EmptyState/EmptyState";

import {useLocalStorage} from "../shared/hooks/useLocalStorage";
import {mockTasks} from "../shared/data/mockData";
import TaskCard from "../features/tasks/components/TaskCard";
import SearchInput from "../shared/SearchInput/SearchInput";
import SegmentedFilter from "../shared/components/SegmentedFilter/SegmentedFilter";
// @ts-ignore
import Modal from "../shared/components/Modal/Modal";
import CreateTaskForm from "../features/tasks/components/CreateTaskForm";
import {mockProjects} from "../shared/data/mockData";
import "./style/TasksPage.css";
import {useState} from "react";
import ConfirmDialog from "../shared/components/ConfirmDialog/ConfirmDialog";

const statusOptions = [
    {label: "All", value: "all"},
    {label: "Todo", value: "todo"},
    {label: "In Progress", value: "in-progress"},
    {label: "Completed", value: "completed"},
];

const priorityOptions = [
    {label: "All", value: "all"},
    {label: "Low", value: "low"},
    {label: "Medium", value: "medium"},
    {label: "High", value: "high"},
];

export default function TasksPage() {
    const [tasks, setTasks] = useLocalStorage("taskflow-tasks", mockTasks);
    const [projects] = useLocalStorage("taskflow", mockProjects);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    function openCreateModal() {
        setIsCreateModalOpen(true);
    }

    function closeCreateModal() {
        setIsCreateModalOpen(false);
    }

    const normalizedSearchQuery = searchQuery.trim().toLowerCase();

    const visibleTasks = tasks.filter((task) => {
        const taskTitle = task.title.toLowerCase();
        const taskDescription = task.description.toLowerCase();

        const matchesSearch =
            taskTitle.includes(normalizedSearchQuery) || taskDescription.includes(normalizedSearchQuery);

        const matchesStatus = statusFilter === "all" || task.status === statusFilter;

        const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    const hasTasks = tasks.length > 0;
    const hasVisibleTasks = visibleTasks.length > 0;







    function handleCreateTask(taskData) {
        const today = new Date().toISOString().split("T")[0];

        const newTask = {
            id: crypto.randomUUID(),
            projectId: taskData.projectId,
            title: taskData.title,
            description: taskData.description,
            status: taskData.status,
            priority: taskData.priority,
            dueDate: taskData.dueDate,
            createdAt: today,
            updatedAt: today,
        };

        setTasks((currentTasks) => [newTask, ...currentTasks]);
        closeCreateModal();
    }

    function getProjectName(projectId) {
        const project = projects.find((project) => project.id === projectId);

        return project ? project.name : "Unknown Project";
    }


    // edit task operations
    function handleAskEditTask(task) {
        setTaskToEdit(task);
    }

    function closeEditModal() {
        setTaskToEdit(null);
    }

    function handleUpdateTask(updatedTaskData) {
        const today = new Date().toISOString().split("T")[0];

        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === taskToEdit.id
                    ? {
                          ...task,
                          projectId: updatedTaskData.projectId,
                          title: updatedTaskData.title,
                          description: updatedTaskData.description,
                          status: updatedTaskData.status,
                          priority: updatedTaskData.priority,
                          dueDate: updatedTaskData.dueDate,
                          updatedAt: today,
                      }
                    : task
            )
        );

        closeEditModal();
    }
    function handleAskDeleteTask(task) {
        setTaskToDelete(task);
    }

    function handleConfirmDeleteTask() {
        setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskToDelete.id));

        setTaskToDelete(null);
    }

    return (
        <div className="tasks-page">
            <PageHeader
                eyebrow="Tasks"
                title="Manage your tasks"
                description="Create, organize, and track tasks across all your projects."
                action={
                    <Button icon={Plus} onClick={openCreateModal}>
                        New Task
                    </Button>
                }
            />
            <div className="tasks-toolbar">
                <SearchInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onClear={() => setSearchQuery("")}
                    placeholder="Search tasks by title or description..."
                />

                <div className="tasks-filters">
                    <SegmentedFilter options={statusOptions} value={statusFilter} onChange={setStatusFilter} />

                    <SegmentedFilter options={priorityOptions} value={priorityFilter} onChange={setPriorityFilter} />
                </div>
            </div>

            {hasTasks ? (
                hasVisibleTasks ? (
                    <section className="tasks-grid">
                        {visibleTasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                getProjectName={getProjectName}
                                // @ts-ignore
                                onEdit={handleAskEditTask}
                                onDelete={handleAskDeleteTask}
                            />
                        ))}
                    </section>
                ) : (
                    <EmptyState
                        icon={ListTodo}
                        title="No matching tasks"
                        description="No tasks match your current search or filters. Try changing the keyword, status, or priority."
                        action={
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setSearchQuery("");
                                    setStatusFilter("all");
                                    setPriorityFilter("all");
                                }}
                            >
                                Reset Filters
                            </Button>
                        }
                    />
                )
            ) : (
                <EmptyState
                    icon={ListTodo}
                    title="No tasks yet"
                    description="Create your first task and connect it to a project to start tracking real work."
                    action={
                        <Button icon={Plus} onClick={openCreateModal}>
                            Create Task
                        </Button>
                    }
                />
            )}

            <Modal
                isOpen={isCreateModalOpen}
                onClose={closeCreateModal}
                title="Create new task"
                description="Add a task, connect it to a project, and define its status, priority, and due date."
            >
                <CreateTaskForm projects={projects} onSubmit={handleCreateTask} onCancel={closeCreateModal} />
            </Modal>
            <Modal
                isOpen={Boolean(taskToEdit)}
                onClose={closeEditModal}
                title="Edit task"
                description="Update the task details, project, status, priority, and due date."
            >
                {taskToEdit && (
                    <CreateTaskForm
                        projects={projects}
                        initialValues={{
                            projectId: taskToEdit.projectId,
                            title: taskToEdit.title,
                            description: taskToEdit.description,
                            status: taskToEdit.status,
                            priority: taskToEdit.priority,
                            dueDate: taskToEdit.dueDate,
                        }}
                        submitLabel="Save Changes"
                        onSubmit={handleUpdateTask}
                        onCancel={closeEditModal}
                    />
                )}
            </Modal>
            <ConfirmDialog
                isOpen={Boolean(taskToDelete)}
                type="danger"
                title="Delete task?"
                description={
                    taskToDelete
                        ? `Are you sure you want to delete "${taskToDelete.title}"? This action cannot be undone.`
                        : ""
                }
                confirmLabel="Delete"
                cancelLabel="Cancel"
                onConfirm={handleConfirmDeleteTask}
                onCancel={() => setTaskToDelete(null)}
            />
        </div>
    );
}
