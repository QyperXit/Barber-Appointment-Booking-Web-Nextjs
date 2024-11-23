'use client';
import { useState } from 'react';
import { Loader2 } from "lucide-react";

const InvitationForm = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/invite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email_address: email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Invitation sent successfully!');
                setEmail('');
            } else {
                // Convert the entire error object to a string
                setMessage(JSON.stringify(data));
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 border-4  mt-8 ">
            <h2 className="text-2xl font-bold mb-4 text-white ">Invite a New User</h2>
            <p className="text-gray-600 mb-6">
                Send an invitation email to a new client.
            </p>
            {message && (
                <p className={`text-sm mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                    {message}
                </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary  hover:bg-primary/90 text-white font-medium p-2 rounded-md disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                            Sending...
                        </span>
                    ) : (
                        'Send Invitation'
                    )}
                </button>
            </form>
        </div>
    );
};

export default InvitationForm;