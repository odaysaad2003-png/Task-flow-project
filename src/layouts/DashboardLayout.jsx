import {useState} from "react";
import {Outlet} from "react-router-dom";
import Sidebar from "../shared/components/Sidebar/Sidebar";
import Topbar from "../shared/components/Topbar/Topbar";

export function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    function openSidebar() {
        setIsSidebarOpen(true);
    }

    function closeSidebar() {
        setIsSidebarOpen(false);
    }

    return (
        <div className="dashboard-layout">
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}

            <main className="main-area">
                <Topbar onMenuClick={openSidebar} />

                <section className="page-content">
                    <Outlet />
                </section>
            </main>
        </div>
    );
}
