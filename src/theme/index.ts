import { extendTheme } from '@chakra-ui/react';

import { colors, fonts, fontSizes, global } from './tokens';
import { Button, Input, Menu, Select } from './components';

export const SportsCentral = extendTheme({
  colors,
  fonts,
  fontSizes,
  components: {
    Button,
    Input,
    Menu,
    Select
  },
  styles: {
    global
  }
});
