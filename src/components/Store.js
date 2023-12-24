
// Components
import Product from './shared/Product';

// custom hook
import { useProducts } from '../context/ProductContextProvider';

// Style
import styles from "./Store.module.css";

import { useEffect, useState } from 'react';

import { ImSearch } from "react-icons/im"

import { createQueryObject, filterProducts, getInitialQuery, searchProducts } from '../helper/functions';
import { useSearchParams } from 'react-router-dom';

 
import BounceLoader from "react-spinners/BounceLoader";


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
        setQuery(getInitialQuery(searchParams))
        !searchParams && setDisplay(products)

    }, [products])

    useEffect(() => {
       setSearch(query.search || "")
       let finalProducts = searchProducts(products,query.search)
       finalProducts = filterProducts(finalProducts,query.category)
       setDisplay(finalProducts)
       setSearchParams(query)
    }, [query])


    const categories=[
       {id:1 , type:"All"},
       {id:2 , type:"Electronics"},
       {id:3 , type:"Jewelery"},
       {id:4 , type:"Men's clothing"},
       {id:5 , type:"Women's clothing"}
    ]


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
                 <div className={styles.loading}>
                  {display.length <=0 && <BounceLoader color="#1a73e8" size={40}/>}
                 </div>
                    {
                        display.map(product => <Product
                            key={product.id}
                            productData={product}
                        />)
                    }
                </div>

                <div className={styles.filterBox}>
                    <h3>categories</h3>
                    <ul onClick={filterHandler}>
                        {
                            categories.map((item)=>
                            <li key={item.id} className={item.type.toLowerCase() === query.category ? styles.selected : null}>{item.type}</li>)
                        }
                    </ul>
                </div>
            </div>

        </>
    );
};

export default Store;