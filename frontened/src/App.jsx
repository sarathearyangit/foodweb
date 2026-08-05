import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import Login from './components/Login/Login'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {

  const [showlogin, setshowlogin] = useState(false)

  return (
    <>
      {showlogin ? <Login setshowlogin={setshowlogin} /> : <></>} 
      <div className='w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] m-auto'>
        <Navbar setshowlogin={setshowlogin}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />}/>
          <Route path='/myorders' element={<MyOrders />}/>
        </Routes>
      </div>
      <Footer />      
    </>
  )
}

export default App