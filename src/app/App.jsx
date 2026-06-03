import {AppProviders} from "../providers/AppProviders";
// @ts-ignore
import {AppRoutes} from "../routes/AppRoutes";

export default function App() {
    return (
        <AppProviders>
            <AppRoutes />
        </AppProviders>
    );
}
