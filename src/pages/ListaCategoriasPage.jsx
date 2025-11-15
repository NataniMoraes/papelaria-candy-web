import React, { useState, useEffect } from 'react'
import {
  Heading,
  Box,
  Button,
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
  // 1. Imports para o Modal e Formulário
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Flex
} from '@chakra-ui/react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import axios from 'axios'

function ListaCategoriasPage() {
  const [categorias, setCategorias] = useState([])
  const toast = useToast()
  
  // 2. Controladores do Modal
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  // 3. Estados para o formulário
  // Guarda a categoria que estamos editando (ou null se for criação)
  const [editingCategoria, setEditingCategoria] = useState(null)
  // Guarda o valor do input do formulário
  const [nomeCategoria, setNomeCategoria] = useState('')

  // Função para buscar os dados da API
  const buscarCategorias = () => {
    axios.get('http://localhost:8080/categorias')
      .then(response => {
        const dados = response.data;
        
        // Ordena o array 'dados' pelo campo 'nome'
        const dadosOrdenados = dados.sort((a, b) => {
          // localeCompare é a forma correta de comparar strings
          return a.nome.localeCompare(b.nome); 
        });
        // Salva a lista já ordenada no estado
        setCategorias(dadosOrdenados);
        // ------------------------------------------
      })
      .catch(error => console.error("Erro ao buscar categorias:", error))
  }

  // Busca inicial dos dados
  useEffect(() => {
    buscarCategorias()
  }, [])

  // 4. Função para abrir o modal (para Criar)
  const handleOpenModal = () => {
    setEditingCategoria(null) // Limpa o estado de edição
    setNomeCategoria('')     // Limpa o input
    onOpen()                 // Abre o modal
  }

  // 5. Função para abrir o modal (para Editar)
  const handleEdit = (categoria) => {
    setEditingCategoria(categoria) // Define a categoria que estamos editando
    setNomeCategoria(categoria.nome) // Preenche o input com o nome atual
    onOpen()                       // Abre o modal
  }

  // 6. Função para Salvar (Criar ou Editar)
  const handleSave = () => {
    const url = 'http://localhost:8080/categorias'
    const data = { nome: nomeCategoria }

    // Se estamos editando, muda o método e a URL
    const promise = editingCategoria
      ? axios.put(`${url}/${editingCategoria.id}`, data) // Atualizar (PUT)
      : axios.post(url, data) // Criar (POST)

    promise.then(() => {
      toast({
        title: `Categoria ${editingCategoria ? 'atualizada' : 'criada'}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      buscarCategorias() // Atualiza a lista na tela
      onClose()          // Fecha o modal
    }).catch(error => {
      console.error("Erro ao salvar categoria:", error)
      toast({
        title: "Erro ao salvar",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    })
  }

  // 7. Função para Excluir
  const handleDelete = (id) => {
    if (window.confirm("Tem certeza? Excluir uma categoria pode afetar produtos existentes.")) {
      axios.delete(`http://localhost:8080/categorias/${id}`)
        .then(() => {
          toast({
            title: "Categoria Excluída!",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          buscarCategorias() // Atualiza a lista
        })
        .catch(error => {
          // O ideal aqui seria tratar o erro 409 (Conflito)
          console.error("Erro ao excluir categoria:", error)
          toast({
            title: "Erro ao excluir",
            description: "Não é possível excluir categorias que possuem produtos associados.",
            status: "error",
            duration: 5000,
            isClosable: true,
          })
        })
    }
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Gerenciar Categorias</Heading>
        <Button
          leftIcon={<FaPlus />}
          colorScheme='candy' // Usando nosso tema!
          onClick={handleOpenModal}
        >
          Adicionar Categoria
        </Button>
      </Flex>
      
      {/* Tabela de Categorias */}
      <TableContainer bg="white" borderRadius="lg" shadow="md">
        <Table variant='simple'>
          <Thead bg="gray.50">
            <Tr>
              <Th>Nome da Categoria</Th>
              <Th isNumeric>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categorias.map(categoria => (
              <Tr key={categoria.id} _hover={{ bg: 'gray.50' }}>
                <Td>{categoria.nome}</Td>
                <Td isNumeric>
                  <HStack spacing={2} justify="flex-end">
                    <IconButton
                      colorScheme='purple'
                      icon={<FaEdit />}
                      aria-label='Editar categoria'
                      onClick={() => handleEdit(categoria)}
                    />
                    <IconButton
                      colorScheme='red'
                      icon={<FaTrash />}
                      aria-label='Excluir categoria'
                      onClick={() => handleDelete(categoria.id)}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* --- 8. O MODAL DO FORMULÁRIO --- */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <ModalHeader>
            {editingCategoria ? 'Editar Categoria' : 'Adicionar Nova Categoria'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Nome da Categoria</FormLabel>
              <Input
                value={nomeCategoria}
                onChange={(e) => setNomeCategoria(e.target.value)}
                placeholder="Ex: Cadernos"
                focusBorderColor="candy.500"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme='candy' type="submit">
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ListaCategoriasPage