import MainLayout from "../components/MainLayout"
import { Product } from "../components/Product"
import './style.css'
import { useParams } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const ProductPage = ({ isLogged, setIsLogged, setId, setAdd, searchVal, setSearchVal, list, setList }) => {
  const { name } = useParams()
  return (
    <MainLayout isLogged={isLogged} setIsLogged={setIsLogged} name={name} searchVal={searchVal} setSearchVal={setSearchVal} list={list} setList={setList} >
      <div className='product-section'>
        <Product isLogged={isLogged} setId={setId} setAdd={setAdd} name={name} list={list} setList={setList} />
      </div>
    </MainLayout>
  )
}
export default ProductPage