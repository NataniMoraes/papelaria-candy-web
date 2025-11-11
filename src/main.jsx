import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react' // 1. Importar

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Envolver o <App /> com o Provider */}
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)