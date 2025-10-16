'use client';

import { useState, useEffect } from 'react';

export function useConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [connectionQuality, setConnectionQuality] = useState<'good' | 'slow' | 'poor'>('good');

  useEffect(() => {
    // Detectar estado de conexión
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Detectar calidad de conexión
    const checkConnectionQuality = async () => {
      if (!navigator.onLine) {
        setConnectionQuality('poor');
        return;
      }

      try {
        const startTime = Date.now();
        await fetch('https://rickandmortyapi.com/api/character/1', {
          method: 'HEAD',
          cache: 'no-cache',
        });
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        if (responseTime < 1000) {
          setConnectionQuality('good');
        } else if (responseTime < 3000) {
          setConnectionQuality('slow');
        } else {
          setConnectionQuality('poor');
        }
      } catch {
        setConnectionQuality('poor');
      }
    };

    // Event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Verificar calidad inicial
    checkConnectionQuality();

    // Verificar calidad periódicamente
    const interval = setInterval(checkConnectionQuality, 30000); // Cada 30 segundos

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  return {
    isOnline,
    connectionQuality,
    isSlowConnection: connectionQuality === 'slow' || connectionQuality === 'poor',
  };
}
