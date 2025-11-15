import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import theme from './theme'

// Importar páginas
import HomePage from './pages/HomePage.jsx'
import ListaProdutosPage from './pages/ListaProdutosPage.jsx'
import CadastroProdutoPage from './pages/CadastroProdutoPage.jsx'
import EditarProdutoPage from './pages/EditarProdutoPage.jsx'
import ListaCategoriasPage from './pages/ListaCategoriasPage.jsx'
import PontoDeVendaPage from './pages/PontoDeVendaPage.jsx'

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
      {
        path: "/produtos/editar/:id",
        element: <EditarProdutoPage />,
      },
      { 
        path: "/categorias", 
        element: <ListaCategoriasPage />,
      },


    ]
  },
]);

// 3. Renderizar o aplicativo
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 4. Aplicar seu 'theme' aqui */}
    <ChakraProvider theme={theme}> 
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)