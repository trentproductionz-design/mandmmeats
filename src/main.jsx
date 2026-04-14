import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CustomProcessing from './pages/CustomProcessing.jsx'
import VenisonProcessing from './pages/VenisonProcessing.jsx'
import CutSheets from './pages/CutSheets.jsx'
import ContactUs from './pages/ContactUs.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/custom-processing" element={<CustomProcessing />} />
        <Route path="/venison-processing" element={<VenisonProcessing />} />
        <Route path="/cut-sheets" element={<CutSheets />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
