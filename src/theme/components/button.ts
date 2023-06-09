import { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontSize: 'h2',
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
        backgroundColor: 'brand.light',
        transition: 'background-color 0.5s ease'
      }
    },

    outline: {
      color: 'brand.primary',
      borderColor: 'brand.primary',
      _hover: {
        backgroundColor: 'transparent',
        color: 'brand.light',
        borderColor: 'brand.light',
        transition: 'color border-color 0.5s ease'
      }
    },

    danger: {
      color: 'red.500',
      border: '1px',
      borderColor: 'red.500',
      _hover: {
        backgroundColor: 'transparent',
        color: 'red.400',
        borderColor: 'red.400',
        transition: 'color border-color 0.5s ease'
      }
    },

    header: {
      width: '100px',
      color: 'gray.light',
      fontWeight: 'normal',
      _hover: {
        color: 'brand.primary',
        transition: 'color 0.5s ease'
      }
    }
  },

  defaultProps: {
    size: 'default',
    variant: 'solid'
  }
};
