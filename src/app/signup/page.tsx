'use client'
import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/AuthContext';
import { useCreateUserAccount, useSigninAccount } from '@/lib/react-query/queriesAndMutation';
import { getCurrentUser } from '@/lib/appwrite/api';


const Signup = () => {
    const router = useRouter();
    const { setUser, setIsAuth, isAuth } = useUser();
    if (isAuth) {
        router.push('/profile')
    }
    const { mutateAsync: createUserAccount, isPending: isCreatingUser } = useCreateUserAccount()
    const { mutateAsync: signInAccount, isPending: isSigning } = useSigninAccount()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newUser = await createUserAccount(formData)
        if (!newUser) {
            alert("something went wrong")
        }

        const session = await signInAccount({ email: formData.email, password: formData.password })

        if (!session) {
            alert('somethign went error in login')
        }
        if (session) {
            getCurrentUser().then((user) => {
                setIsAuth(true);
                setUser({ name: user.name, email: user.email })
                router.push('/profile')
            })
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="w-full border text-black border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full border text-black border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full border text-black border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                        >
                            {isCreatingUser ? 'Loading...' : 'Signup'}
                        </button>
                    </div>
                    <p className='text-black'>Already register <Link href='/login' className='text-blue-500'>Login</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Signup