'use client'
import { getCurrentUser } from '@/lib/appwrite/api'
import { SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
export const intialUser = {
    name: '',
    email: '',
}

const intialState = {
    user: intialUser,
    isAuth: false,
    setIsAuth: () => { },
    setUser: () => { },
}

type authType = {
    user: { name: string; email: string; };
    isAuth: boolean;
    setIsAuth: React.Dispatch<SetStateAction<boolean>>;
    setUser: React.Dispatch<SetStateAction<{ name: string; email: string }>>;
}
const AuthContext = createContext<authType>(intialState);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const [user, setUser] = useState({
        name: '',
        email: '',
    })
    const [isAuth, setIsAuth] = useState(false)

    async function checkAuth() {
        const res = await getCurrentUser();
        if (res) {
            setIsAuth(true);
            setUser({ name: res.name, email: res.email });
            router.push('/profile');
        }
    }

    useEffect(() => {
        checkAuth();
    }, [])

    return (
        <AuthContext.Provider value={{ user, isAuth, setIsAuth, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider

export const useUser = () => useContext(AuthContext)