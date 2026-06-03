import {BrowserRouter} from "react-router-dom";

// @ts-ignore
export function AppProviders({children}) {
    return <BrowserRouter>{children}</BrowserRouter>;
}
