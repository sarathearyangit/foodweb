import { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import { assets } from '../../assets/assets'

const Fooditem = ({_id,name,price,description,image}) => {

    const {cartItems,addtoCart,removefromcart,url} = useContext(StoreContext)

  return (
    <div className='bg-zinc-100 rounded-xl overflow-hidden'>
        <div className='relative'>
            <img src={url+'/images/'+image} alt="" className='rounded-t-xl w-full h-40 sm:h-44 md:h-48 object-cover'/>

            {
                !cartItems[_id] ? (
                <span className='absolute bottom-3 right-3 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center
                         bg-white rounded-full shadow-md cursor-pointer text-lg sm:text-xl font-bold z-10' 
                onClick={() => addtoCart(_id)}>+</span>
                ) : (
                <div className='absolute bottom-3 right-3 flex items-center gap-2 px-2 py-1 rounded-full bg-white shadow-md z-10'>
                    <span className='text-lg sm:text-xl font-bold cursor-pointer text-red-500 select-none'
                        onClick={() => removefromcart(_id)}>−</span>

                    <p className='font-medium text-sm sm:text-base'>{cartItems[_id]}</p>

                    <span className='text-lg sm:text-xl font-bold cursor-pointer text-green-500 select-none'
                        onClick={() => addtoCart(_id)}>+</span>
                </div>
                )
            }
        </div>
        
        <div className='p-3'>            
            <div className='flex justify-between items-center mb-2 gap-2'>
                <h1 className='text-base sm:text-lg md:text-xl font-semibold text-zinc-800 truncate'>{name}</h1>

                <img src={assets.rating_starts} alt="" className='w-16 sm:w-20 h-4 sm:h-5'/>
            </div>

            <p className='text-zinc-600 text-xs sm:text-sm line-clamp-2'>{description}</p>

            <p className='text-red-500 text-lg sm:text-xl md:text-2xl font-semibold mt-1'>${price}</p>
        </div>
    </div>
  )
}

export default Fooditem