'use client'

import React, { useState, useEffect } from 'react';
import { useSignUp, useUser } from '@clerk/nextjs';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Page() {
    const { user } = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isLoaded, signUp, setActive } = useSignUp();
    const [username, setUserName] = useState('');
    // const [lastName, setLastName] = React.useState('')
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const token = searchParams.get('__clerk_ticket');

    useEffect(() => {
        if (user?.id) {
            router.push('/');
        }
    }, [user, router]);

    if (!token) {
        return <p className="text-red-500">No invitation token found.</p>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            if (!isLoaded) {
                throw new Error('Sign-up not loaded yet.');
            }

            if (!username || !password ) {
                throw new Error('Please fill in all fields.');
            }

            // Here's the key change - using first_name instead of firstName
            const signUpAttempt = await signUp.create({
                strategy: 'ticket',
                ticket: token,
                username,
                // lastName,
                password
            });

            console.log('Sign-up attempt result:', signUpAttempt);

            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId });
                router.push('/');
            } else {
                throw new Error('Sign-up incomplete. Please try again.');
            }
        } catch (err) {
            console.error('Sign-up error:', err);
            setError(err.message || 'An error occurred during sign-up.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-gray-800 rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-white">Sign up</h1>

            {error && (
                <div className="mb-4 p-3 bg-red-500 text-white rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-white">
                        First name
                    </label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        disabled={isSubmitting}
                    />
                </div>
                {/*<div className="space-y-2">*/}
                {/*    <label htmlFor="firstName" className="block text-white">*/}
                {/*        Last name*/}
                {/*    </label>*/}
                {/*    <input*/}
                {/*        id="lastName"*/}
                {/*        type="text"*/}
                {/*        name="lastName"*/}
                {/*        value={lastName}*/}
                {/*        onChange={(e) => setLastName(e.target.value)}*/}
                {/*        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"*/}
                {/*        disabled={isSubmitting}*/}
                {/*    />*/}
                {/*</div>*/}


                <div className="space-y-2">
                    <label htmlFor="password" className="block text-white">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        disabled={isSubmitting}
                        minLength={8}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting || !isLoaded}
                >
                    {isSubmitting ? 'Signing up...' : 'Sign up'}
                </button>
            </form>
        </div>
    );
}