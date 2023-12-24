import { Link } from 'react-router-dom';

// Functions
import { shorten,isInCart, quantityCount } from '../../helper/functions';

// Context
import { useCart } from '../../context/CartContextProvider';

// Icons
import trashIcon from "../../assets/icons/trash.svg";

// Style
import styles from "./Product.module.css";

const Product = ({ productData }) => {
    const { image, title, price, id } = productData
    const { state, dispatch } = useCart();


    return (
        <div className={styles.container} >
            <img className={styles.cardImage} src={image} alt="product" />
            <h3>{shorten(title)}</h3>
            <p>{`${price} $`}</p>
            <div className={styles.linkContainer}>
                <Link to={`/products/${id}`}>Details</Link>
                <div className={styles.buttonContainer}>

                {quantityCount(state, id) === 1 && <button className={styles.smallButton} onClick={() => dispatch({type: "REMOVE_ITEM", payload: productData})}><img src={trashIcon} alt="trash" /></button>}
                    {quantityCount(state, id) > 1 && <button className={styles.smallButton} onClick={() => dispatch({type: "DECREASE", payload: productData})}>-</button>}
                    {quantityCount(state, id) > 0 && <span className={styles.counter}>{quantityCount(state, id)}</span>}
                    {
                        isInCart(state, id) ?
                        <button className={styles.smallButton} onClick={() => dispatch({type: "INCREASE", payload: productData})}>+</button> :
                        <button onClick={() => dispatch({type: "ADD_ITEM", payload: productData})}>Add to Cart</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Product;