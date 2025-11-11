import React, { useState, useEffect } from 'react'
import { Heading, Text, Box, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import { Link } from 'react-router-dom' // 1. Importar o Link

function ListaProdutosPage() {
  
  const [produtos, setProdutos] = useState([])

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
      
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        
        {/* 2. FAZER O MAP DOS PRODUTOS */}
        {produtos.map(produto => (
          
          // 3. ENVOLVER O CARD COM O LINK DINÂMICO
          <Link 
            key={produto.id} // A 'key' agora vem para o Link
            to={`/produtos/editar/${produto.id}`} // Rota dinâmica
            style={{ textDecoration: 'none' }} // Remove o sublinhado padrão do link
          >
            <Box 
              p={6} 
              shadow='md' 
              borderWidth='1px' 
              borderRadius='lg'
              bg='white'
              // Adiciona um efeito legal ao passar o mouse
              _hover={{ shadow: 'lg', bg: 'purple.50', cursor: 'pointer' }}
            >
              <Heading fontSize='xl'>{produto.nome}</Heading>
              <Text mt={4}>Preço: R$ {produto.preco}</Text>
              <Text>Estoque: {produto.quantidadeEstoque}</Text>
            </Box>
          </Link>

        ))}

      </SimpleGrid>
    </Box>
  )
}

export default ListaProdutosPage