
// Context
import { useCart } from '../../context/CartContextProvider';
// Functions
import { shorten } from '../../helper/functions';

// Icons
import trashIcon from "../../assets/icons/trash.svg";

// Style
import styles from "./Cart.module.css";

const Cart = ({data}) => {

    const {dispatch} = useCart();
    const {image, title, price, quantity} = data;

    return (
        <div className={styles.container} >
            <img className={styles.productImage} src={image} />
            <div className={styles.data}>
                <h3>{shorten(title)}</h3>
                <p>{price} $</p>
            </div>
            <div>
                <span className={styles.quantity}>{quantity}</span>
            </div>
            <div className={styles.buttonContainer}>
                {
                    quantity > 1 ? 
                    <button onClick={() => dispatch({type: "DECREASE", payload: data})} >-</button> :
                    <button onClick={() => dispatch({type: "REMOVE_ITEM", payload: data})} ><img src={trashIcon} alt="trash" /></button>
                }
                <button onClick={() => dispatch({type: "INCREASE", payload: data})} >+</button>
            </div>
        </div>
    );
};

export default Cart;