import { getCharacter } from '@/lib/api';
import { Character } from '@/types/character';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

interface CharacterPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function CharacterPage({ params }: CharacterPageProps) {
    let character: Character;

    try {
        const resolvedParams = await params;
        character = await getCharacter(parseInt(resolvedParams.id));
    } catch {
        notFound();
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Alive':
                return 'bg-green-500';
            case 'Dead':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
                <Header />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div className="mb-8">
                        <Link
                            href="/"
                            className="inline-flex items-center px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg text-gray-700 hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Volver a Personajes
                        </Link>
                    </div>

                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                        <div className="md:flex">
                            <div className="md:w-1/3">
                                <div className="relative group">
                                    <Image
                                        src={character.image}
                                        alt={character.name}
                                        width={400}
                                        height={400}
                                        className="w-full h-96 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute top-6 right-6">
                                        <span className={`inline-block w-6 h-6 rounded-full ${getStatusColor(character.status)} shadow-lg animate-pulse`}></span>
                                    </div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            <p className="text-sm font-medium text-gray-800">ID del Personaje: {character.id}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-2/3 p-6 sm:p-8 lg:p-10">
                                <div className="mb-8">
                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                                        {character.name}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-4">
                                        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white ${getStatusColor(character.status)} shadow-lg`}>
                                            {character.status}
                                        </span>
                                        <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                            {character.species}
                                        </span>
                                        <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                            {character.gender}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10">
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                                        <div className="flex items-center mb-4">
                                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827.001l-4.243-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">Origen</h3>
                                        </div>
                                        <p className="text-gray-700 font-medium">{character.origin.name}</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                                        <div className="flex items-center mb-4">
                                            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">Última Ubicación Conocida</h3>
                                        </div>
                                        <p className="text-gray-700 font-medium">{character.location.name}</p>
                                    </div>

                                    {character.type && (
                                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                                            <div className="flex items-center mb-4">
                                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900">Tipo</h3>
                                            </div>
                                            <p className="text-gray-700 font-medium">{character.type}</p>
                                        </div>
                                    )}

                                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100">
                                        <div className="flex items-center mb-4">
                                            <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center mr-3">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">Episodios</h3>
                                        </div>
                                        <p className="text-gray-700 font-medium">{character.episode.length} episodios</p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200">
                                    <div className="flex items-center mb-6">
                                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">Apariciones en Episodios</h3>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
                                        {character.episode.map((episodeUrl, index) => {
                                            const episodeNumber = episodeUrl.split('/').pop();
                                            return (
                                                <span
                                                    key={index}
                                                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold px-3 py-2 rounded-xl text-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                                                >
                                                    Episodio {episodeNumber}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
