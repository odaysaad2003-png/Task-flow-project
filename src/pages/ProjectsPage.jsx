import {Plus, FolderKanban} from "lucide-react";
import ProjectCard from "../features/projects/components/ProjectCard";
import {mockProjects} from "../shared/data/mockData";
import PageHeader from "../shared/components/PageHeader/PageHeader";
import EmptyState from "../shared/components/EmptyState/EmptyState";
import Button from "../shared/components/Butoon/Button";
import "../pages/style/ProjectsPage.css";
import { useState } from "react";
import Modal from "../shared/components/Modal/Modal";
// import StatsCard from "../shared/components/StatCard/StatsCard";

export default function ProjectsPage() {
    const hasProjects = mockProjects.length > 0;

    // const [project, setProject] = useState(mockProjects);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    function openCreateModal() {
        setIsCreateModalOpen(true);
    }
    function closeCreateModal() {
        setIsCreateModalOpen(false);
    }


    return (
        <div className="projects-page">
            <PageHeader
                eyebrow="Projects"
                title="Manage your workspaces"
                description="Track active projects, archived work, and everything your team is building."
                action={
                    <Button icon={Plus} onClick={openCreateModal}>
                        New Project
                    </Button>
                }
            />

            {hasProjects ? (
                <section className="projects-grid">
                    {mockProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </section>
            ) : (
                <EmptyState
                    icon={FolderKanban}
                    title="No projects yet"
                    description="Create your first project to start organizing tasks and workflow."
                    action={<Button icon={Plus}>Create Project</Button>}
                />
            )}

            <Modal
                isOpen={isCreateModalOpen}
                onClose={closeCreateModal}
                title="Create new project"
                description="Add a new workspace to organize tasks, priorities, and team progress."
            >
                <p style={{margin: 0, color: "var(--color-text-muted)", lineHeight: 1.7}}>
                    Project form will be added in the next step.
                </p>
            </Modal>
        </div>
    );
}
