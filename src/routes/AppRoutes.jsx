import {Routes, Route, Navigate} from "react-router-dom";
import {DashboardLayout} from "../layouts/DashboardLayout";

import DashboardPage from "../pages/DashboardPage";
import ProjectsPage from "../pages/ProjectsPage";
import BoardPage from "../pages/BoardPage";
import SettingsPage from "../pages/SettingsPage";
import TasksPage from "../pages/TasksPage";

import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../pages/LoginPage";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<LoginPage />} />

            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/board" element={<BoardPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/tasks" element={<TasksPage />} />
            </Route>
        </Routes>
    );
}
