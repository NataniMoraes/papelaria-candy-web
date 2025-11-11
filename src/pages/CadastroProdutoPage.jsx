import React, { useState, useEffect } from 'react'
import {
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast // Para mostrar uma notificação de sucesso/erro
} from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // Para redirecionar após o cadastro

function CadastroProdutoPage() {
  // Estado para guardar os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: 0,
    quantidadeEstoque: 0,
    codigoBarras: '',
    categoriaId: '' // Só o ID da categoria
  })

  // Estado para guardar a lista de categorias
  const [categorias, setCategorias] = useState([])

  // Hooks úteis
  const toast = useToast()
  const navigate = useNavigate()

  // 1. Busca as categorias da API quando a página carrega
  useEffect(() => {
    axios.get('http://localhost:8080/categorias')
      .then(response => {
        setCategorias(response.data)
      })
      .catch(error => {
        console.error("Erro ao buscar categorias:", error)
        toast({
          title: "Erro ao carregar categorias",
          description: "Não foi possível buscar a lista de categorias.",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      })
  }, [])

  // 2. Função para atualizar o estado quando o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // 3. Função para enviar os dados quando o formulário é submetido
  const handleSubmit = (e) => {
    e.preventDefault() // Impede o recarregamento da página

    axios.post('http://localhost:8080/produtos', formData)
      .then(response => {
        // Sucesso!
        toast({
          title: "Produto Cadastrado!",
          description: "Seu novo produto foi salvo com sucesso.",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
        // Redireciona o usuário para a lista de produtos
        navigate('/produtos')
      })
      .catch(error => {
        // Erro!
        console.error("Erro ao cadastrar produto:", error)
        toast({
          title: "Erro ao cadastrar",
          description: "Houve um problema ao salvar o produto.",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      })
  }

  // 4. O formulário em si
  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Heading mb={6}>Cadastro de Novo Produto</Heading>

      <FormControl isRequired mb={4}>
        <FormLabel>Nome do Produto</FormLabel>
        <Input name="nome" onChange={handleChange} />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Descrição</FormLabel>
        <Input name="descricao" onChange={handleChange} />
      </FormControl>

      <FormControl isRequired mb={4}>
        <FormLabel>Preço (ex: 25.50)</FormLabel>
        <Input name="preco" type="number" step="0.01" onChange={handleChange} />
      </FormControl>

      <FormControl isRequired mb={4}>
        <FormLabel>Quantidade em Estoque</FormLabel>
        <Input name="quantidadeEstoque" type="number" onChange={handleChange} />
      </FormControl>

      <FormControl isRequired mb={4}>
        <FormLabel>Código de Barras</FormLabel>
        <Input name="codigoBarras" onChange={handleChange} />
      </FormControl>

      <FormControl isRequired mb={4}>
        <FormLabel>Categoria</FormLabel>
        <Select
          name="categoriaId"
          placeholder="Selecione uma categoria"
          onChange={handleChange}
        >
          {/* Mapeia a lista de categorias no menu suspenso */}
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" colorScheme="purple" size="lg" mt={4}>
        Salvar Produto
      </Button>
    </Box>
  )
}

export default CadastroProdutoPage