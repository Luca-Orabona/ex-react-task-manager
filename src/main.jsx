import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalProvider } from './context/GlobalContext.jsx';
import "bootstrap/dist/css/bootstrap.css";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  //</StrictMode>,
)
