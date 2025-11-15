import React, { useState, useEffect } from 'react'
import {
  Heading,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  HStack,
  useToast,
  Badge, // 1. Importar Badge
  Input, // 2. Importar Input (para a busca)
  InputGroup,
  InputLeftElement,
  Text
} from '@chakra-ui/react'
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa' // 3. Importar ícone de busca
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ListaProdutosPage() {
  const [produtos, setProdutos] = useState([])
  const [busca, setBusca] = useState('') // 4. Estado para a barra de busca
  const navigate = useNavigate()
  const toast = useToast()

  const buscarProdutos = () => {
    axios.get('http://localhost:8080/produtos')
      .then(response => {
        // Ordena por nome assim que busca
        const dadosOrdenados = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
        setProdutos(dadosOrdenados)
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error)
        toast({ title: "Erro ao buscar produtos", status: "error" })
      })
  }

  useEffect(() => {
    buscarProdutos()
  }, [])

  // 5. Lógica de filtro para a busca
  const produtosFiltrados = produtos.filter(produto => 
    produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
    produto.categoria.nome.toLowerCase().includes(busca.toLowerCase())
  )

  const handleEdit = (id) => {
    navigate(`/produtos/editar/${id}`)
  }

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      axios.delete(`http://localhost:8080/produtos/${id}`)
        .then(() => {
          toast({ title: "Produto Excluído!", status: "success" })
          buscarProdutos() // Re-busca os produtos para atualizar a lista
        })
        .catch(error => {
          console.error("Erro ao excluir produto:", error)
          toast({ title: "Erro ao excluir produto", status: "error" })
        })
    }
  }

  return (
    <Box>
      <Heading mb={6}>Lista de Produtos</Heading>
      
      {/* --- 6. BARRA DE BUSCA --- */}
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

      {/* --- 7. VERIFICAÇÃO DE ESTADO VAZIO --- */}
      {produtosFiltrados.length === 0 ? (
        <Box textAlign="center" p={10} bg="white" borderRadius="lg" shadow="md">
          <Heading as="h3" size="lg" color="gray.500">
            Nenhum produto encontrado 😢
          </Heading>
          <Text color="gray.600" mt={4}>
            Tente redefinir sua busca ou cadastre um novo produto!
          </Text>
        </Box>
      ) : (
        /* --- 8. TABELA DE PRODUTOS --- */
        <TableContainer bg="white" borderRadius="lg" shadow="md">
          <Table variant='simple'>
            <Thead bg="gray.50">
              <Tr>
                <Th>Nome</Th>
                <Th>Categoria</Th>
                <Th isNumeric>Preço (R$)</Th>
                <Th>Estoque</Th> {/* Alinhado à esquerda para o Badge */}
                <Th isNumeric>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {produtosFiltrados.map(produto => (
                <Tr key={produto.id} _hover={{ bg: 'gray.50' }}>
                  <Td>{produto.nome}</Td>
                  <Td>{produto.categoria.nome}</Td>
                  <Td isNumeric>{produto.preco.toFixed(2)}</Td>
                  <Td>
                    {/* --- 9. BADGES DE ESTOQUE --- */}
                    {produto.quantidadeEstoque === 0 ? (
                      <Badge colorScheme='red' borderRadius='full' px={2}>Esgotado</Badge>
                    ) : produto.quantidadeEstoque < 10 ? (
                      <Badge colorScheme='orange' borderRadius='full' px={2}>Baixo ({produto.quantidadeEstoque})</Badge>
                    ) : (
                      <Badge colorScheme='green' borderRadius='full' px={2} variant='subtle'>Disponível ({produto.quantidadeEstoque})</Badge>
                    )}
                  </Td>
                  <Td isNumeric>
                    <HStack spacing={2} justify="flex-end">
                      <IconButton
                        colorScheme='purple'
                        icon={<FaEdit />}
                        aria-label='Editar produto'
                        onClick={() => handleEdit(produto.id)}
                      />
                      <IconButton
                        colorScheme='red'
                        icon={<FaTrash />}
                        aria-label='Excluir produto'
                        onClick={() => handleDelete(produto.id)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default ListaProdutosPage