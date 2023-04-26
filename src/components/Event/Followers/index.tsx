import { UserEntity } from '@/domain/models';
import { Flex, VStack, Text } from '@chakra-ui/react';

interface EventFollowers {
  followers: UserEntity[];
}

export function EventFollowers({ followers }: EventFollowers) {
  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="flex-start"
      w="100%"
      h="100%"
      mt="2rem"
    >
      <Text fontSize="h1" fontWeight="bold" color="white">
        Following {`(${followers?.length})`}
      </Text>
      <VStack spacing="0.5rem" mt="1rem" w="100%" h="100%" align="flex-start">
        {followers.length > 0 &&
          followers.map((user: UserEntity) => {
            return <Text key={user.id}>{user.name + ' ' + user.surname}</Text>;
          })}
      </VStack>
    </Flex>
  );
}
