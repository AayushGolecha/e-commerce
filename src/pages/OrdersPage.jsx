import MainLayout from "../components/MainLayout"
import './style.css'
import { useParams } from "react-router-dom"
import cross from '../assets/cross.svg'
import { useState } from "react"

// eslint-disable-next-line react/prop-types
const OrdersPage = ({ isLogged, setIsLogged, searchVal, setSearchVal, list, setList }) => {
  const { name } = useParams();
  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  const [check, setCheck]=useState(false)
  const [item, setItem]=useState()
  // let total = 0
  // if (orders != null) {
  //   for (let j = 0; j < orders.length; j++) {
  //     let data = orders[j]
  //     for (let i = 0; i < data.length-1; i++) {
  //       let item = data[i]
  //       console.log(item)
  //       console.log(data.length)
  //       for (let l = 0;l < item.length; l++) {
  //         console.log(item.length)
  //         let pro = item[l]
  //         console.log(pro)
  //         let amount = pro.Quantity * pro.price
  //         total += amount
  //       }
  //     }
  //   }
  // }
  const showOrderDetails = (data) => {
    setItem(data)
    setCheck(true)
    document.getElementsByClassName("order-detail-box")[0].style.display = 'block';
  }
  const handleClose = () => {
    document.getElementsByClassName("order-detail-box")[0].style.display = 'none';
  }
  return (
    <MainLayout isLogged={isLogged} setIsLogged={setIsLogged} name={name} searchVal={searchVal} setSearchVal={setSearchVal} list={list} setList={setList} >
      <div className='orders-page'>
        <h1>Orders</h1>
        <div className="orders-box">
          <div className="order-top">
            <h3>Orders Lists</h3>
            <h3>Total No. of Orders: {orders.length}</h3>
          </div>
          <hr />
          {orders.map((data) => (
            <div key={data[1]} className="order" onClick={() => showOrderDetails(data[0])}>
              <div>Order Id: {data[1]}</div>
              <hr />
              <div>Total Paid: {data[2]}</div>
            </div>
          ))}
        </div>
        {check ?<div className="order-detail-box">
          <div className="order-top">
            <h2>Order-Details</h2>
            <h2>Total Items: {item.length}</h2>
            <img src={cross} alt="cross" onClick={handleClose} />
          </div>
          {item.map((item) => (
            <div key={item.id} className='orderbox'>
              <img src={item.imageUrl} alt="Product" />
              <div className='orderbox-1'>
                <span>{item.name}</span>
                <span>₹{item.price}</span>
                <span>Quantity: {item.Quantity}</span>
              </div>
            </div>
          ))}
        </div>:""}
      </div>
    </MainLayout>
  )
}
export default OrdersPage