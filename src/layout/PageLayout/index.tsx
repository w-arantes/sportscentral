import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Flex, FlexProps } from '@chakra-ui/react';

import { SEO } from '@/layout';

interface PageLayoutProps extends FlexProps {
  title: string;
  children: ReactNode;
}

export function PageLayout({ children, title, ...rest }: PageLayoutProps) {
  const { asPath } = useRouter();

  return (
    <Flex
      data-cy="LandingPage"
      as="main"
      direction="column"
      align="center"
      width="100%"
      height="100%"
      px="146px"
      mt="1rem"
      mb="4rem"
      {...rest}
    >
      <SEO pageTitle={title} url={asPath} />
      {children}
    </Flex>
  );
}
