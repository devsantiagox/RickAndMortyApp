import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AuthState, User, LoginCredentials, RegisterData, AuthResponse } from '@/types/auth';

// Define las acciones del store (similar a Redux actions)
interface AuthActions {
  // Acciones síncronas
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // Acciones asíncronas (thunks)
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

// Combina el estado y las acciones
type AuthStore = AuthState & AuthActions;

// Estado inicial
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Crear el store con middleware redux y persistencia
export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        ...initialState,

        // Acciones síncronas (similar a reducers de Redux)
        setUser: (user) => {
          set(
            { user, isAuthenticated: !!user },
            false,
            'auth/setUser'
          );
        },

        setToken: (token) => {
          set({ token }, false, 'auth/setToken');
        },

        setLoading: (isLoading) => {
          set({ isLoading }, false, 'auth/setLoading');
        },

        setError: (error) => {
          set({ error }, false, 'auth/setError');
        },

        clearError: () => {
          set({ error: null }, false, 'auth/clearError');
        },

        // Acción de login (thunk)
        login: async (credentials) => {
          try {
            set({ isLoading: true, error: null }, false, 'auth/loginStart');

            const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(credentials),
            });

            const data: AuthResponse = await response.json();

            if (!response.ok) {
              throw new Error(data.message || 'Error al iniciar sesión');
            }

            if (data.success && data.token && data.user) {
              // Guardar token y usuario
              set(
                {
                  user: data.user,
                  token: data.token,
                  isAuthenticated: true,
                  isLoading: false,
                  error: null,
                },
                false,
                'auth/loginSuccess'
              );
              
              return true;
            }

            throw new Error('Respuesta inválida del servidor');
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            set(
              {
                isLoading: false,
                error: errorMessage,
                isAuthenticated: false,
              },
              false,
              'auth/loginFailure'
            );
            return false;
          }
        },

        // Acción de registro (thunk)
        register: async (data) => {
          try {
            set({ isLoading: true, error: null }, false, 'auth/registerStart');

            const response = await fetch('/api/auth/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });

            const responseData: AuthResponse = await response.json();

            if (!response.ok) {
              throw new Error(responseData.message || 'Error al registrarse');
            }

            if (responseData.success && responseData.token && responseData.user) {
              // Guardar token y usuario automáticamente después del registro
              set(
                {
                  user: responseData.user,
                  token: responseData.token,
                  isAuthenticated: true,
                  isLoading: false,
                  error: null,
                },
                false,
                'auth/registerSuccess'
              );
              
              return true;
            }

            throw new Error('Respuesta inválida del servidor');
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            set(
              {
                isLoading: false,
                error: errorMessage,
                isAuthenticated: false,
              },
              false,
              'auth/registerFailure'
            );
            return false;
          }
        },

        // Acción de logout
        logout: () => {
          set(
            {
              user: null,
              token: null,
              isAuthenticated: false,
              error: null,
            },
            false,
            'auth/logout'
          );
        },

        // Verificar autenticación
        checkAuth: async () => {
          const { token } = get();
          
          if (!token) {
            set({ isAuthenticated: false, user: null }, false, 'auth/checkAuthFailed');
            return;
          }

          try {
            const response = await fetch('/api/auth/me', {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });

            if (!response.ok) {
              throw new Error('Token inválido');
            }

            const data = await response.json();
            
            if (data.success && data.user) {
              set(
                { user: data.user, isAuthenticated: true },
                false,
                'auth/checkAuthSuccess'
              );
            } else {
              // Token inválido, limpiar estado
              set(
                { user: null, token: null, isAuthenticated: false },
                false,
                'auth/checkAuthFailed'
              );
            }
          } catch (error) {
            // Token inválido o error, limpiar estado
            set(
              { user: null, token: null, isAuthenticated: false },
              false,
              'auth/checkAuthError'
            );
          }
        },
      }),
      {
        name: 'auth-storage', // nombre en localStorage
        partialize: (state) => ({
          // Solo persistir estos campos
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: 'AuthStore', // nombre en Redux DevTools
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);

// Selectores (similar a Redux selectors)
export const selectUser = (state: AuthStore) => state.user;
export const selectToken = (state: AuthStore) => state.token;
export const selectIsAuthenticated = (state: AuthStore) => state.isAuthenticated;
export const selectIsLoading = (state: AuthStore) => state.isLoading;
export const selectError = (state: AuthStore) => state.error;

