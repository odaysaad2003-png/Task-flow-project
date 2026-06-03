import {CalendarDays, FolderKanban, Pencil, Trash2} from "lucide-react";
import ActionDropdown from "../../../shared/components/ActionDropdown/ActionDropdown";
import "../style/ProjectCard.css";

export default function ProjectCard({project, onDelete, onEdit}) {
    const isActive = project.status === "active";

    const projectActions = [
        {
            label: "Edit project",
            icon: Pencil,
            onClick: () => onEdit(project),
        },
        {
            label: "Delete project",
            icon: Trash2,
            danger: true,
            onClick: () => onDelete(project),
        },
    ];

    return (
        <article className="project-card">
            <div className="project-card-header">
                <div className="project-icon">
                    <FolderKanban size={22} />
                </div>

                <ActionDropdown items={projectActions} />
            </div>

            <div className="project-card-body">
                <div className="project-title-row">
                    <h3>{project.name}</h3>

                    <span className={`project-status ${isActive ? "active" : "archived"}`}>{project.status}</span>
                </div>

                <p>{project.description}</p>
            </div>

            <div className="project-card-footer">
                <div className="project-date">
                    <CalendarDays size={16} />
                    <span>Updated {project.updatedAt}</span>
                </div>
            </div>
        </article>
    );
}
