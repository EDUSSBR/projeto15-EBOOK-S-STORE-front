import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const ProductContext = createContext();

export function ProductProvider({children}){
    const [products, setProducts] = useState([])
    return <ProductContext.Provider value={{setProducts, products}}>
        {children}
    </ProductContext.Provider>
}

export function useProduct(){
    const context = useContext(ProductContext)
    return context;
}