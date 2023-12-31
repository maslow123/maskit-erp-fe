/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

const AuthContext = createContext({});

export default function AuthProvider({ children }) {

    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [splashScreen, setSplashScreen] = useState(false);

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token');
            const userCookie = Cookies.get('user');

            let userData = {};

            if (userCookie) {
                userData = JSON.parse(userCookie);
            }

            if (token && userData) {
                setUser({ ...userData });

                if (['/login', '/register'].includes(pathname)) {
                    router.push('/');
                }
                return
            }
            setLoading(false);

            if (!token && userData) {
                router.push('/login');
                return;
            }
        }

        loadUserFromCookies();
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuthenticated: !!user,
            user,
            setUser,
            authLoading: loading,
            splashScreen,
            setSplashScreen
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ children }) => {
    const pathname = usePathname();
    const noAuthPage = ['/login', '/register'];

    const { isAuthenticated, loading } = useAuth();


    if (typeof window !== undefined) {
        const currentPageNoAuth = noAuthPage.includes(pathname);
        if (loading || (!isAuthenticated && !currentPageNoAuth)) {
            return <>Loading...</>
        }
    }
    return children;
};