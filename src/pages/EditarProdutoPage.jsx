import React, { useState, useEffect } from 'react'
import {
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
  Spinner,
  Flex
} from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function EditarProdutoPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  // --- Estado para os dados do formulário ---
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: 0,
    quantidadeEstoque: 0,
    codigoBarras: '',
    categoriaId: ''
  })
  const [categorias, setCategorias] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // --- useEffect CORRIGIDO (para buscar os dados) ---
  useEffect(() => {
    // Função para buscar o produto específico
    const fetchProduto = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/produtos/${id}`)
        const produto = response.data
        // Preenche o formulário com os dados do produto
        setFormData({
          nome: produto.nome,
          descricao: produto.descricao,
          preco: produto.preco,
          quantidadeEstoque: produto.quantidadeEstoque,
          codigoBarras: produto.codigoBarras,
          categoriaId: produto.categoria.id // Pega o ID da categoria
        })
      } catch (error) {
        console.error("Erro ao buscar produto:", error)
        toast({
          title: "Erro ao buscar produto.",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      }
    }

    // Função para buscar todas as categorias (para o <Select>)
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categorias')
        setCategorias(response.data)
      } catch (error) {
        console.error("Erro ao buscar categorias:", error)
      }
    }

    // Executa as duas buscas e para de carregar
    Promise.all([fetchProduto(), fetchCategorias()]).then(() => {
      setIsLoading(false)
    })
  }, [id, toast]) // Depende do 'id' da URL

  // --- handleChange CORRIGIDO (para atualizar o formulário) ---
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // --- handleSubmit CORRIGIDO (para salvar as alterações) ---
  const handleSubmit = (e) => {
    e.preventDefault()

    axios.put(`http://localhost:8080/produtos/${id}`, formData)
      .then(response => {
        toast({
          title: "Produto Atualizado!",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
        navigate('/produtos') // Volta para a lista
      })
      .catch(error => {
        console.error("Erro ao atualizar produto:", error)
        toast({
          title: "Erro ao atualizar",
          description: "Houve um problema ao salvar suas alterações.",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      })
  }

  // --- Função para DELETAR (já estava correta) ---
  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.")) {
      
      axios.delete(`http://localhost:8080/produtos/${id}`)
        .then(response => {
          toast({
            title: "Produto Excluído!",
            status: "success",
            duration: 5000,
            isClosable: true,
          })
          navigate('/produtos') // Volta para a lista
        })
        .catch(error => {
          console.error("Erro ao excluir produto:", error)
          toast({
            title: "Erro ao excluir",
            description: "Houve um problema ao excluir o produto.",
            status: "error",
            duration: 5000,
            isClosable: true,
          })
        })
    }
  }

  if (isLoading) {
    return <Spinner size="xl" />
  }

  // --- O formulário (já estava correto) ---
  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Heading mb={6}>Editar Produto: {formData.nome}</Heading>

      <FormControl isRequired mb={4}>
        <FormLabel>Nome do Produto</FormLabel>
        <Input name="nome" value={formData.nome} onChange={handleChange} />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Descrição</FormLabel>
        <Input name="descricao" value={formData.descricao} onChange={handleChange} />
      </FormControl>

      <FormControl isRequired mb={4}>
        <FormLabel>Preço</FormLabel>
        <Input name="preco" type="number" step="0.01" value={formData.preco} onChange={handleChange} />
      </FormControl>

      <FormControl isRequired mb={4}>
        <FormLabel>Quantidade em Estoque</FormLabel>
        <Input name="quantidadeEstoque" type="number" value={formData.quantidadeEstoque} onChange={handleChange} />
      </FormControl>

      <FormControl isRequired mb={4}>
        <FormLabel>Código de Barras</FormLabel>
        <Input name="codigoBarras" value={formData.codigoBarras} onChange={handleChange} />
      </FormControl>

      <FormControl isRequired mb={4}>
        <FormLabel>Categoria</FormLabel>
        <Select
          name="categoriaId"
          value={formData.categoriaId}
          onChange={handleChange}
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </Select>
      </FormControl>

      <Flex mt={4} justify="space-between">
        <Button type="submit" colorScheme="purple" size="lg">
          Salvar Alterações
        </Button>
        
        <Button
          type="button"
          colorScheme="red"
          size="lg"
          onClick={handleDelete}
        >
          Excluir Produto
        </Button>
      </Flex>
    </Box>
  )
}

export default EditarProdutoPage