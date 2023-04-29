
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/HomePage";
import styled from "styled-components";
import { Header } from "./components/Header";
import { ProductProvider } from "./hooks/useProducts";
import ProductPage from "./pages/ProductPage";
import SignUp from "./pages/Login/SignUp";
import Login from "./pages/Login/Login";
import { UserProvider } from "./ContextAPI/ContextUser";

function App() {
    return (
      <UserProvider>
    <GlobalContainer>
      
      <Header />
      <BrowserRouter>
        <ProductProvider>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/" element={<Login/>}/>
            <Route path="/cadastro" element={<SignUp/>}/>
          </Routes>
        </ProductProvider>
      </BrowserRouter>
      
    </GlobalContainer>
    </UserProvider>

    );
  }

  export default App;

  const GlobalContainer = styled.div`
`
