import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { LocationProvider } from './Contexts/LocationContext.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer />

    <Toaster position="bottom-left" reverseOrder={false} />
    <LocationProvider>
      <App />
    </LocationProvider>
  </StrictMode>,
)
