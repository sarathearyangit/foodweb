import { useEffect, useState } from 'react'
import axios from 'axios'
import { assets } from '../../assests/assets'

const Order = ({ url }) => {

  const [orders, setorders] = useState([])

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list")
    if (response.data.success) {
      setorders(response.data.data)
      console.log(response.data.data)
    }
    else {
      console.log("Error")
      console.log(url)
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders()
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='ml-20 md:ml-56 mb-5 pt-2 px-6 w-full'>

      <h3 className='text-2xl font-semibold mb-6'>Orders</h3>

      <div className='flex flex-col gap-5 max-w-5xl'>

        {orders.length === 0 ? (
          <p className='text-gray-700'>No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className='flex flex-col md:flex-row w-full border border-orange-500 rounded-lg p-4 gap-4 items-start md:items-center justify-between bg-white'
            >

              <img src={assets.parcel_icon} alt="" className='w-12' />

              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-sm'>
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity}
                      {idx !== order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>

                <p className='font-medium'>
                  {order.address.firstName} {order.address.lastName}
                </p>

                <div className='text-sm text-gray-600'>
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                  </p>
                </div>

                <p className='text-sm'>Phone: {order.address.phone}</p>
              </div>

              <div className='flex flex-col gap-2'>
                <p>Items: {order.items.length}</p>

                <p className='font-medium'>${order.amount}</p>

                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className='border border-orange-500 rounded-lg px-2 py-1 outline-none'
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  )
}

export default Order