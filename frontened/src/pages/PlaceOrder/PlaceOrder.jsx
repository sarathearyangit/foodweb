import { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { StoreContext } from '../../components/context/StoreContext'
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

  const { getTotal, token, food_list, cartItems, url } = useContext(StoreContext)

  const [data, setdata] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangehandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setdata(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {

    event.preventDefault()
    let orderItems = []

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          name:item.name,
          price:item.price,
          quantity:cartItems[item._id]
        })
      }
    })

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotal() + 2,
    }

    const response = await axios.post(url + '/api/order/place', orderData, { headers: { token } })
    console.log("ORDER RESPONSE:", response.data);

    if (response.data.success) {
       console.log("REDIRECT URL:", response.data.session_url);
       window.location.replace(response.data.session_url);
    } else {
       alert(response.data.message);
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    if(!token) {
      navigate('/cart')
    }
    else if(getTotal() === 0 ){
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='flex flex-col lg:flex-row items-start justify-between mt-16 gap-10 lg:gap-20 px-3 sm:px-5 md:px-8'>

      {/* left */}
      <div className='w-full flex flex-1 flex-col'>
        <p className='text-xl sm:text-2xl font-bold mb-6'>Delivery Information</p>

        <div className='mb-3 w-full flex flex-col sm:flex-row gap-3 sm:gap-4'>
          <input required onChange={onChangehandler} name='firstname' value={data.firstname} type="text" placeholder='First Name' className='border border-zinc-400 flex-1 rounded-2xl outline-orange-500 p-2' />
          <input required onChange={onChangehandler} name='lastname' value={data.lastname} type="text" placeholder='Last Name' className='border border-zinc-400 flex-1 rounded-2xl outline-orange-500 p-2' />
        </div>

        <input required onChange={onChangehandler} name='email' value={data.email} type="email" placeholder='Email add' className='mb-3 border border-zinc-400 rounded-2xl outline-orange-500 p-2' />
        <input required onChange={onChangehandler} name='street' value={data.street} type="text" placeholder='Street' className='mb-3 border border-zinc-400 rounded-2xl outline-orange-500 p-2' />

        <div className='mb-3 w-full flex flex-col sm:flex-row gap-3 sm:gap-4'>
          <input required onChange={onChangehandler} name='city' value={data.city} type="text" placeholder='City' className='border border-zinc-400 flex-1 rounded-2xl outline-orange-500 p-2' />
          <input required onChange={onChangehandler} name='state' value={data.state} type="text" placeholder='State' className='border border-zinc-400 flex-1 rounded-2xl outline-orange-500 p-2' />
        </div>

        <div className='mb-3 flex flex-col sm:flex-row gap-3 sm:gap-4'>
          <input required onChange={onChangehandler} name='zip' value={data.zip} type="text" placeholder='Zip Code' className='border border-zinc-400 flex-1 rounded-2xl outline-orange-500 p-2' />
          <input required onChange={onChangehandler} name='country' value={data.country} type="text" placeholder='Country' className='border border-zinc-400 flex-1 rounded-2xl outline-orange-500 p-2' />
        </div>

        <input required onChange={onChangehandler} name='phone' value={data.phone} type="text" placeholder='Phone' className='border border-zinc-400 rounded-2xl outline-orange-500 p-2' />
      </div>

      {/* right */}
      <div className='flex flex-1 w-full lg:w-auto'>
        <div className='flex flex-1 flex-col gap-5'>
          <h2 className='text-xl sm:text-2xl font-bold mb-6'>Cart Total</h2>
          <div>
            <div className='justify-between flex text-zinc-600'>
              <p>Subtotal</p>
              <p>${getTotal()}</p>
            </div>
            <hr className='text-gray-400 my-2' />
            <div className='justify-between flex text-zinc-600'>
              <p>Delivery fee</p>
              <p>${getTotal() === 0 ? '0' : '2'}</p>
            </div>
            <hr className='text-gray-400 my-2' />
            <div className='justify-between flex text-zinc-800 font-bold'>
              <p>Total</p>
              <p>${getTotal() === 0 ? '0' : getTotal() + 2}</p>
            </div>
          </div>
          <button className='bg-orange-600 rounded-xl py-2 px-4 text-white active:scale-95 w-full sm:w-auto' type='submit'>
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
