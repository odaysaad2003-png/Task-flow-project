import "./PageHeader.css";

export default function PageHeader({eyebrow, title, description, action}) {
    return (
        <div className="page-header">
            <div className="page-header-content">
                {eyebrow && <p>{eyebrow}</p>}

                <h1>{title}</h1>

                {description && <span>{description}</span>}
            </div>

            {action && <div className="page-header-action">{action}</div>}
        </div>
    );
}
