import { Box, Flex, Heading, Text, HStack } from '@chakra-ui/react'
import { NavLink, Outlet } from 'react-router-dom'
import { FaHome, FaBox, FaPlusCircle, FaTags, FaShoppingCart} from 'react-icons/fa' 

const NavItem = ({ to, icon, children, end }) => { 
  const activeStyle = {
    background: 'white',
    color: '#be185d', 
    borderRadius: '8px',
  }

  return (
    <NavLink 
      to={to} 
      style={({ isActive }) => (isActive ? activeStyle : undefined)} 
      end={end}
    >
      <HStack p={3} spacing={4} _hover={{ bg: 'gray.200', borderRadius: '8px' }}>
        <Box as={icon} size="20px" color="candy.700" />
        <Text fontSize='lg' fontWeight='bold'>{children}</Text>
      </HStack>
    </NavLink>
  )
}

function App() {
  return (
    <Flex w='100%'>
      {/* 1. SIDEBAR (Navegação) */}
      <Box
        w='300px'
        h='100vh'
        bg='gray.100'
        p={4}
      >
        <Heading as='h1' size='lg' color='candy.700' mb={8} textAlign="center" p={2}>
          Papelaria 🍭Candy
        </Heading>

        {/* Links de Navegação */}
        <NavItem to="/" icon={FaHome} end> {/* Adicione 'end' ao Home também */}
          Home
        </NavItem>
        <NavItem to="/vendas/novo" icon={FaShoppingCart}>
          Ponto de Venda
        </NavItem>
        <NavItem to="/produtos" end icon={FaBox}>
          Listar Produtos
        </NavItem>
        <NavItem to="/produtos/novo" icon={FaPlusCircle}>
          Cadastrar Produto
        </NavItem>
        <NavItem to="/categorias" icon={FaTags} end>
          Gerenciar Categorias
        </NavItem>
        {/* ---------------------------------- */}
        
      </Box>

      {/* 2. ÁREA DE CONTEÚDO */}
      <Box
        flex='1'
        h='100vh'
        p={10}
        bg='candy.50'
        overflowY="auto"
      >
        <Outlet />
      </Box>
    </Flex>
  )
}

export default App