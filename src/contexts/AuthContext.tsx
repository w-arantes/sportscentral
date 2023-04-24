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
import { getUser } from '@/domain/usecases/users';

type UserCredentials = Omit<UserEntity, 'events'>;

interface SignInCredentials {
  email: string;
  password: string;
}

interface UpdateProfileCredentials extends UserCredentials {
  password: string;
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<boolean>;
  signOut: () => void;
  updateProfileData: (credentials: UpdateProfileCredentials) => void;
  isAuthenticated: boolean;
  credentials: UserCredentials | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [credentials, setCredentials] = useState<UserCredentials | null>(null);
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
      setIsAuthenticated(false);
    }
  }, []);

  const setSession = ({
    id,
    name,
    surname,
    email,
    isAdmin
  }: UserCredentials) => {
    const credentials = {
      id,
      name,
      surname,
      email,
      isAdmin
    };

    setCredentials(credentials);
    setCookie(undefined, USER_CREDENTIALS_KEY, JSON.stringify(credentials), {
      maxAge: COOKIE_MAX_AGE,
      path: '/'
    });
  };

  const signIn = async ({ email, password }: SignInCredentials) => {
    const validCredentials = await getUser(email, password);

    if (validCredentials) {
      setSession(validCredentials);
      setIsAuthenticated(true);

      return true;
    } else {
      setIsAuthenticated(false);
      return false;
    }
  };

  const updateProfileData = async ({
    id,
    email,
    isAdmin,
    name,
    password
  }: UpdateProfileCredentials) => {
    console.log('updateProfileData', { id, email, isAdmin, name, password });

    //TODO: api request to update profile data
  };

  const clearSession = () => {
    destroyCookie(undefined, USER_CREDENTIALS_KEY);
    setIsAuthenticated(false);
    setCredentials(null);
  };

  const signOut = () => {
    clearSession();
    push('/login');
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
