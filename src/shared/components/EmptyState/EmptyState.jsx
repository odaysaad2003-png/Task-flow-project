import {Inbox} from "lucide-react";
import "./EmptyState.css";

export default function EmptyState({icon: Icon = Inbox, title, description, action}) {
    return (
        <div className="empty-state">
            <div className="empty-state-icon">
                <Icon size={28} />
            </div>

            <h3>{title}</h3>

            {description && <p>{description}</p>}

            {action && <div className="empty-state-action">{action}</div>}
        </div>
    );
}
