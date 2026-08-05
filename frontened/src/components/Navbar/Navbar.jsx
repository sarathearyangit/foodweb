import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'

const Navbar = ({setshowlogin}) => {

  const [menu, setMenu] = useState('home')
  const {getTotalCartItems,token,settoken} = useContext(StoreContext)

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    settoken('')
    navigate('/')
  }

  return (
    <div className='flex justify-between items-center pt-2 px-3 sm:px-5'>

      {/* Logo */}
      <Link to='/'><img src={assets.logo} alt="logo" className='w-24 sm:w-28 md:w-30 cursor-pointer' /></Link>

      {/* Menu */}
      <ul className='hidden md:flex gap-6 text-base md:text-lg text-zinc-800'>
        <li onClick={() => setMenu('home')} className={`cursor-pointer ${menu === 'home' ? 'border-b-2 border-zinc-500' : '' }`}>home</li>
        <li onClick={() => setMenu('menu')} className={`cursor-pointer ${menu === 'menu' ? 'border-b-2 border-zinc-500' : '' }`}>menu</li>
        <li onClick={() => setMenu('contact')} className={`cursor-pointer ${menu === 'contact' ? 'border-b-2 border-zinc-500' : '' }`}>contact us</li>
        <li onClick={() => setMenu('mobile')} className={`cursor-pointer ${menu === 'mobile' ? 'border-b-2 border-zinc-500' : '' }`}>mobile-app</li>
      </ul>

      {/* Right Section */}
      <div className='flex items-center gap-4 sm:gap-6 md:gap-9'>
        <img src={assets.search_icon} alt="search" className='cursor-pointer w-4 sm:w-5' />

        <div className='relative cursor-pointer'>
          <Link to='/cart'><img src={assets.basket_icon} alt="basket" className='w-5 sm:w-6'/></Link>
          {
            getTotalCartItems() > 0 && (
              <span className='absolute -top-2 -right-2 sm:top-4 sm:right-3 w-4 h-4 sm:w-5 sm:h-5 bg-orange-500 rounded-full flex items-center justify-center text-[10px] sm:text-[14px] text-white'>{getTotalCartItems()}</span>
            )
          }
        </div>

        {!token ? 
        <button className='cursor-pointer rounded-full text-zinc-700 border border-orange-500 px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base bg-zinc-200 active:bg-zinc-300' onClick={() => setshowlogin(true)}>Sign In</button> : 
        <div className='relative group'>
          <img src={assets.profile_icon} alt="" className='cursor-pointer w-6 sm:w-7'/>
          <ul className='absolute right-0 hidden group-hover:flex flex-col border border-orange-600 outline-none bg-white rounded-lg p-2 w-28'>

            <li className='flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer' onClick={() => navigate('/myorders')}>
              <img src={assets.bag_icon} alt="" className='w-4'/>
              <p>Orders</p>
            </li>
            <hr className='text-orange-600 w-19 mx-auto'/>
            <li className='flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer' onClick={logout}>
              <img src={assets.logout_icon} alt="" className='w-4'/>
              <p>Logout</p>
            </li>

          </ul>
        </div>} 
        
      </div>

    </div>
  )
}

export default Navbar