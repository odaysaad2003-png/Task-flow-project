import {CheckCircle2, FolderKanban, ListTodo, Flame} from "lucide-react";
import StatsCard from "../shared/components/StatCard/StatsCard";
import {mockProjects, mockTasks} from "../shared/data/mockData";
import {TASK_PRIORITY, TASK_STATUS} from "../shared/constants/taskConstants";
// import ProjectCard from "../features/projects/components/ProjectCard";
// import {Plus} from "lucide-react";
// @ts-ignore
import "../pages/style/DashboardPage.css";
import PageHeader from "../shared/components/PageHeader/PageHeader";
import {useLocalStorage} from "../shared/hooks/useLocalStorage";
export default function DashboardPage() {



    const [projects] = useLocalStorage("taskflow-projects", mockProjects);
    const [tasks] = useLocalStorage("taskflow-tasks", mockTasks);


    const totalProjects = projects.length;
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter((task) => task.status === TASK_STATUS.COMPLETED).length;
    const inProgressTasks = tasks.filter((task) => task.status === TASK_STATUS.IN_PROGRESS).length;
    const highPriorityTasks = tasks.filter((task) => task.priority === TASK_PRIORITY.HIGH).length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;


    const recentTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);



    const todoTasks = tasks.filter((task) => task.status === TASK_STATUS.TODO).length;

    const statusSummary = [
        {
            label: "Todo",
            value: todoTasks,
            status: "todo",
        },
        {
            label: "In Progress",
            value: inProgressTasks,
            status: "in-progress",
        },
        {
            label: "Completed",
            value: completedTasks,
            status: "completed",
        },
    ];
    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <PageHeader
                    eyebrow="Overview"
                    title="Welcome Back, Oday"
                    description="Track your projects, tasks, priorities, and team workflow from one clean dashboard."
                    action={undefined}
                />
            </div>

            <section className="stats-grid">
                <StatsCard
                    title="Total Projects"
                    value={totalProjects}
                    description="Projects saved in your workspace"
                    icon={FolderKanban}
                    accent="indigo"
                    delay={0}
                />

                <StatsCard
                    title="Total Tasks"
                    value={totalTasks}
                    description="Tasks across all projects"
                    icon={ListTodo}
                    accent="violet"
                    delay={0.08}
                />

                <StatsCard
                    title="Completed"
                    value={completedTasks}
                    description={`${completionRate}% completion rate`}
                    icon={CheckCircle2}
                    accent="emerald"
                    delay={0.16}
                />

                <StatsCard
                    title="High Priority"
                    value={highPriorityTasks}
                    description={`${inProgressTasks} tasks in progress`}
                    icon={Flame}
                    accent="rose"
                    delay={0.24}
                />
            </section>

            <section className="dashboard-section">
                <div className="dashboard-section-header">
                    <div>
                        <h2 style={{color: "var(--color-primary)"}}>Task Status Summary</h2>
                        <p style={{color: "var(--color-primary)"}}>
                            Understand how your work is distributed across the workflow.
                        </p>
                    </div>
                </div>

                <div className="status-summary-grid">
                    {statusSummary.map((item) => {
                        const percentage = totalTasks > 0 ? Math.round((item.value / totalTasks) * 100) : 0;

                        return (
                            <div className={`status-summary-card status-summary-${item.status}`} key={item.status}>
                                <div>
                                    <span>{item.label}</span>
                                    <h3>{item.value}</h3>
                                    <p>{percentage}% of total tasks</p>
                                </div>

                                <div className="status-progress">
                                    <div className="status-progress-fill" style={{width: `${percentage}%`}} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="dashboard-section">
                <div className="dashboard-section-header">
                    <div>
                        <h2 style={{color: "var(--color-primary)"}}>Recent Tasks</h2>
                        <p style={{color: "var(--color-primary)"}}>
                            Your latest created tasks across all projects.
                        </p>
                    </div>
                </div>

                <div className="recent-tasks-list">
                    {recentTasks.length > 0 ? (
                        recentTasks.map((task) => (
                            <div className="recent-task-item" key={task.id}>
                                <div>
                                    <h3>{task.title}</h3>
                                    <p>{task.description}</p>
                                </div>

                                <span className={`recent-task-status status-${task.status}`}>{task.status}</span>
                            </div>
                        ))
                    ) : (
                        <div className="dashboard-empty-box">No recent tasks yet.</div>
                    )}
                </div>
            </section>
        </div>
    );
}
