import {Plus, ListTodo} from "lucide-react";
import PageHeader from "../shared/components/PageHeader/PageHeader";
import Button from "../shared/components/Butoon/Button";
import EmptyState from "../shared/components/EmptyState/EmptyState";

import {useLocalStorage} from "../shared/hooks/useLocalStorage";
import {mockTasks} from "../shared/data/mockData";
import TaskCard from "../features/tasks/components/TaskCard";
// @ts-ignore
import "./style/TasksPage.css";

export default function TasksPage() {

const [tasks, setTasks] = useLocalStorage("taskflow-tasks", mockTasks);

    const hasTasks = tasks.length > 0;

    return (
        <div className="tasks-page">
            <PageHeader
                eyebrow="Tasks"
                title="Manage your tasks"
                description="Create, organize, and track tasks across all your projects."
                action={<Button icon={Plus}>New Task</Button>}
            />

            {hasTasks ? (
                <section className="tasks-grid">{
                    tasks.map((task)=>{
                        return <TaskCard key={task.id} task={task}/>
                    })
                }</section>
            ) : (
                <EmptyState
                    icon={ListTodo}
                    title="No tasks yet"
                    description="Create your first task and connect it to a project to start tracking real work."
                    action={<Button icon={Plus}>Create Task</Button>}
                />
            )}
        </div>
    );
}
