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
  Spinner // Para mostrar um indicador de "carregando"
} from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom' // Importa o useParams

function EditarProdutoPage() {
  // O useParams nos dá acesso aos parâmetros da URL (ex: o ":id")
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  // Estado para os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: 0,
    quantidadeEstoque: 0,
    codigoBarras: '',
    categoriaId: ''
  })
  const [categorias, setCategorias] = useState([])
  const [isLoading, setIsLoading] = useState(true) // Estado de carregamento

  // 1. Busca os dados do PRODUTO e as CATEGORIAS quando a página carrega
  useEffect(() => {
    // Função para buscar o produto específico
    const fetchProduto = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/produtos/${id}`)
        // Preenche o formulário com os dados do produto
        const produto = response.data
        setFormData({
          nome: produto.nome,
          descricao: produto.descricao,
          preco: produto.preco,
          quantidadeEstoque: produto.quantidadeEstoque,
          codigoBarras: produto.codigoBarras,
          categoriaId: produto.categoria.id // Pega o ID da categoria do produto
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

  // 2. Função para atualizar o estado quando o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // 3. Função para ENVIAR A ATUALIZAÇÃO (PUT)
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

  // Se estiver carregando (buscando dados), mostra um Spinner
  if (isLoading) {
    return <Spinner size="xl" />
  }

  // 4. O formulário em si (igual ao de cadastro)
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
          value={formData.categoriaId} // Define o valor selecionado
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

      <Button type="submit" colorScheme="purple" size="lg" mt={4}>
        Salvar Alterações
      </Button>
    </Box>
  )
}

export default EditarProdutoPage