import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Fade } from '@chakra-ui/react';

import { Header } from '@/layout';

export default function Layout({ children }: { children: ReactNode }) {
  const { route } = useRouter();

  return (
    <>
      <Header />
      <Fade key={route} in={true}>
        {children}
      </Fade>
    </>
  );
}
