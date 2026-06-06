import {NavLink} from "react-router-dom";
import {LayoutDashboard, FolderKanban, Columns3, Settings, Sparkles, X, ListTodo} from "lucide-react";
import "./Sidebar.css";

const navItems = [
    {label: "Dashboard", path: "/dashboard", icon: LayoutDashboard},
    {label: "Projects", path: "/projects", icon: FolderKanban},
    {
        label: "Tasks",
        path: "/tasks",
        icon: ListTodo,
    },
    {label: "Board", path: "/board", icon: Columns3},
    {label: "Settings", path: "/settings", icon: Settings},
];

export default function Sidebar({isOpen, onClose}) {
    return (
        <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
            <div className="sidebar-header">
                <div className="sidebar-brand">
                    <div className="brand-icon">
                        <Sparkles size={20} />
                    </div>

                    <div>
                        <h2>TaskFlow</h2>
                        <span>Project OS</span>
                    </div>
                </div>

                <button className="sidebar-close" onClick={onClose}>
                    <X size={18} />
                </button>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={({isActive}) => (isActive ? "sidebar-link active" : "sidebar-link")}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className="sidebar-upgrade">
                <p>Upgrade your workflow</p>
                <span>Smart planning starts here.</span>
            </div>
        </aside>
    );
}
