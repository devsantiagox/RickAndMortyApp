import { Character, CharactersResponse } from '@/types/character';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

// Configuración de fetch con timeout y reintentos
const fetchWithRetry = async (url: string, retries = 3, timeout = 10000): Promise<Response> => {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // Agregar caché para mejorar rendimiento
        next: { revalidate: 300 }, // Cache por 5 minutos
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        return response;
      }
      
      // Si no es el último intento, esperar antes de reintentar
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    } catch (error) {
      if (i === retries - 1) {
        throw error;
      }
      // Esperar antes del siguiente intento
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  
  throw new Error('Max retries exceeded');
};

export async function getCharacters(page: number = 1): Promise<CharactersResponse> {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/character?page=${page}`);
    return response.json();
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw new Error(`Failed to fetch characters: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function getCharacter(id: number): Promise<Character> {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/character/${id}`);
    return response.json();
  } catch (error) {
    console.error('Error fetching character:', error);
    throw new Error(`Failed to fetch character: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
