
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/HomePage";
import styled from "styled-components";
import { Header } from "./components/Header";
import { ProductProvider } from "./hooks/useProducts";
import ProductPage from "./pages/ProductPage";

function App() {
    return (<GlobalContainer>
      <Header />
      <BrowserRouter>
        <ProductProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductPage />} />
          </Routes>
        </ProductProvider>
      </BrowserRouter>
    </GlobalContainer>

    );
  }

  export default App;

  const GlobalContainer = styled.div`
`
