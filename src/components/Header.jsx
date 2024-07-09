/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import cart from '../assets/cart.svg'
import search from '../assets/search.svg'
import logo from '../assets/newlogo.png'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/countSlice'
import { getData } from '../services/apiclient';
import { useEffect, useCallback } from 'react';
import { Dropdown } from "flowbite-react";

const Header = ({ isLogged, setIsLogged, name, list, setList, searchVal, setSearchVal }) => {
    const count = useSelector((state) => state.count.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let response
    const fetchData = useCallback(async () => {
        response = await getData()
        await setList(response)
    }, [searchVal])
    useEffect(() => {
        fetchData()
    }, [fetchData])
    const handleDelete = () => {
        localStorage.removeItem('carts')
        localStorage.removeItem('orders')
        setIsLogged(false);
    }
    const handleSearch = () => {
        if (searchVal === "") { setList(response); }
        const filterBySearch = list.filter((item) => {
            if (item.name.toLowerCase().includes(searchVal.toLowerCase())) { return item; }
        })
        setList(filterBySearch);
    }
    const handleOrder = () => {
        navigate(`/orders/${name}`);
    }
    return (
        <div className='head'>
            <ul className='nav'>
                <Link to={isLogged ? `/logged/${name}` : `/`}><img src={logo} alt='logo' /></Link>
                <Link to={isLogged ? `/logged/${name}` : `/`}><li>Home</li></Link>
                <Link to={isLogged ? `/about/${name}` : `/about`}><li>About</li></Link>
                <Link to={isLogged ? `/contact/${name}` : `/contact`}><li>Contact</li></Link>
            </ul>
            <div className='search'>
                <input type='search' placeholder='Search Products' onChange={(e) => setSearchVal(e.target.value)} />
                <img src={search} alt='search' onClick={handleSearch} />
            </div>
            <div className='box'>
                <Link to={isLogged ? `/cart/${name}` : `/cart`}>
                    <div className='cart'>
                        <img src={cart} alt='cart' />
                        {count >= 1 && isLogged ? <p>{count}</p> : ''}
                    </div>
                </Link>
                {isLogged ? <div className='dropdown'><Dropdown label={name.toUpperCase()} inline>
                    <Dropdown.Item onClick={() => navigate(`/profile/${name}`)}>Profile</Dropdown.Item>
                    <Dropdown.Item onClick={handleOrder}>Orders</Dropdown.Item>
                </Dropdown></div> : ''}
                <Link to={isLogged ? '/' : '/login'}><button onClick={() => { handleDelete(); dispatch(logout()) }}>{isLogged ? 'Logout' : 'Login'}</button></Link>
            </div>
        </div>
    )
}
export default Header