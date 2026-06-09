import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "./ThemeProvider";

// @ts-ignore
export function AppProviders({children}) {

    return (
    <ThemeProvider>
        <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
    )
}
