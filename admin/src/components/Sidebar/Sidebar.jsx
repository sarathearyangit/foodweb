import React from 'react'
import { assets } from '../../assests/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='bg-gray-500 fixed top-16 min-h-screen w-20 md:w-56 border-r border-gray-300'>

      <div className='flex flex-col gap-2 p-4'>

        <NavLink
          to='/add'
          className={({isActive}) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition
            ${isActive ? "bg-orange-400 text-white" : "hover:bg-orange-300"}`
          }
        >
          <img src={assets.add_icon} alt="" className='w-6'/>
          <p className='hidden md:block'>Add Items</p>
        </NavLink>

        <NavLink
          to='/list'
          className={({isActive}) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition
            ${isActive ? "bg-orange-400 text-white" : "hover:bg-orange-300"}`
          }
        >
          <img src={assets.order_icon} alt="" className='w-6'/>
          <p className='hidden md:block'>List Items</p>
        </NavLink>

        <NavLink
          to='/orders'
          className={({isActive}) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition
            ${isActive ? "bg-orange-500 text-white" : "hover:bg-orange-300"}`
          }
        >
          <img src={assets.order_icon} alt="" className='w-6'/>
          <p className='hidden md:block'>Orders</p>
        </NavLink>

      </div>

    </div>
  )
}

export default Sidebar