import { Center, Text } from '@chakra-ui/react';
import { PageLayout } from '@/layout';

export default function LandingPage() {
  return (
    <PageLayout title="SportsCentral - Made for Sports Lovers" h="100vh">
      <Center>
        <Text as="h1">SportsCentral</Text>
      </Center>
    </PageLayout>
  );
}
