import {createContext, useContext, useState, useEffect} from "react";
import {auth} from "../features/auth/auth";

// 1. إنشاء الكونتكست
const AuthContext = createContext();

// 2. Provider
export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // تحميل المستخدم عند فتح التطبيق
    useEffect(() => {
        const storedUser = auth.getUser();
        const token = auth.getToken();

        if (storedUser && token) {
            setUser(storedUser);
        }

        setLoading(false);
    }, []);

    // login
    const login = (userData) => {
        auth.login(userData);
        setUser(userData);
    };

    // logout
    const logout = () => {
        auth.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                logout,
                isAuthenticated: !!user,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// 3. Hook جاهز للاستخدام
export function useAuth() {
    return useContext(AuthContext);
}
