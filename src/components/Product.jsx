/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { getData } from '../services/apiclient';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../redux/countSlice'

export const Product = ({ isLogged, setId, name, list, setList }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const count = useSelector((state) => state.count.value)
    const fetchData = useCallback(async () => {
        const response = await getData()
        setList(response)
    }, [setList])
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
    const handlePage = (id) => {
        setId(id)
        navigate(isLogged ? `/product-info/${name}` : '/product-info')
    }
    const handleProp = (e) => {
        e.stopPropagation();
    }
    return (
        <>
            {list.map((data) => (
                <div key={data.id} className='pro' onClick={() => { handlePage(data.id) }}>
                    <img src={data.imageUrl} alt="Product" />
                    <div className='pro1'>
                        <span>{data.name}</span>
                        <span>₹{data.price}</span>
                    </div>
                    <div className='pro2'>
                        <button onClick={(e) => handleBuy(e, data)}>Buy Now</button>
                        <button onClick={isLogged ? (e) => { handleAdd(e, data) } : (e) => handleProp(e)}>Add to Cart</button>
                    </div>
                </div>
            ))}
        </>
    )
}