'use client';

import { useConnectionStatus } from '@/hooks/useConnectionStatus';
import { useState, useEffect } from 'react';

export default function ConnectionStatus() {
    const { isOnline, connectionQuality, isSlowConnection } = useConnectionStatus();
    const [showNotification, setShowNotification] = useState(false);
    const [previousStatus, setPreviousStatus] = useState<'online' | 'offline'>('online');

    useEffect(() => {
        if (!isOnline && previousStatus === 'online') {
            setShowNotification(true);
            setPreviousStatus('offline');
        } else if (isOnline && previousStatus === 'offline') {
            setShowNotification(true);
            setPreviousStatus('online');
        } else if (isSlowConnection && isOnline) {
            setShowNotification(true);
        }

        // Auto-hide notification after 5 seconds
        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isOnline, isSlowConnection, showNotification, previousStatus]);

    if (!showNotification) return null;

    return (
        <div className="fixed top-4 right-4 z-[10001] max-w-sm">
            <div className={`p-4 rounded-lg shadow-lg border-l-4 ${!isOnline
                    ? 'bg-red-50 border-red-500 text-red-800'
                    : isSlowConnection
                        ? 'bg-yellow-50 border-yellow-500 text-yellow-800'
                        : 'bg-green-50 border-green-500 text-green-800'
                }`}>
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${!isOnline
                            ? 'bg-red-500'
                            : isSlowConnection
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                        }`}></div>

                    <div className="flex-1">
                        <p className="font-semibold">
                            {!isOnline
                                ? 'Sin conexión'
                                : isSlowConnection
                                    ? 'Conexión lenta'
                                    : 'Conexión restaurada'
                            }
                        </p>
                        <p className="text-sm opacity-80">
                            {!isOnline
                                ? 'Verifica tu conexión a internet'
                                : isSlowConnection
                                    ? 'La carga puede ser más lenta'
                                    : 'Todo funcionando correctamente'
                            }
                        </p>
                    </div>

                    <button
                        onClick={() => setShowNotification(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
