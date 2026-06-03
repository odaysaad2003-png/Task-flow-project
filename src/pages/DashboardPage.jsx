import {CheckCircle2, FolderKanban, ListTodo, Flame} from "lucide-react";
import StatsCard from "../features/dashboard/components/StatsCard";
import {mockProjects, mockTasks} from "../shared/data/mockData";
import {TASK_PRIORITY, TASK_STATUS} from "../shared/constants/taskConstants";
import ProjectCard from "../features/projects/components/ProjectCard";
import {Plus} from "lucide-react";
// @ts-ignore
import "../pages/style/DashboardPage.css";

export default function DashboardPage() {
    const totalProjects = mockProjects.length;
    const totalTasks = mockTasks.length;

    const completedTasks = mockTasks.filter((task) => task.status === TASK_STATUS.COMPLETED).length;

    const highPriorityTasks = mockTasks.filter((task) => task.priority === TASK_PRIORITY.HIGH).length;

    const hasProjects = mockProjects.length > 0;
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
                    accent="indigo"
                    delay={0}
                />

                <StatsCard
                    title="Total Tasks"
                    value={totalTasks}
                    description="All tasks across projects"
                    icon={ListTodo}
                    accent="violet"
                    delay={0.08}
                />

                <StatsCard
                    title="Completed Tasks"
                    value={completedTasks}
                    description="Tasks finished successfully"
                    icon={CheckCircle2}
                    accent="emerald"
                    delay={0.16}
                />

                <StatsCard
                    title="High Priority"
                    value={highPriorityTasks}
                    description="Tasks that need attention"
                    icon={Flame}
                    accent="rose"
                    delay={0.24}
                />
            </section>
            <>
                {hasProjects ? (
                    <section className="projects-grid">
                        {mockProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </section>
                ) : (
                    <div className="projects-empty-state">
                        <h3>No projects yet</h3>
                        <p>Create your first project to start organizing tasks and workflow.</p>
                        <button className="create-project-btn">
                            <Plus size={18} />
                            <span>Create Project</span>
                        </button>
                    </div>
                )}
            </>
        </div>  
    );
}
