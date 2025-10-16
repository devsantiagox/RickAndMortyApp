'use client';

import { useState, useEffect } from 'react';
import { useMounted } from '@/hooks/useMounted';

interface SplashScreenProps {
    onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
    const [progress, setProgress] = useState(0);
    const [currentText, setCurrentText] = useState(0);
    const mounted = useMounted();

    const loadingTexts = [
        "Inicializando pistola portal...",
        "Escaneando multiverso...",
        "Cargando personajes de Rick and Morty...",
        "Preparando viaje interdimensional...",
        "¡Casi listo para explorar!"
    ];

    useEffect(() => {
        if (!mounted) return;

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [onComplete, mounted]);

    useEffect(() => {
        if (!mounted) return;

        const textInterval = setInterval(() => {
            setCurrentText(prev => (prev + 1) % loadingTexts.length);
        }, 1000);

        return () => clearInterval(textInterval);
    }, [mounted, loadingTexts.length]);

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <div className="relative z-10 text-center">
                {/* Logo/Icon with animation */}
                <div className="mb-8">
                    <div className="relative">
                        {/* Outer ring */}
                        <div className="w-32 h-32 border-4 border-cyan-400/30 rounded-full animate-spin mx-auto"></div>
                        {/* Inner ring */}
                        <div className="absolute inset-0 w-32 h-32 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                        {/* Center icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
                                <span className="text-white font-bold text-2xl">SR</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-pulse">
                    Santiago Ruiz
                </h1>
                <p className="text-xl text-cyan-200 mb-8 font-medium">
                    Developer
                </p>

                {/* Loading text */}
                <div className="mb-8 h-8">
                    <p className="text-lg text-cyan-300 transition-all duration-500 ease-in-out">
                        {loadingTexts[currentText]}
                    </p>
                </div>

                {/* Progress bar */}
                <div className="w-80 max-w-full mx-auto">
                    <div className="bg-gray-700/50 rounded-full h-3 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full transition-all duration-300 ease-out relative"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400 mt-2">
                        <span>Cargando...</span>
                        <span>{progress}%</span>
                    </div>
                </div>

                {/* Animated dots */}
                <div className="flex justify-center space-x-2 mt-8">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        />
                    ))}
                </div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-10 left-10 w-20 h-20 border border-cyan-400/20 rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-20 w-16 h-16 border border-blue-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-20 left-20 w-12 h-12 border border-purple-400/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 border border-indigo-400/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
    );
}
