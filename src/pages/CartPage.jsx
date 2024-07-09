/* eslint-disable no-unused-vars */
import MainLayout from "../components/MainLayout"
import './style.css'
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { add, reduce, decrease } from '../redux/countSlice'

// eslint-disable-next-line react/prop-types
const CartPage = ({ isLogged, setIsLogged, setId }) => {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.count.value)
    const { name } = useParams()
    const navigate = useNavigate()
    let cart = JSON.parse(localStorage.getItem('carts')) || []
    const handleRemove = (id) => {
        let newCart = cart.filter((cart) => cart.id !== id)
        localStorage.setItem('carts', JSON.stringify(newCart))
        dispatch(reduce())
    }
    let total = 0
    let totalItems = 0
    if (cart != null) {
        for (let i = 0; i < cart.length; i++) {
            let item = cart[i]
            totalItems += item.Quantity
            let amount = item.Quantity * item.price
            total += amount
        }
    }
    let nfObject = new Intl.NumberFormat('en-IN');
    let output = nfObject.format(total);
    const handleCheckout = () => {
        if (cart.length == 0) {
            return false
        }
        else {
            navigate(`/checkout/${name}`);
        }
    }
    const handlePage = (id) => {
        setId(id)
        navigate(isLogged ? `/product-info/${name}` : '/product-info')
    }
    const handleIncrease = (data) => {
        let storage = JSON.parse(localStorage.getItem("carts"));
        if (storage == null) {
            storage = [];
        }
        let found = storage.find((storage) => storage.id === data.id)
        if (found) {
            found.Quantity += 1
            dispatch(add());
        }
        localStorage.setItem('carts', JSON.stringify(storage))
    }
    const handleDecrease = (data) => {
        let storage = JSON.parse(localStorage.getItem("carts"));
        if (storage == null) {
            storage = [];
        }
        let found = storage.find((storage) => storage.id === data.id)
        if (found) {
            if (found.Quantity > 1) {
                found.Quantity -= 1
                dispatch(decrease()); 
                localStorage.setItem('carts', JSON.stringify(storage))
            }
            else {
                let newCart = cart.filter((cart) => cart.id !== data.id)
                localStorage.setItem('carts', JSON.stringify(newCart))
                dispatch(reduce())
            }
        }
    }
    return (
        <MainLayout isLogged={isLogged} setIsLogged={setIsLogged} name={name}>
            <div className="cartpage">
                <h1 style={{ margin: '30px auto', width: '350px', fontSize: '3.5rem' }}>Product Cart</h1>
                {isLogged ? <div className="boxes">
                    <div className="product-cart">
                        <h1 className="shopping-cart">Shopping Cart</h1>
                        {cart.map((cart) => (
                            <div key={cart.id} className='cartbox'>
                                <img src={cart.imageUrl} alt="Product" onClick={() => { handlePage(cart.id) }} />
                                <div className='cartbox-1'>
                                    <span>{cart.name}</span>
                                    <span>₹{cart.price}</span>
                                    <span className="item-quantity">Quantity:
                                        <div onClick={() => { handleDecrease(cart) }}>-</div>
                                        {cart.Quantity}
                                        <div onClick={() => { handleIncrease(cart) }}>+</div>
                                    </span>
                                    <button className="remove" onClick={() => { handleRemove(cart.id) }}>Remove</button>
                                </div>
                            </div>
                        ))}</div>
                    <div className="proceed-to-buy">
                        <h1>Cart Total</h1>
                        <div>Subtotal ({totalItems} items): ₹{output}
                        </div>
                        <button onClick={handleCheckout}>Proceed to Buy</button>
                    </div>
                </div> : <p style={{ width: '180px', margin: 'auto', fontSize: '2rem' }}>Empty Cart!</p>}
            </div>
        </MainLayout>
    )
}
export default CartPage