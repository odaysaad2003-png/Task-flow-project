import {motion} from "framer-motion";
import "../StatCard/StatsCard.css"

export default function StatsCard({title, value, description, icon: Icon, accent = "indigo", delay = 0}) {
    return (
        <motion.article
            className={`stats-card stats-card-${accent}`}
            initial={{opacity: 0, y: 18, scale: 0.98}}
            animate={{opacity: 1, y: 0, scale: 1}}
            transition={{
                duration: 0.45,
                delay,
                ease: "easeOut",
            }}
            whileHover={{
                y: -6,
            }}
        >
            <div className="stats-card-glow" />

            <div className="stats-card-content">
                <p>{title}</p>
                <h3>{value}</h3>
                <span>{description}</span>
            </div>

            <motion.div
                className="stats-card-icon"
                whileHover={{rotate: -8, scale: 1.08}}
                transition={{type: "spring", stiffness: 260, damping: 18}}
            >
                <Icon size={22} />
            </motion.div>
        </motion.article>
    );
}
