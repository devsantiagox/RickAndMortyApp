'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserMenu from './UserMenu';

export default function AuthButton() {
    const { user, isAuthenticated, checkAuth } = useAuthStore();
    const router = useRouter();
    const [showMenu, setShowMenu] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        checkAuth();
    }, [checkAuth]);

    const handleLogin = () => {
        router.push('/auth');
    };

    if (!mounted) {
        return (
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
        );
    }

    if (!isAuthenticated || !user) {
        return (
            <button
                onClick={handleLogin}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
                Iniciar Sesión
            </button>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <svg
                    className={`w-4 h-4 text-gray-600 transition-transform ${showMenu ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <UserMenu
                isOpen={showMenu}
                onClose={() => setShowMenu(false)}
                user={user}
            />
        </div>
    );
}

