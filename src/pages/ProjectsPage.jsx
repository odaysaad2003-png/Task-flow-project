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
import SearchInput from "../shared/SearchInput/SearchInput";
import SegmentedFilter from "../shared/components/SegmentedFilter/SegmentedFilter";
// @ts-ignore
import "./style/ProjectsPage.css";
import { useLocalStorage } from "../shared/hooks/useLocalStorage";

export default function ProjectsPage() {
    const [projects, setProjects] = useLocalStorage("taskflow", mockProjects); //
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [projectToDelete, setprojectToDelete] = useState(null);
    const [projectToEdit, setProjectToEdit] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");




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

    // /===  serch opration  filter opration///===
    const statusFilterOptions = [
        {label: "All", value: "all"},
        {label: "Active", value: "active"},
        {label: "Archived", value: "archived"},
    ];
   const normalizedSearchQuery = searchQuery.trim().toLowerCase();

   const visibleProjects = projects.filter((project) => {
       const projectName = project.name.toLowerCase();
       const projectDescription = project.description.toLowerCase();
       const projectStatus = project.status.toLowerCase();

       const matchesSearch =
           projectName.includes(normalizedSearchQuery) ||
           projectDescription.includes(normalizedSearchQuery) ||
           projectStatus.includes(normalizedSearchQuery);

       const matchesStatus = statusFilter === "all" || project.status === statusFilter;

       return matchesSearch && matchesStatus;
   });

   const hasVisibleProjects = visibleProjects.length > 0;
   const hasActiveControls = normalizedSearchQuery.length > 0 || statusFilter !== "all";

 // /===  serch opration///=== // /===  filter opration///===




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
            <div className="projects-toolbar">
                <SearchInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onClear={() => setSearchQuery("")}
                    placeholder="Search projects by name, description, or status..."
                />
                <SegmentedFilter options={statusFilterOptions} value={statusFilter} onChange={setStatusFilter} />
            </div>
            {hasProjects ? (
                hasVisibleProjects ? (
                    <section className="projects-grid">
                        {visibleProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onEdit={handleAskEdit}
                                onDelete={handleAskDelete}
                            />
                        ))}
                    </section>
                ) : (
                    <EmptyState
                        title="No matching projects"
                        description={
                            hasActiveControls
                                ? "No projects match your current search or filter. Try changing the keyword or status."
                                : "No projects to show right now."
                        }
                        action={
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setSearchQuery("");
                                    setStatusFilter("all");
                                }}
                            >
                                Reset Filters
                            </Button>
                        }
                    />
                )
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
