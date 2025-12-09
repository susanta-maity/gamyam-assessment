import './App.css'
import ProductListView from './pages/ProductListView'
import ProductCardView from './pages/ProductCardView'
import { BrowserRouter, createBrowserRouter, Link, Navigate, Route, Routes } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import Header from './component/Header'
import '@coreui/coreui/dist/css/coreui.min.css';

function App() {
  // const appRouter = createBrowserRouter([
  //   {
  //     path: "*",
  //     element: <Navigate to="/list" replace />
  //     // element: <ProductListView />
  //   },
  //   {
  //     path: "/list",
  //     element: <ProductListView />
  //   },
  //   {
  //     path: "/card",
  //     element: <ProductCardView />
  //   }
  // ])

  // return (
  //   <div>
  //     <Header />
  //     <RouterProvider router={appRouter} />
  //   </div>
  // );

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/list" element={<ProductListView />} />
        <Route path="/card" element={<ProductCardView />} />

        {/* Default */}
        <Route path="*" element={<ProductListView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
