import React, { useState, useEffect } from 'react'
import {
  Heading,
  Box,
  HStack, // Layout horizontal
  VStack, // Layout vertical
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  useToast,
  Divider,
  IconButton
} from '@chakra-ui/react'
import { FaSearch, FaPlusCircle, FaTrash } from 'react-icons/fa'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function PontoDeVendaPage() {
  const [produtos, setProdutos] = useState([])
  const [busca, setBusca] = useState('')
  const [carrinho, setCarrinho] = useState([]) // Nosso carrinho de compras!
  const [total, setTotal] = useState(0)

  const toast = useToast()
  const navigate = useNavigate()

  // 1. Busca os produtos da API
  useEffect(() => {
    axios.get('http://localhost:8080/produtos')
      .then(response => {
        // Ordena por nome
        const dadosOrdenados = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
        setProdutos(dadosOrdenados)
      })
      .catch(error => console.error("Erro ao buscar produtos:", error))
  }, [])

  // 2. Filtro de busca (igual ao da Lista de Produtos)
  const produtosFiltrados = produtos.filter(produto => 
    produto.nome.toLowerCase().includes(busca.toLowerCase()) &&
    produto.quantidadeEstoque > 0 // Só mostra produtos com estoque!
  )

  // 3. Lógica para adicionar ao carrinho
  const adicionarAoCarrinho = (produto) => {
    // Verifica se o item JÁ ESTÁ no carrinho
    const itemExistente = carrinho.find(item => item.produtoId === produto.id)

    if (itemExistente) {
      // Se sim, apenas incrementa a quantidade
      // (Mas antes, verifica se há estoque para isso)
      if (itemExistente.quantidade < produto.quantidadeEstoque) {
        setCarrinho(carrinho.map(item => 
          item.produtoId === produto.id 
            ? { ...item, quantidade: item.quantidade + 1 } 
            : item
        ))
      } else {
        toast({ title: "Estoque máximo atingido!", status: 'warning', duration: 2000 })
      }
    } else {
      // Se não, adiciona o novo item ao carrinho
      setCarrinho([...carrinho, { 
        produtoId: produto.id, 
        nome: produto.nome, 
        preco: produto.preco, 
        quantidade: 1 
      }])
    }
  }

  // 4. Lógica para remover do carrinho
  const removerDoCarrinho = (produtoId) => {
    setCarrinho(carrinho.filter(item => item.produtoId !== produtoId))
  }

  // 5. Calcula o total sempre que o carrinho mudar
  useEffect(() => {
    const novoTotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0)
    setTotal(novoTotal)
  }, [carrinho])

  // 6. Finaliza a venda!
  const finalizarVenda = () => {
    if (carrinho.length === 0) {
      toast({ title: "Carrinho está vazio!", status: 'error', duration: 3000 })
      return;
    }

    // Prepara os dados para a API (só ID e quantidade)
    const dadosVenda = {
      itens: carrinho.map(item => ({
        produtoId: item.produtoId,
        quantidade: item.quantidade
      }))
    }

    axios.post('http://localhost:8080/vendas', dadosVenda)
      .then(response => {
        toast({ title: "Venda realizada com sucesso!", status: 'success', duration: 3000 })
        setCarrinho([]) // Limpa o carrinho
        navigate('/') // Volta para o Dashboard
        // Idealmente, deveríamos re-buscar os produtos, pois o estoque mudou
      })
      .catch(error => {
        console.error("Erro ao finalizar venda:", error)
        toast({ 
          title: "Erro ao finalizar venda", 
          description: error.response?.data?.message || "Verifique o estoque.",
          status: 'error', 
          duration: 5000 
        })
      })
  }

  return (
    <Box>
      <Heading mb={6}>Ponto de Venda</Heading>
      
      <HStack spacing={6} align="flex-start">

        {/* --- COLUNA DA ESQUERDA (Produtos) --- */}
        <VStack flex={2} bg="white" p={6} borderRadius="lg" shadow="md" spacing={4} align="stretch">
          <Heading as="h3" size="lg">Produtos Disponíveis</Heading>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <FaSearch color='gray.300' />
            </InputLeftElement>
            <Input 
              placeholder='Buscar produto por nome...' 
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              focusBorderColor="candy.500"
            />
          </InputGroup>

          {/* Lista de Produtos */}
          <VStack 
            spacing={3} 
            align="stretch" 
            maxH="60vh" // Altura máxima para a lista
            overflowY="auto" // Scroll
            pr={2} // Espaço para o scrollbar
          >
            {produtosFiltrados.map(produto => (
              <HStack 
                key={produto.id} 
                justify="space-between" 
                p={3} 
                borderRadius="md" 
                borderWidth="1px"
                _hover={{ bg: 'gray.50' }}
              >
                <Box>
                  <Text fontWeight="bold">{produto.nome}</Text>
                  <Text fontSize="sm" color="gray.500">
                    Estoque: {produto.quantidadeEstoque} | R$ {produto.preco.toFixed(2)}
                  </Text>
                </Box>
                <IconButton
                  icon={<FaPlusCircle />}
                  colorScheme='candy'
                  aria-label='Adicionar ao carrinho'
                  onClick={() => adicionarAoCarrinho(produto)}
                />
              </HStack>
            ))}
          </VStack>
        </VStack>

        {/* --- COLUNA DA DIREITA (Carrinho) --- */}
        <VStack flex={1} bg="white" p={6} borderRadius="lg" shadow="md" spacing={4} align="stretch">
          <Heading as="h3" size="lg">Carrinho</Heading>
          
          {/* Itens do Carrinho */}
          <VStack spacing={3} align="stretch" flex={1}>
            {carrinho.length === 0 ? (
              <Text color="gray.500">Carrinho vazio...</Text>
            ) : (
              carrinho.map(item => (
                <HStack key={item.produtoId} justify="space-between" p={2} borderBottomWidth="1px" borderColor="gray.100">
                  <Box>
                    <Text fontWeight="bold">{item.nome}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {item.quantidade} x R$ {item.preco.toFixed(2)}
                    </Text>
                  </Box>
                  <IconButton
                    icon={<FaTrash />}
                    colorScheme='red'
                    variant='ghost'
                    size="sm"
                    aria-label='Remover do carrinho'
                    onClick={() => removerDoCarrinho(item.produtoId)}
                  />
                </HStack>
              ))
            )}
          </VStack>

          <Divider />

          {/* Total */}
          <VStack align="stretch" spacing={4}>
            <HStack justify="space-between">
              <Text fontSize="xl" fontWeight="bold" color="gray.600">Total:</Text>
              <Text fontSize="2xl" fontWeight="bold" color="candy.700">
                R$ {total.toFixed(2)}
              </Text>
            </HStack>
            <Button 
              colorScheme="candy" 
              size="lg" 
              w="100%" 
              onClick={finalizarVenda}
              isDisabled={carrinho.length === 0} // Desabilita se o carrinho estiver vazio
            >
              Finalizar Venda
            </Button>
          </VStack>
        </VStack>

      </HStack>
    </Box>
  )
}

export default PontoDeVendaPage