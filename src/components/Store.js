
// Components
import Product from './shared/Product';

// custom hook
import { useProducts } from '../context/ProductContextProvider';

// Style
import styles from "./Store.module.css";

import { useEffect, useState } from 'react';

import { ImSearch } from "react-icons/im"

import { createQueryObject, filterProducts, searchProducts } from '../helper/functions';
import { useSearchParams } from 'react-router-dom';

const Store = () => {

    const products = useProducts()
    const [display, setDisplay] = useState([])
    const [search, setSearch] = useState("")
    const [query, setQuery] = useState({})

    const [searchParams,setSearchParams]=useSearchParams()

    const searchHandler = (e) => {
        setQuery(query => createQueryObject(query,{search}))
    }
    const filterHandler = (e) => {
        if (e.target.tagName !== "LI") return
        const category = e.target.innerText.toLowerCase()
        setQuery(query => createQueryObject(query , {category}) )
    }

    useEffect(() => {
        setDisplay(products)
    }, [products])

    useEffect(() => {
       let finalProducts = searchProducts(products,query.search)
       finalProducts = filterProducts(finalProducts,query.category)
       setDisplay(finalProducts)
       setSearchParams(query)
    }, [query])


    return (
        <>
            <div className={styles.inputContainer}>
                <input type='text' placeholder='search' value={search}
                 onChange={(e) => setSearch(e.target.value.toLowerCase().trim())} 
                  />
                <button onClick={searchHandler}><ImSearch /></button>
            </div>
            <div className={styles.container} >

                <div className={styles.productContainer}>
                    {
                        display.map(product => <Product
                            key={product.id}
                            productData={product}
                        />)
                    }
                </div>

                <div>
                    <h5>categories</h5>
                    <ul onClick={filterHandler}>
                        <li>All</li>
                        <li>Electronics</li>
                        <li>Jewelery</li>
                        <li>Men's clothing</li>
                        <li>Women's clothing</li>
                    </ul>
                </div>
            </div>

        </>
    );
};

export default Store;