import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode
} from 'react';
import { useRouter } from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { UserEntity } from '@/entities';
import { mockUserCredentials } from '@/mock/userCredentials';

interface SignInCredentials {
  email: string;
  password: string;
}

type UserCredentials = Omit<UserEntity, 'events'>;

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => void;
  signOut: () => void;
  isAuthenticated: boolean;
  credentials: UserEntity | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [credentials, setCredentials] = useState<UserEntity | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { push } = useRouter();
  const cookies = parseCookies();

  const USER_CREDENTIALS_KEY = '@sportscentral-credentials';
  const COOKIE_MAX_AGE = 30 * 24 * 60 * 60;

  useEffect(() => {
    const storedCredentials = cookies[USER_CREDENTIALS_KEY];

    if (storedCredentials) {
      setCredentials(JSON.parse(storedCredentials));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const setSession = ({ id, name, isAdmin }: UserCredentials) => {
    const credentials = JSON.stringify({
      id,
      name,
      isAdmin
    });

    setCookie(undefined, USER_CREDENTIALS_KEY, credentials, {
      maxAge: COOKIE_MAX_AGE,
      path: '/'
    });
  };

  const signIn = async ({ email, password }: SignInCredentials) => {
    //TODO: api request for sign-in
    const signInCredentials = mockUserCredentials;

    if (signInCredentials) {
      setSession(signInCredentials);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const clearSession = () => {
    destroyCookie(undefined, USER_CREDENTIALS_KEY);
    setIsAuthenticated(false);
    setCredentials(null);
  };

  const signOut = () => {
    clearSession();
    push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isAuthenticated,
        credentials
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};
