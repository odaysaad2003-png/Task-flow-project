import {useState} from "react";
import {Outlet} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import Sidebar from "../shared/components/Sidebar/Sidebar";
import Topbar from "../shared/components/Topbar/Topbar";

export function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // function openSidebar() {
    //     setIsSidebarOpen(true);
    // }

    function closeSidebar() {
        setIsSidebarOpen(false);
    }
    function toggleSidebar() {
        setIsSidebarOpen((currentValue) => !currentValue);
    }

    return (
        <div className="dashboard-layout">
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        className="sidebar-overlay"
                        onClick={closeSidebar}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.22}}
                    />
                )}
            </AnimatePresence>

            <main className="main-area">
                <Topbar onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />

                <section className="page-content">
                    <Outlet />
                </section>
            </main>
        </div>
    );
}
