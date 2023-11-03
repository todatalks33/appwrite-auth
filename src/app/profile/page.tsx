'use client'
import { useUser } from '@/context/AuthContext'
import { logoutUserAccount } from '@/lib/appwrite/api'
import { useRouter } from 'next/navigation'

const Profile = () => {
    const router = useRouter()
    const { isAuth } = useUser();
    if (!isAuth) {
        router.push('/login');
    }
    const { user, setIsAuth, setUser } = useUser()
    const handleSubmit = async () => {
        const res = await logoutUserAccount();
        if (res) {
            setIsAuth(false)
            setUser({ name: '', email: '' })
            router.push('/login');
        }
    }
    return (
        <>
            <div>Welcome to your profile</div>
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
            <button onClick={handleSubmit}>Logout</button>
        </>
    )
}

export default Profile