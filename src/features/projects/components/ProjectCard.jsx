import {CalendarDays, MoreHorizontal, FolderKanban} from "lucide-react";
import "../style/ProjectCard.css";

export default function ProjectCard({project}) {
    const isActive = project.status === "active";

    return (
        <article className="project-card">
            <div className="project-card-header">
                <div className="project-icon">
                    <FolderKanban size={22} />
                </div>

                <button className="project-menu-btn">
                    <MoreHorizontal size={20} />
                </button>
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
