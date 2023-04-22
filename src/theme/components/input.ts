import { ComponentStyleConfig } from '@chakra-ui/react';

export const Input: ComponentStyleConfig = {
  baseStyle: {
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
  }
};
