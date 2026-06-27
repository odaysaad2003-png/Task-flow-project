import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "./ThemeProvider";
import {AuthProvider} from "../context/AuthContext";
// @ts-ignore
export function AppProviders({children}) {

    return (
        <ThemeProvider>
            <AuthProvider>
                <BrowserRouter>{children}</BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}
