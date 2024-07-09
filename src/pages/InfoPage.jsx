import MainLayout from "../components/MainLayout"
import { getProduct } from '../services/apiclient';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../redux/countSlice'

// eslint-disable-next-line react/prop-types
const InfoPage = ({ isLogged, setIsLogged, id }) => {
    const dispatch = useDispatch()
    const count = useSelector((state) => state.count.value)
    const { name } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const fetchData = useCallback(async () => {
        const response = await getProduct(id)
        setData(response)
    }, [id])
    useEffect(() => {
        fetchData()
    }, [fetchData])
    const handleBuy = (e, data) => {
        e.stopPropagation();
        if (isLogged) {
            if (count < 50) {
                dispatch(add())
                let storage = JSON.parse(localStorage.getItem("carts"));
                if (storage == null) {
                    storage = [];
                }
                let found = storage.find((storage) => storage.id === data.id)
                if (found) {
                    found.Quantity += 1
                }
                else {
                    storage.push({ ...data, Quantity: 1 })
                }
                localStorage.setItem('carts', JSON.stringify(storage))
                navigate(`/cart/${name}`)
            }
            else {
                return false
            }
        }
        else {
            navigate('/login')
        }
    }
    const handleAdd = (e, data) => {
        e.stopPropagation();
        if (count < 50) {
            dispatch(add())
            let storage = JSON.parse(localStorage.getItem("carts"));
            if (storage == null) {
                storage = [];
            }
            let found = storage.find((storage) => storage.id === data.id)
            if (found) {
                found.Quantity += 1
            }
            else {
                storage.push({ ...data, Quantity: 1 })
            }
            localStorage.setItem('carts', JSON.stringify(storage))
        }
        else{
            return false
        }
    }
    return (
        <MainLayout isLogged={isLogged} setIsLogged={setIsLogged} name={name}>
            <h1 style={{ margin: '30px auto', width: '600px', fontSize: '3.5rem' }}>Product Description</h1>
            <div key={data.id} className='product' >
                <img src={data.imageUrl} alt="Product" />
                <div>
                    <div className='product1'>
                        <span>{data.name}</span>
                        <span>₹{data.price}</span>
                        <span>Quantity: {data.Quantity}</span>
                    </div>
                    <div className='product2'>
                        <button className='green' onClick={(e) => handleBuy(e, data)} >Buy Now</button>
                        <button className='delete' onClick={isLogged ? (e) => { handleAdd(e, data) } : ''} >Add to Cart</button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
export default InfoPage