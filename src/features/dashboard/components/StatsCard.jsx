import "./StatsCard.css";

export default function StatsCard({title, value, description, icon: Icon}) {
    return (
        <article className="stats-card">
            <div className="stats-card-content">
                <p>{title}</p>
                <h3>{value}</h3>
                <span>{description}</span>
            </div>

            <div className="stats-card-icon">
                <Icon size={22} />
            </div>
        </article>
    );
}
