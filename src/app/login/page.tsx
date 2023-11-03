'use client'
import { useUser } from '@/context/AuthContext';
import { getCurrentUser, loginUserAccoutn } from '@/lib/appwrite/api';
import { useSigninAccount } from '@/lib/react-query/queriesAndMutation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react'

const Login = () => {
    const router = useRouter()
    const { mutateAsync: signInAccount, isPending: isSigning } = useSigninAccount()
    const { setIsAuth, setUser } = useUser()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const session = await signInAccount({ email: formData.email, password: formData.password })
        if (!session) {
            alert('something went wrong in login')
        }
        if (session) {
            getCurrentUser().then((user) => {
                setUser({ name: user?.name, email: user?.email })
                setIsAuth(true);
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
                            {isSigning ? 'Loading...' : 'Login'}
                        </button>
                    </div>
                    <p className='text-black'>Dont have an accoutn <Link href='/signup' className='text-blue-500'>Signup</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Login