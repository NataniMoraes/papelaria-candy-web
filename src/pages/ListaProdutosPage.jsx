import React, { useState, useEffect } from 'react'
// 1. Importar Badge
import { Heading, Text, Box, SimpleGrid, Badge } from '@chakra-ui/react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'

function ListaProdutosPage() {
  
  const [produtos, setProdutos] = useState([])
  const [busca, setBusca] = useState('')
  const produtosFiltrados = produtos.filter(produto => 
  produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
  produto.categoria.nome.toLowerCase().includes(busca.toLowerCase())
)

  useEffect(() => {
    buscarProdutos();
  }, [])

  const buscarProdutos = () => {
    axios.get('http://localhost:8080/produtos')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
      });
  }

  return (
    <Box>
      <Heading mb={6}>Lista de Produtos</Heading>
      <Text mb={6}>Clique em um produto para editar ou excluir.</Text> {/* Adicionei margin bottom */}

<Box mb={6}>
  <InputGroup>
    <InputLeftElement pointerEvents='none'>
      <FaSearch color='gray.300' />
    </InputLeftElement>
    <Input 
      placeholder='Buscar por nome ou categoria...' 
      value={busca}
      onChange={(e) => setBusca(e.target.value)}
      bg="white"
      focusBorderColor="candy.500"
    />
  </InputGroup>
</Box>
      
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        
        {produtosFiltrados.map(produto => (
          
          <Link 
            key={produto.id}
            to={`/produtos/editar/${produto.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Box 
              p={6} 
              shadow='md' 
              borderWidth='1px' 
              borderRadius='lg'
              bg='white'
              _hover={{ shadow: 'lg', bg: 'purple.50', cursor: 'pointer' }}
            >
              <Heading fontSize='xl'>{produto.nome}</Heading>
              <Text mt={4}>Preço: R$ {produto.preco}</Text>              
              
              <Text mt={2}>
                Estoque: 
                {produto.quantidadeEstoque === 0 ? (
                  <Badge colorScheme='red' borderRadius='full' px={2} ml={2}>Esgotado</Badge>
                ) : produto.quantidadeEstoque < 10 ? (
                  <Badge colorScheme='orange' borderRadius='full' px={2} ml={2}>Baixo ({produto.quantidadeEstoque})</Badge>
                ) : (
                  <Badge colorScheme='green' borderRadius='full' px={2} ml={2} variant='subtle'>Disponível ({produto.quantidadeEstoque})</Badge>
                )}
              </Text>
              {/* --------------------------- */}
            </Box>
          </Link>

        ))}

      </SimpleGrid>
    </Box>
  )
}

export default ListaProdutosPage