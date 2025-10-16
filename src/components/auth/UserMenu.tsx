'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserMenuProps {
    isOpen: boolean;
    onClose: () => void;
    user: {
        name: string;
        email: string;
    };
}

export default function UserMenu({ isOpen, onClose, user }: UserMenuProps) {
    const { logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        onClose();
        router.push('/auth');
        router.refresh();
    };

    const handleGoHome = () => {
        onClose();
        router.push('/');
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-[9997]"
                onClick={onClose}
            />

            {/* Menu */}
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl z-[10000] border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600">
                    <p className="text-white font-semibold">{user.name}</p>
                    <p className="text-blue-100 text-sm">{user.email}</p>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                    <button
                        onClick={handleGoHome}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Inicio
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </>
    );
}
