import { useState, useEffect, createContext , useContext } from 'react';

// API
import { getProducts } from '../services/api';

 const ProductsContext = createContext();

const ProductContextProvider = ({children}) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        
        const fetchAPI = async () => {
            setProducts(await getProducts());
        }
        fetchAPI();
    }, []);


    return (
        <ProductsContext.Provider value={products}>
            {children}
        </ProductsContext.Provider>
    );
};
//custom hook
export const useProducts=()=>{
    const products = useContext(ProductsContext)
    return products;
}

export default ProductContextProvider;