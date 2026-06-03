import {useState} from "react";
import {Plus, FolderKanban} from "lucide-react";
import ProjectCard from "../features/projects/components/ProjectCard";
import CreateProjectForm from "../features/projects/components/CreateProjectForm";
import {mockProjects} from "../shared/data/mockData";
import PageHeader from "../shared/components/PageHeader/PageHeader";
import EmptyState from "../shared/components/EmptyState/EmptyState";
import Button from "../shared/components/Butoon/Button";
import Modal from "../shared/components/Modal/Modal";
// @ts-ignore
import "./style/ProjectsPage.css";
import { useLocalStorage } from "../shared/hooks/useLocalStorage";

export default function ProjectsPage() {
    const [projects, setProjects] = useLocalStorage("taskflow", mockProjects);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const hasProjects = projects.length > 0;

    function openCreateModal() {
        setIsCreateModalOpen(true);
    }

    function closeCreateModal() {
        setIsCreateModalOpen(false);
    }

    // @ts-ignore
    function handleCreateProject(projectData) {
        const today = new Date().toISOString().split("T")[0];

        const newProject = {
            id: crypto.randomUUID(),
            name: projectData.name,
            description: projectData.description,
            status: projectData.status,
            createdAt: today,
            updatedAt: today,
        };

        setProjects((currentProjects) => [newProject, ...currentProjects]);
        closeCreateModal();
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
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </section>
            ) : (
                <EmptyState
                    icon={FolderKanban}
                    title="No projects yet"
                    description="Create your first project to start organizing tasks and workflow."
                    action={
                        <Button icon={Plus} onClick={openCreateModal}>
                            Create Project
                        </Button>
                    }
                />
            )}

            <Modal
                isOpen={isCreateModalOpen}
                onClose={closeCreateModal}
                title="Create new project"
                description="Add a new workspace to organize tasks, priorities, and team progress."
            >
                <CreateProjectForm onSubmit={handleCreateProject} onCancel={closeCreateModal} />
            </Modal>
        </div>
    );
}
