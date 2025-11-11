import { Box, Flex, Heading, Text } from '@chakra-ui/react'

function App() {
  return (
    <Flex w='100%'> {/* Container principal em Flexbox */}
      
      {/* 1. SIDEBAR (Navegação) */}
      <Box 
        w='300px' // Largura fixa da sidebar
        h='100vh' // Altura total da tela
        bg='gray.100' // Cor de fundo pastel
        p={6} // Padding (espaçamento interno)
      >
        <Heading as='h1' size='lg' color='purple.700' mb={8}> {/* Título */}
          Papelaria Candy 🍬
        </Heading>

        {/* Links de Navegação (futuros) */}
        <Box mb={4}>
          <Text fontSize='xl' fontWeight='bold' color='gray.600'>Home</Text>
        </Box>
        <Box mb={4}>
          <Text fontSize='xl' fontWeight='bold' color='gray.600'>Produtos</Text>
        </Box>
        <Box mb={4}>
          <Text fontSize='xl' fontWeight='bold' color='gray.600'>Categorias</Text>
        </Box>
        <Box mb={4}>
          <Text fontSize='xl' fontWeight='bold' color='gray.600'>Vendas</Text>
        </Box>
      </Box>

      {/* 2. ÁREA DE CONTEÚDO PRINCIPAL */}
      <Box 
        flex='1' // Faz esta Box ocupar todo o espaço restante
        h='100vh'
        p={10} // Padding maior para o conteúdo
        bg='pink.50' // Fundo rosa bem clarinho
      >
        <Heading>Página Atual</Heading>
        <Text>O conteúdo da página será carregado aqui.</Text>
      </Box>

    </Flex>
  )
}

export default App