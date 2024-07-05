import Footer from './Footer'
import Header from './Header'
import './style.css'

// eslint-disable-next-line react/prop-types
const MainLayout = ({ children, isLogged, setIsLogged, name, list, setList, searchVal, setSearchVal }) => {
  return (
    <div className='main'>
      <Header isLogged={isLogged} setIsLogged={setIsLogged} name={name} searchVal={searchVal} setSearchVal={setSearchVal} list={list} setList={setList} />
      {children}
      <Footer />
    </div>
  )
}
export default MainLayout