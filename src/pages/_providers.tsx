import { SportsCentral } from '@/theme';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '@/contexts';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CacheProvider>
        <ChakraProvider theme={SportsCentral}>{children}</ChakraProvider>
      </CacheProvider>
    </AuthProvider>
  );
}
