import { selectAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    background: 'gray.medium'
  }
});

export const Select = defineMultiStyleConfig({ baseStyle });
