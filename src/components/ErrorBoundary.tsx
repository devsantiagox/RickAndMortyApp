'use client';

import { useState } from 'react';

interface ErrorBoundaryProps {
    error: string;
    onRetry?: () => void;
}

export default function ErrorBoundary({ error, onRetry }: ErrorBoundaryProps) {
    const [retryCount, setRetryCount] = useState(0);
    const [isRetrying, setIsRetrying] = useState(false);

    const handleRetry = async () => {
        setIsRetrying(true);
        setRetryCount(prev => prev + 1);

        // Simular un pequeño delay antes de reintentar
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (onRetry) {
            onRetry();
        } else {
            window.location.reload();
        }

        setIsRetrying(false);
    };

    return (
        <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-lg mx-auto shadow-lg">
                <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6 mx-auto">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>

                <h3 className="text-xl font-bold text-red-800 mb-3">Error de Conexión</h3>
                <p className="text-red-600 mb-6 leading-relaxed">
                    {error}
                </p>

                <div className="space-y-3">
                    <button
                        onClick={handleRetry}
                        disabled={isRetrying}
                        className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                        {isRetrying ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Reintentando...
                            </div>
                        ) : (
                            `Reintentar ${retryCount > 0 ? `(${retryCount})` : ''}`
                        )}
                    </button>

                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    >
                        Volver al Inicio
                    </button>
                </div>

                {retryCount > 2 && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-yellow-800 text-sm">
                            💡 <strong>Sugerencia:</strong> Si el problema persiste, verifica tu conexión a internet o intenta más tarde.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
