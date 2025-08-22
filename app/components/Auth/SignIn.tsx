// app/components/Auth/SignIn.tsx
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSignIn = async () => {
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/'); // Redirect to home page after successful sign-in

        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push('/'); // Redirect to home page after successful sign-in
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Sign In</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 px-3 py-2 border rounded"
                    value={email}
                    onChange={handleEmailChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 px-3 py-2 border rounded"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button
                    onClick={handleSignIn}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Sign In
                </button>
                <button
                    onClick={handleGoogleSignIn}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}