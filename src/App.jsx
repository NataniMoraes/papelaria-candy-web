import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { Link, Outlet } from 'react-router-dom' 

function App() {
  return (
    <Flex w='100%'>
      
      {/* 1. SIDEBAR (Navegação) */}
      <Box 
        w='300px'
        h='100vh'
        bg='gray.100'
        p={6}
      >
        <Heading as='h1' size='lg' color='purple.700' mb={8}>
         🍭Papelaria Candy 🍭
        </Heading>

        {/* Links */}
        <Box mb={4}>
          <Link to="/">
            <Text fontSize='xl' fontWeight='bold' color='gray.600'>Home</Text>
          </Link>
        </Box>
        <Box mb={4}>
          <Link to="/produtos">
            <Text fontSize='xl' fontWeight='bold' color='gray.600'>Listar Produtos</Text>
          </Link>
        </Box>
        
        {/* --- NOVO LINK AQUI --- */}
        <Box mb={4}>
          <Link to="/produtos/novo">
            <Text fontSize='xl' fontWeight='bold' color='gray.600'>Cadastrar Produto</Text>
          </Link>
        </Box>
        {/* --------------------- */}

      </Box>

      {/* 2. ÁREA DE CONTEÚDO */}
      <Box flex='1' h='100vh' p={10} bg='pink.50'>
        <Outlet /> 
      </Box>

    </Flex>
  )
}

// --- A LINHA QUE FALTAVA ---
export default App
// -----------------------------