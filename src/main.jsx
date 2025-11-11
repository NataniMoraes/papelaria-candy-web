import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react' // Importante!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* O <App /> DEVE estar dentro do <ChakraProvider> */}
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)