import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Importar nossas páginas
import HomePage from './pages/HomePage.jsx'
import ListaProdutosPage from './pages/ListaProdutosPage.jsx'
import CadastroProdutoPage from './pages/CadastroProdutoPage.jsx'
import EditarProdutoPage from './pages/EditarProdutoPage.jsx' // <-- 1. Importar a nova página

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [ 
      {
        path: "/", 
        element: <HomePage />,
      },
      {
        path: "/produtos", 
        element: <ListaProdutosPage />,
      },
      { 
        path: "/produtos/novo", 
        element: <CadastroProdutoPage />,
      },
      { // <-- 2. Adicionar a nova rota de edição
        path: "/produtos/editar/:id", // O :id é o parâmetro dinâmico
        element: <EditarProdutoPage />,
      },
    ]
  },
]);

// Renderizar o aplicativo
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)