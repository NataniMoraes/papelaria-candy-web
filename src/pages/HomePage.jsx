import { Flex } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import {
  Heading,
  Text,
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Spinner,
  Icon
} from '@chakra-ui/react'
import axios from 'axios'
import { FaBoxOpen, FaTags } from 'react-icons/fa' // Importando ícones

function HomePage() {
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:8080/dashboard/estatisticas')
      .then(response => {
        setStats(response.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.error("Erro ao buscar estatísticas:", error)
        setIsLoading(false)
      })
  }, []) // Roda apenas uma vez

  // Se estiver carregando, mostra um Spinner
  if (isLoading) {
    return <Spinner size="xl" />
  }

  // 2. Renderizar os Stat Cards
  return (
    <Box>
      <Heading mb={2}>Dashboard</Heading>
      <Text fontSize="lg" color="gray.600" mb={8}>
        Bem-vindo(a) ao painel de controle da Papelaria Candy! 🍬
      </Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        
        {/* Card 1: Total de Produtos */}
        <Stat
          p={6}
          shadow="md"
          borderWidth="1px"
          borderRadius="lg"
          bg="white"
        >
          <Flex align="center">
            <Icon as={FaBoxOpen} w={10} h={10} color="purple.500" mr={4} />
            <Box>
              <StatLabel color="gray.500">Total de Produtos</StatLabel>
              <StatNumber fontSize="4xl">
                {stats ? stats.totalProdutos : 0}
              </StatNumber>
              <StatHelpText>Itens cadastrados no sistema</StatHelpText>
            </Box>
          </Flex>
        </Stat>

        {/* Card 2: Total de Categorias */}
        <Stat
          p={6}
          shadow="md"
          borderWidth="1px"
          borderRadius="lg"
          bg="white"
        >
          <Flex align="center">
            <Icon as={FaTags} w={10} h={10} color="pink.500" mr={4} />
            <Box>
              <StatLabel color="gray.500">Total de Categorias</StatLabel>
              <StatNumber fontSize="4xl">
                {stats ? stats.totalCategorias : 0}
              </StatNumber>
              <StatHelpText>Grupos de produtos</StatHelpText>
            </Box>
          </Flex>
        </Stat>
        
        {/* Card 3: Placeholder (para o futuro) */}
        <Stat
          p={6}
          shadow="md"
          borderWidth="1px"
          borderRadius="lg"
          bg="gray.50"
          _hover={{ bg: 'gray.100' }}
        >
          <StatLabel color="gray.400">Em Breve</StatLabel>
          <StatNumber fontSize="4xl" color="gray.400">...</StatNumber>
          <StatHelpText color="gray.400">Total de Vendas (R$)</StatHelpText>
        </Stat>

      </SimpleGrid>
    </Box>
  )
}
export default HomePage