import { Character } from '@/types/character';
import Image from 'next/image';
import Link from 'next/link';

interface CharacterCardProps {
    character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Alive':
                return 'bg-green-500 shadow-green-500/50';
            case 'Dead':
                return 'bg-red-500 shadow-red-500/50';
            default:
                return 'bg-gray-500 shadow-gray-500/50';
        }
    };

    const getStatusTextColor = (status: string) => {
        switch (status) {
            case 'Alive':
                return 'text-green-600';
            case 'Dead':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <Link href={`/character/${character.id}`}>
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden transform hover:-translate-y-3 hover:scale-105 border border-gray-100 hover:border-cyan-200">
                <div className="relative overflow-hidden">
                    <Image
                        src={character.image}
                        alt={character.name}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-3 right-3">
                        <span className={`inline-block w-4 h-4 rounded-full ${getStatusColor(character.status)} shadow-lg animate-pulse group-hover:animate-bounce`}></span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/95 backdrop-blur-md rounded-xl px-4 py-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 shadow-lg">
                            <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4 text-blue-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm font-medium text-gray-800">Haz clic para ver detalles</p>
                            </div>
                        </div>
                    </div>
                    {/* Floating particles effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                                style={{
                                    left: `${20 + i * 15}%`,
                                    top: `${30 + (i % 2) * 20}%`,
                                    animationDelay: `${i * 0.2}s`
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-500 group-hover:scale-105 transform origin-left">
                        {character.name}
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between group-hover:bg-gray-50 rounded-lg p-2 transition-all duration-300">
                            <span className="text-sm font-medium text-gray-500 flex items-center">
                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                Especie
                            </span>
                            <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{character.species}</span>
                        </div>
                        <div className="flex items-center justify-between group-hover:bg-gray-50 rounded-lg p-2 transition-all duration-300">
                            <span className="text-sm font-medium text-gray-500 flex items-center">
                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Género
                            </span>
                            <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{character.gender}</span>
                        </div>
                        <div className="flex items-center justify-between group-hover:bg-gray-50 rounded-lg p-2 transition-all duration-300">
                            <span className="text-sm font-medium text-gray-500 flex items-center">
                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Estado
                            </span>
                            <span className={`text-sm font-bold ${getStatusTextColor(character.status)} group-hover:scale-110 transform transition-all duration-300`}>
                                {character.status}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
