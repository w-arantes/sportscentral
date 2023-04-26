import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    width: '100%',
    height: '32px',
    fontSize: 'h3',
    fontWeight: 'normal',
    color: 'white',
    borderColor: 'red.900',
    _placeholder: {
      fontSize: 'h3',
      color: 'gray.light'
    }
  }
});

export const Input = defineMultiStyleConfig({ baseStyle });
