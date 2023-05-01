
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/HomePage";
import styled from "styled-components";
import { ProductProvider } from "./hooks/useProducts";
import ProductPage from "./pages/ProductPage";
import { CartProvider } from "./hooks/useCart";
import SignUp from "./pages/Login/SignUp";
import Login from "./pages/Login/Login";
import { UserProvider } from "./ContextAPI/ContextUser";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

function App() {
  return (
    <UserProvider>
      <GlobalContainer>
        <BrowserRouter>
          <ProductProvider>
            <CartProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<SignUp />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/pedidos" element={<Orders />}/>
              </Routes>
            </CartProvider>
          </ProductProvider>
        </BrowserRouter>
      </GlobalContainer>
    </UserProvider>

  );
}

export default App;

const GlobalContainer = styled.div`
`
