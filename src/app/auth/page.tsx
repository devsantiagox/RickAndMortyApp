'use client';

import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

export default function AuthPage() {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl flex items-center justify-center gap-8">
                {/* Información lateral */}
                <div className="hidden lg:block flex-1 max-w-md">
                    <div className="space-y-6">
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Rick and Morty
                        </h1>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            Explora el multiverso de Rick and Morty. Accede a información detallada sobre todos los personajes, episodios y ubicaciones.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Acceso completo</h3>
                                    <p className="text-gray-600 text-sm">Explora todos los personajes y episodios</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Favoritos personalizados</h3>
                                    <p className="text-gray-600 text-sm">Guarda tus personajes favoritos</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Sincronización</h3>
                                    <p className="text-gray-600 text-sm">Tus datos seguros en la nube</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formularios */}
                <div className="flex-1 flex items-center justify-center">
                    {showLogin ? (
                        <LoginForm onSwitchToRegister={() => setShowLogin(false)} />
                    ) : (
                        <RegisterForm onSwitchToLogin={() => setShowLogin(true)} />
                    )}
                </div>
            </div>
        </div>
    );
}

