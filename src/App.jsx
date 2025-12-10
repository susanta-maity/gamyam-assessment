import './App.css'
import ProductListView from './pages/ProductListView'
import ProductCardView from './pages/ProductCardView'
import { BrowserRouter, createBrowserRouter, Link, Navigate, Route, Routes } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import Header from './component/Header'
import '@coreui/coreui/dist/css/coreui.min.css';
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ProductListView />} />
        <Route path="/card" element={<ProductCardView />} />

        <Route path="*" element={<ProductListView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
