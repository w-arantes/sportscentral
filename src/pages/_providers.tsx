import { SportsCentral } from '@/theme';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={SportsCentral}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
