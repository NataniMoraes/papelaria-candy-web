import { Box, Heading } from '@chakra-ui/react' // 1. Importar componentes

function App() {
  return (
    // Box é como uma <div>, mas com superpoderes
    <Box bg='pink.100' w='100%' h='100vh' p={4}> 
      {/* Heading é um <h1>, <h2>, etc. */}
      <Heading color='purple.700'>
        Bem-vindo(a) à Papelaria Candy!
      </Heading>
    </Box>
  )
}

export default App