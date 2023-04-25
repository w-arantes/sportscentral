import { Flex, Text } from '@chakra-ui/react';
import { CategoryEntity } from '@/domain/models';

interface CategoryTagProps extends Omit<CategoryEntity, 'id'> {
  isCard?: boolean;
}

export function CategoryTag({ name, isCard = false }: CategoryTagProps) {
  return (
    <Flex
      minWidth={isCard ? '296px' : '100px'}
      height={isCard ? '40px' : '20px'}
      align="center"
      justify="center"
      bg="tag"
    >
      <Text
        fontSize={isCard ? 'h2' : 'h4'}
        fontWeight="bold"
        color="white"
        casing="uppercase"
      >
        {name}
      </Text>
    </Flex>
  );
}
