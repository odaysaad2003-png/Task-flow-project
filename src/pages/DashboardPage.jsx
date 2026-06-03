import {CheckCircle2, FolderKanban, ListTodo, Flame} from "lucide-react";
import StatsCard from "../features/dashboard/components/StatsCard";
import {mockProjects, mockTasks} from "../shared/data/mockData";
import {TASK_PRIORITY, TASK_STATUS} from "../shared/constants/taskConstants";
// @ts-ignore
import "../pages/style/DashboardPage.css";

export default function DashboardPage() {
    const totalProjects = mockProjects.length;
    const totalTasks = mockTasks.length;

    const completedTasks = mockTasks.filter((task) => task.status === TASK_STATUS.COMPLETED).length;

    const highPriorityTasks = mockTasks.filter((task) => task.priority === TASK_PRIORITY.HIGH).length;

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <div>
                    <p>Overview</p>
                    <h1>Welcome back, Adi</h1>
                </div>

                <span>Track your projects and team workflow.</span>
            </div>

            <section className="stats-grid">
                <StatsCard
                    title="Total Projects"
                    value={totalProjects}
                    description="Active and archived projects"
                    icon={FolderKanban}
                />

                <StatsCard
                    title="Total Tasks"
                    value={totalTasks}
                    description="All tasks across projects"
                    icon={ListTodo}
                />

                <StatsCard
                    title="Completed Tasks"
                    value={completedTasks}
                    description="Tasks finished successfully"
                    icon={CheckCircle2}
                />

                <StatsCard
                    title="High Priority"
                    value={highPriorityTasks}
                    description="Tasks that need attention"
                    icon={Flame}
                />
            </section>
        </div>
    );
}
