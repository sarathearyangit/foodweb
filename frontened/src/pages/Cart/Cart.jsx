import { useContext } from 'react'
import { StoreContext } from '../../components/context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const { cartItems, food_list, removefromcart, getTotal, url } = useContext(StoreContext)
  const navigate = useNavigate()

  return (
    <div className='mt-20 px-3 sm:px-5'>

      <div>
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-10 pb-3 text-sm md:text-base'>
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p className='hidden sm:block'>Quantity</p>
          <p className='hidden md:block'>Total</p>
          <p className='hidden md:block'>Remove</p>
        </div>

        <hr className='text-gray-300' />

        {food_list.map((item) => {

          if (cartItems[item._id] > 0) {

            return (
              <div key={item._id}>

                <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-10 py-3 items-center text-sm md:text-base'>

                  <img
                    src={url + "/images/" + item.image}
                    alt=""
                    className='w-12 h-12 object-cover rounded-md'
                  />

                  <div className='flex flex-col'>
                    <p>{item.name}</p>

                    {/* Mobile details */}
                    <div className='flex gap-3 text-xs text-gray-500 sm:hidden'>
                      <span>
                        Qty: {cartItems[item._id]}
                      </span>

                      <span>
                        ${item.price * cartItems[item._id]}
                      </span>

                      <span
                        className='cursor-pointer text-red-500'
                        onClick={() => removefromcart(item._id)}
                      >
                        Remove
                      </span>
                    </div>

                  </div>


                  <p>${item.price}</p>

                  <p className='hidden sm:block'>
                    {cartItems[item._id]}
                  </p>


                  <p className='hidden md:block'>
                    ${item.price * cartItems[item._id]}
                  </p>


                  <p
                    className='cursor-pointer hidden md:block'
                    onClick={() => removefromcart(item._id)}
                  >
                    x
                  </p>


                </div>

                <hr className='text-gray-300' />

              </div>
            )
          }

          return null

        })}

      </div>


      {/* Cart Bottom */}

      <div className='mt-12 flex flex-col md:flex-row justify-between gap-10 md:gap-25'>


        <div className='flex flex-1 flex-col gap-5'>

          <h2 className='text-lg md:text-xl'>
            Cart Total
          </h2>


          <div>

            <div className='justify-between flex text-zinc-600'>
              <p>Subtotal</p>
              <p>${getTotal()}</p>
            </div>


            <hr className='text-gray-400 my-2' />


            <div className='justify-between flex text-zinc-600'>
              <p>Delivery fee</p>
              <p>
                ${getTotal() === 0 ? '0' : '2'}
              </p>
            </div>


            <hr className='text-gray-400 my-2' />


            <div className='justify-between flex text-zinc-800 font-bold'>
              <p>Total</p>

              <p>
                ${getTotal() === 0 ? '0' : getTotal() + 2}
              </p>

            </div>

          </div>


          <button
            className='bg-orange-600 rounded-xl p-2 text-white active:scale-95 w-full md:w-auto'
            onClick={() => {
              console.log("checkout clicked")
              navigate('/placeorder')
            }}
          >
            PROCEED TO CHECKOUT
          </button>


        </div>



        <div className='flex flex-1 flex-col'>

          <div>

            <p>
              If you have a promo code, Enter it here
            </p>


            <div className='mt-3 flex flex-col sm:flex-row gap-3 sm:gap-5'>

              <input
                type="text"
                placeholder='Enter promo code'
                className='bg-zinc-100 rounded-xl py-2 px-3 outline-none w-full'
              />


              <button
                className='bg-orange-600 rounded-xl px-4 py-2 text-white active:scale-95'
              >
                Submit
              </button>

            </div>

          </div>

        </div>


      </div>

    </div>
  )
}

export default Cart