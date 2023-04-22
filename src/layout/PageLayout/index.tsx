import { ReactNode } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

interface PageLayoutProps extends FlexProps {
  children: ReactNode;
}

export function PageLayout({ children, ...rest }: PageLayoutProps) {
  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      width="100%"
      height="100%"
      px="112px"
      mt="4rem"
      {...rest}
    >
      {children}
    </Flex>
  );
}
