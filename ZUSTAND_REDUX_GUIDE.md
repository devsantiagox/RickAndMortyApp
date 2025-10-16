# 🔄 Guía de Zustand con Middleware Redux

## 📖 ¿Qué es Zustand?

Zustand es una librería de state management minimalista para React. Es más simple que Redux pero igual de poderosa.

## 🎯 Middleware Implementado

En este proyecto, Zustand está configurado con middleware que proporciona funcionalidades similares a Redux:

### 1. DevTools Middleware

Permite usar Redux DevTools para debugging:

```typescript
devtools(
  storeImplementation,
  {
    name: 'AuthStore',
    enabled: process.env.NODE_ENV === 'development',
  }
)
```

**Características:**
- Ver todas las acciones en tiempo real
- Inspeccionar el estado
- Time-travel debugging
- Ver el diff de cambios

### 2. Persist Middleware

Guarda automáticamente el estado en localStorage:

```typescript
persist(
  storeImplementation,
  {
    name: 'auth-storage',
    partialize: (state) => ({
      user: state.user,
      token: state.token,
      isAuthenticated: state.isAuthenticated,
    }),
  }
)
```

**Características:**
- Persistencia automática
- Selector de qué persistir
- Hidratación automática al cargar

## 📋 Comparación: Redux vs Zustand

### Redux Tradicional

```typescript
// Action Types
const LOGIN_START = 'auth/loginStart';
const LOGIN_SUCCESS = 'auth/loginSuccess';
const LOGIN_FAILURE = 'auth/loginFailure';

// Action Creators
const loginStart = () => ({ type: LOGIN_START });
const loginSuccess = (user, token) => ({ 
  type: LOGIN_SUCCESS, 
  payload: { user, token } 
});

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
      return { 
        ...state, 
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false 
      };
    // ... más casos
  }
};

// Thunk
const login = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await api.login(credentials);
    dispatch(loginSuccess(response.user, response.token));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
```

### Zustand con Middleware Redux

```typescript
export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        user: null,
        token: null,
        isLoading: false,
        
        // Acción (equivalente a action + reducer)
        login: async (credentials) => {
          set({ isLoading: true }, false, 'auth/loginStart');
          
          try {
            const response = await api.login(credentials);
            set(
              {
                user: response.user,
                token: response.token,
                isLoading: false,
              },
              false,
              'auth/loginSuccess'
            );
          } catch (error) {
            set(
              { error: error.message, isLoading: false },
              false,
              'auth/loginFailure'
            );
          }
        },
      }),
      { name: 'auth-storage' }
    ),
    { name: 'AuthStore' }
  )
);
```

## 🔍 Detalles de Implementación

### Función `set()` con Redux DevTools

```typescript
set(
  updatedState,      // Nuevo estado
  replace,           // false = merge, true = replace
  actionName         // Nombre visible en DevTools
)
```

**Ejemplo:**

```typescript
// Merge state (más común)
set({ isLoading: true }, false, 'auth/setLoading');

// Replace state completo (raro)
set({ ...initialState }, true, 'auth/reset');
```

### Acciones Síncronas vs Asíncronas

#### Acción Síncrona (como un reducer)

```typescript
setUser: (user) => {
  set(
    { user, isAuthenticated: !!user },
    false,
    'auth/setUser'
  );
},
```

#### Acción Asíncrona (como un thunk)

```typescript
login: async (credentials) => {
  // Inicio
  set({ isLoading: true, error: null }, false, 'auth/loginStart');
  
  try {
    const data = await api.login(credentials);
    
    // Éxito
    set(
      {
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      },
      false,
      'auth/loginSuccess'
    );
    
    return true;
  } catch (error) {
    // Error
    set(
      {
        isLoading: false,
        error: error.message,
      },
      false,
      'auth/loginFailure'
    );
    
    return false;
  }
},
```

## 📊 Selectores (como en Redux)

### Selectores Básicos

```typescript
// Definir selectores
export const selectUser = (state: AuthStore) => state.user;
export const selectToken = (state: AuthStore) => state.token;
export const selectIsAuthenticated = (state: AuthStore) => state.isAuthenticated;

// Usar selectores
const user = useAuthStore(selectUser);
const token = useAuthStore(selectToken);
```

### Selectores Computados

```typescript
// Selector que computa un valor
export const selectUserName = (state: AuthStore) => 
  state.user?.name || 'Invitado';

export const selectIsAdmin = (state: AuthStore) => 
  state.user?.role === 'admin';

// Uso
const userName = useAuthStore(selectUserName);
const isAdmin = useAuthStore(selectIsAdmin);
```

### Selectores con Múltiples Valores

```typescript
// Selector que retorna múltiples valores
export const selectAuthInfo = (state: AuthStore) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  isLoading: state.isLoading,
});

// Uso
const { user, isAuthenticated, isLoading } = useAuthStore(selectAuthInfo);
```

## 🎨 Patrones Avanzados

### 1. Acciones con Callbacks

```typescript
login: async (credentials, onSuccess, onError) => {
  set({ isLoading: true }, false, 'auth/loginStart');
  
  try {
    const data = await api.login(credentials);
    set(
      { user: data.user, token: data.token, isLoading: false },
      false,
      'auth/loginSuccess'
    );
    onSuccess?.();
  } catch (error) {
    set({ error: error.message, isLoading: false }, false, 'auth/loginFailure');
    onError?.(error);
  }
},
```

### 2. Acciones con Validación

```typescript
updateProfile: async (data) => {
  const { user } = get();
  
  if (!user) {
    set({ error: 'No hay usuario autenticado' }, false, 'auth/updateProfileError');
    return false;
  }
  
  set({ isLoading: true }, false, 'auth/updateProfileStart');
  
  try {
    const updated = await api.updateProfile(data);
    set({ user: updated, isLoading: false }, false, 'auth/updateProfileSuccess');
    return true;
  } catch (error) {
    set({ error: error.message, isLoading: false }, false, 'auth/updateProfileFailure');
    return false;
  }
},
```

### 3. Acciones Encadenadas

```typescript
loginAndRedirect: async (credentials, redirectTo) => {
  const success = await get().login(credentials);
  
  if (success) {
    // Hacer algo después del login exitoso
    router.push(redirectTo);
  }
},
```

## 🛠️ Debugging con Redux DevTools

### Instalación

1. Instala la extensión de navegador:
   - [Chrome](https://chrome.google.com/webstore/detail/redux-devtools)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

2. Abre las DevTools del navegador
3. Ve a la pestaña "Redux"

### Características Disponibles

#### Ver Acciones
Cada vez que llamas una acción, verás:
```
auth/loginStart
auth/loginSuccess
auth/setUser
auth/logout
```

#### Inspeccionar Estado
Puedes ver el estado completo en cada momento:
```json
{
  "user": {
    "id": "123",
    "name": "Juan Pérez",
    "email": "juan@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "isAuthenticated": true,
  "isLoading": false,
  "error": null
}
```

#### Time Travel
- Retrocede y avanza entre acciones
- Ve cómo cambia el estado en cada paso
- Salta a cualquier acción en el historial

#### Diff de Cambios
Ve exactamente qué cambió en cada acción:
```
auth/loginSuccess
+ user: { id: "123", name: "Juan" }
+ token: "eyJhbGci..."
+ isAuthenticated: true
- isLoading: true
+ isLoading: false
```

## 📦 Persistencia Selectiva

### ¿Qué Persistir?

```typescript
persist(
  storeImplementation,
  {
    name: 'auth-storage',
    partialize: (state) => ({
      // Solo estos campos se guardan
      user: state.user,
      token: state.token,
      isAuthenticated: state.isAuthenticated,
      // NO persistimos:
      // - isLoading (temporal)
      // - error (temporal)
    }),
  }
)
```

### Hidratación

Cuando la página se recarga:
1. Zustand lee de localStorage
2. Restaura el estado guardado
3. Verifica el token con `checkAuth()`

## 🎯 Best Practices

### 1. Nombra las Acciones Consistentemente

```typescript
// Bueno - Estilo Redux
'auth/loginStart'
'auth/loginSuccess'
'auth/loginFailure'

// Malo
'login'
'logging in'
'LOGIN'
```

### 2. Usa Selectores para Optimización

```typescript
// ❌ Malo - Se re-renderiza con cualquier cambio del store
const { user, token, isLoading, error } = useAuthStore();

// ✅ Bueno - Solo se re-renderiza si el usuario cambia
const user = useAuthStore(state => state.user);
```

### 3. Maneja Errores Apropiadamente

```typescript
// ✅ Bueno
try {
  const data = await api.login(credentials);
  set({ user: data.user }, false, 'auth/loginSuccess');
} catch (error) {
  const message = error instanceof Error ? error.message : 'Error desconocido';
  set({ error: message }, false, 'auth/loginFailure');
}
```

### 4. Limpia el Estado Cuando Sea Necesario

```typescript
logout: () => {
  set(
    {
      user: null,
      token: null,
      isAuthenticated: false,
      error: null, // Limpiar errores
    },
    false,
    'auth/logout'
  );
},
```

## 🔗 Integración con Componentes

### Hook Básico

```typescript
function MyComponent() {
  const { user, login, isLoading } = useAuthStore();
  
  if (isLoading) return <Loading />;
  if (!user) return <Login onLogin={login} />;
  
  return <Dashboard user={user} />;
}
```

### Con Selectores

```typescript
function UserName() {
  const userName = useAuthStore(state => state.user?.name);
  return <span>{userName}</span>;
}
```

### Acceso Fuera de Componentes

```typescript
// En un archivo de utilidades
import { useAuthStore } from '@/store/authStore';

export async function fetchWithAuth(url) {
  const token = useAuthStore.getState().token;
  
  return fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}
```

## 📚 Recursos

- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)
- [Redux Patterns](https://redux.js.org/style-guide/)

## ✨ Ventajas sobre Redux Puro

1. **Menos Boilerplate**: No necesitas action types, action creators, ni reducers separados
2. **TypeScript Friendly**: Mejor inferencia de tipos
3. **Más Simple**: Menos conceptos que aprender
4. **Igual de Poderoso**: Mismas capacidades con menos código
5. **Mejor Performance**: Actualizaciones más granulares
6. **Hooks Nativos**: Diseñado para React Hooks desde el inicio

¡Disfruta de lo mejor de ambos mundos! 🚀

