import {Bell, Search, Plus} from "lucide-react";
import {Sun, Moon} from "lucide-react";
import {useTheme} from "../../../providers/ThemeProvider";
import "./Topbar.css";

export default function Topbar({onMenuClick, isSidebarOpen}) {
    const {isDarkMode, toggleTheme} = useTheme();

    return (
        <header className="topbar">
            <div className="topbar-left">
                <button
                    className={`menu-btn ${isSidebarOpen ? "menu-btn-open" : ""}`}
                    onClick={onMenuClick}
                    aria-label="Toggle sidebar menu"
                >
                    <span className="menu-icon-line" />
                    <span className="menu-icon-line" />
                    <span className="menu-icon-line" />
                </button>

                <div className="topbar-search">
                    <Search size={18} />
                    <input type="text" placeholder="Search projects, tasks..." />
                </div>
            </div>

            <div className="topbar-actions">
                <button className="topbar-btn">
                    <Plus size={18} />
                    <span>New Task</span>
                </button>

                <button className="icon-btn" onClick={toggleTheme}>
                   
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <button className="icon-btn notification-btn">
                    <Bell size={18} />
                    <span className="notification-dot" />
                </button>

                <div className="user-avatar">
                    <span>A</span>
                </div>
            </div>
        </header>
    );
}
