// @ts-ignore
import {Routes, Route, Navigate} from "react-router-dom";
// @ts-ignore
import {DashboardLayout} from "../layouts/DashboardLayout";
// @ts-ignore
import DashboardPage from "../pages/DashboardPage";
// @ts-ignore   
import ProjectsPage from "../pages/ProjectsPage";
// @ts-ignore
import BoardPage from "../pages/BoardPage";
// @ts-ignore
import SettingsPage from "../pages/SettingsPage";
import TasksPage from "../pages/TasksPage";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/board" element={<BoardPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/tasks" element={<TasksPage />} />
            </Route>
        </Routes>
    );
}
