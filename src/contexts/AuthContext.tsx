import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode
} from 'react';
import { useRouter } from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { PLATFORM_SETTINGS } from '@/infra/config';
import { UserEntity } from '@/domain/models';
import { getUser, updateUser } from '@/domain/usecases/users';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<boolean>;
  signOut: () => void;
  updateProfileData: (credentials: UserEntity) => Promise<boolean>;
  isAuthenticated: boolean;
  credentials: UserEntity | null;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [credentials, setCredentials] = useState<UserEntity | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { push } = useRouter();
  const cookies = parseCookies();

  const USER_CREDENTIALS_KEY = PLATFORM_SETTINGS.cookies.USER_CREDENTIALS_KEY;
  const COOKIE_MAX_AGE = PLATFORM_SETTINGS.cookies.COOKIES_EXPIRATION;

  useEffect(() => {
    const storedCredentials = cookies[USER_CREDENTIALS_KEY];

    if (storedCredentials) {
      setCredentials(JSON.parse(storedCredentials));
      setIsAuthenticated(true);
    } else {
      setCredentials(null);
      setIsAuthenticated(false);
    }
  }, []);

  const setSession = (credentials: UserEntity) => {
    setCredentials(credentials);

    setCookie(undefined, USER_CREDENTIALS_KEY, JSON.stringify(credentials), {
      maxAge: COOKIE_MAX_AGE,
      path: '/'
    });
  };

  const signIn = async ({ email, password }: SignInCredentials) => {
    const validCredentials = await getUser({ email, password });

    if (validCredentials) {
      setSession(validCredentials);
      setIsAuthenticated(true);

      return true;
    } else {
      setIsAuthenticated(false);
      return false;
    }
  };

  const updateProfileData = async (newUserData: UserEntity) => {
    const { data } = await updateUser(newUserData);

    if (data) {
      setSession(data);
      return true;
    } else {
      return false;
    }
  };

  const clearSession = async () => {
    destroyCookie(undefined, USER_CREDENTIALS_KEY);
    setIsAuthenticated(false);
    setCredentials(null);
  };

  const signOut = async () => {
    await clearSession();

    push('/sign-in');
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        updateProfileData,
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
