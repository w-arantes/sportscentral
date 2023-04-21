import { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontSize: 'h1',
    fontWeight: 'bold',
    color: 'white',
    borderRadius: 0
  },

  sizes: {
    default: {
      width: '250px',
      height: '32px'
    }
  },

  variants: {
    solid: {
      bg: 'brand.primary',
      _hover: {
        backgroundColor: 'brand.light'
      }
    },

    outline: {
      color: 'brand.primary',
      borderColor: 'brand.primary',
      _hover: {
        backgroundColor: 'transparent',
        color: 'brand.light',
        borderColor: 'brand.light'
      }
    },

    danger: {
      color: 'red.500',
      border: '1px',
      borderColor: 'red.500',
      _hover: {
        backgroundColor: 'transparent',
        color: 'red.400',
        borderColor: 'red.400'
      }
    }
  },

  defaultProps: {
    size: 'default',
    variant: 'solid'
  }
};
