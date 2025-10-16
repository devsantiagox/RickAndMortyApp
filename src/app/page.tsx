import { getCharacters } from '@/lib/api';
import { CharactersResponse } from '@/types/character';
import CharacterCard from '@/components/CharacterCard';
import ServerPagination from '@/components/ServerPagination';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorBoundary from '@/components/ErrorBoundary';

interface HomeProps {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const currentPage = parseInt(searchParams.page || '1');
  let characters: CharactersResponse | null = null;
  let error: string | null = null;

  try {
    characters = await getCharacters(currentPage);
  } catch (err) {
    console.error('Error fetching characters:', err);
    error = 'Failed to fetch characters';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-16 relative">
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -top-10 -right-20 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-indigo-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          {/* Icono principal mejorado */}
          <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full mb-8 shadow-2xl group hover:scale-110 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <svg className="w-12 h-12 text-white relative z-10 group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>

          {/* Título mejorado */}
          <div className="relative mb-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-purple-600 via-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
              <span className="block">Personajes de</span>
              <span className="block bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Rick and Morty
              </span>
            </h1>

            {/* Línea decorativa */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent to-purple-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
            </div>
          </div>

          {/* Descripción mejorada */}
          <div className="relative max-w-3xl mx-auto">
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed px-4 font-medium">
              Explora todos los personajes del universo de{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold">
                Rick and Morty
              </span>
              . Desde el brillante pero inestable Rick Sanchez hasta el adorable Morty Smith,
              descubre el vasto multiverso de personajes que hacen esta serie inolvidable.
            </p>
          </div>
        </div>

        {error ? (
          <ErrorBoundary error={error} />
        ) : characters ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {characters.results.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>

            <div className="mt-12">
              <ServerPagination
                currentPage={currentPage}
                totalPages={characters.info.pages}
              />
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner message="Cargando personajes..." size="lg" />
          </div>
        )}
      </div>
    </div>
  );
}