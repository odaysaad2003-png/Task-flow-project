import {useState} from "react";
import {Plus, FolderKanban} from "lucide-react";
import ProjectCard from "../features/projects/components/ProjectCard";
import CreateProjectForm from "../features/projects/components/CreateProjectForm";
import {mockProjects} from "../shared/data/mockData";
import PageHeader from "../shared/components/PageHeader/PageHeader";
import EmptyState from "../shared/components/EmptyState/EmptyState";
import Button from "../shared/components/Butoon/Button";
import Modal from "../shared/components/Modal/Modal";
import ConfirmDialog from "../shared/components/ConfirmDialog/ConfirmDialog";
// @ts-ignore
import "./style/ProjectsPage.css";
import { useLocalStorage } from "../shared/hooks/useLocalStorage";

export default function ProjectsPage() {
    const [projects, setProjects] = useLocalStorage("taskflow", mockProjects); //
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [projectToDelete, setprojectToDelete] = useState(null);
    const [projectToEdit, setProjectToEdit] = useState(null);



    // edit project oprations
    function handleAskEdit(project) {
        setProjectToEdit(project);
    }

    function closeEditModal() {
        setProjectToEdit(null);
    }
    function handleUpdateProject(updatedProjectData) {
        const today = new Date().toISOString().split("T")[0];

        setProjects((currentProjects) =>
            currentProjects.map((project) =>
                project.id === projectToEdit.id
                    ? {
                          ...project,
                          name: updatedProjectData.name,
                          description: updatedProjectData.description,
                          status: updatedProjectData.status,
                          updatedAt: today,
                      }
                    : project
            )
        );

        closeEditModal();
    }
    // edit project oprations
    // delet project oprations
    // @ts-ignore
    function handleAskDelete(projects) {
        setprojectToDelete(projects);
    }
    function handleConfirmDelete() {
        setProjects((currentprojects) => currentprojects.filter((project) => project.id !== projectToDelete.id));
        setprojectToDelete(null);
    }


    // delet project oprations
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
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onDelete={handleAskDelete}
                            onEdit={handleAskEdit}
                        />
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
            <ConfirmDialog
                isOpen={Boolean(projectToDelete)}
                type="danger"
                title="Delete project?"
                description={
                    projectToDelete
                        ? `Are you sure you want to delete ${projectToDelete.name}? This action cannot be undone.`
                        : ""
                }
                confirmLabel="Delete"
                cancelLabel="Cancel"
                onConfirm={handleConfirmDelete}
                onCancel={() => setprojectToDelete(null)}
            />
            <Modal
                isOpen={Boolean(projectToEdit)}
                onClose={closeEditModal}
                title="Edit project"
                description="Update project information, status, and progress details."
            >
                {projectToEdit && (
                    <CreateProjectForm
                        initialValues={{
                            name: projectToEdit.name,
                            description: projectToEdit.description,
                            status: projectToEdit.status,
                        }}
                        submitLabel="Save Changes"
                        onSubmit={handleUpdateProject}
                        onCancel={closeEditModal}
                    />
                )}
            </Modal>
        </div>
    );
}
