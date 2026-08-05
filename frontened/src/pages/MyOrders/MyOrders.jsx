import { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../components/context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrders = () => {

    const { url, token } = useContext(StoreContext)
    const [data, setdata] = useState([])

    const fetchOrders = async () => {
        try {
            const response = await axios.post(
                url + "/api/order/userorders",
                {},
                { headers: { token } }
            )

            if (response.data.success) {
                setdata(response.data.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const trackOrder = (order) => {
        alert(`Order Status: ${order.status}`)
    }

    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    }, [token])

    return (
        <div className='mt-16 px-3 sm:px-5 md:px-8 lg:px-10 w-full flex flex-col'>

            <h2 className='text-xl sm:text-2xl font-semibold mb-5'>My Orders</h2>

            <div className='flex flex-col gap-4'>

                {data.map((order) => (
                    <div
                        key={order._id}
                        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 items-center border border-zinc-400 p-3 md:p-4 rounded-lg gap-3 bg-white text-sm md:text-base'
                    >

                        <img src={assets.parcel_icon} alt="parcel" className='w-10 md:w-12' />

                        <p className='col-span-2 md:col-span-2'>
                            {order.items?.map((item, index) => (
                                <span key={index}>
                                    {item.name} x {item.quantity}
                                    {index !== order.items.length - 1 && ", "}
                                </span>
                            ))}
                        </p>

                        <p className='font-medium'>${order.amount}.00</p>

                        <p>Items: {order.items?.length}</p>

                        <p>
                            <span
                                className={`mr-1 ${
                                    order.status === "Food Processing"
                                        ? "text-yellow-500"
                                        : order.status === "Out for delivery"
                                        ? "text-blue-500"
                                        : order.status === "Delivered"
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                &#x25cf;
                            </span>
                            <b>{order.status}</b>
                        </p>

                        <button
                            className='bg-red-200 px-3 py-1 rounded-xl hover:bg-red-300 transition w-full md:w-auto'
                            onClick={() => trackOrder(order)}
                        >
                            Track Order
                        </button>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default MyOrders