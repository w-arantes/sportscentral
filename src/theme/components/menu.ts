import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  item: {
    bg: 'gray.medium',
    _hover: {
      color: 'white',
      bg: 'brand.primary',
      transition: 'background-color color 0.5s ease'
    }
  },
  list: {
    bg: 'gray.medium'
  }
});

export const Menu = defineMultiStyleConfig({ baseStyle });
