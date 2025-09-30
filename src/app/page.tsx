'use client';

import { useState, useEffect } from 'react';
import { getCharacters } from '@/lib/api';
import { CharactersResponse } from '@/types/character';
import CharacterCard from '@/components/CharacterCard';
import Pagination from '@/components/Pagination';
import Header from '@/components/Header';
import SplashScreen from '@/components/SplashScreen';
import LoadingSpinner from '@/components/LoadingSpinner';
import NoSSR from '@/components/NoSSR';

export default function Home() {
  const [characters, setCharacters] = useState<CharactersResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCharacters(currentPage);
        setCharacters(data);
      } catch (err) {
        setError('Failed to fetch characters');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return (
      <NoSSR>
        <SplashScreen onComplete={handleSplashComplete} />
      </NoSSR>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          <LoadingSpinner
            message="Cargando personajes..."
            size="lg"
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-red-600 mb-4">¡Ups! Algo salió mal</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 sm:mb-6">
            Personajes de Rick and Morty
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Explora todos los personajes del universo de Rick and Morty.
            Desde el brillante pero inestable Rick Sanchez hasta el adorable Morty Smith,
            descubre el vasto multiverso de personajes que hacen esta serie inolvidable.
          </p>
        </div>

        {characters && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {characters.results.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={characters.info.pages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}