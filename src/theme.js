// src/theme.js
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    candy: {
      50: '#fdf2f8', // Rosa muito claro (fundo)
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899', // Rosa principal
      600: '#db2777',
      700: '#be185d', // Texto escuro/títulos
      800: '#9d174d',
      900: '#831843',
    },
    mint: {
      100: '#dcfce7', // Verde menta
      500: '#22c55e',
    },
    blueberry: {
      100: '#dbeafe', // Azul bebê
      500: '#3b82f6',
    }
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'xl', // Botões bem redondinhos
      },
    },
    Box: {
      baseStyle: {
        borderRadius: 'lg',
      }
    }
  },
})

export default theme