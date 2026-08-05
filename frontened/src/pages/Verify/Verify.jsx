import { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../../components/context/StoreContext'

const Verify = () => {

  const [searchParams] = useSearchParams()
  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')

  const navigate = useNavigate()
  const { url } = useContext(StoreContext)

  const [status, setStatus] = useState("verifying")

  const verifyPay = async () => {

    console.log("SUCCESS:", success)
    console.log("ORDER ID:", orderId)

    if(!success || !orderId){
      console.log("Invalid verification data")
      navigate("/")
      return
    }

    const response = await axios.post(url + '/api/order/verify', { success, orderId })

    if (response.data.success) {
      setStatus("success")

      setTimeout(() => {
        navigate('/myorders')
      }, 6000)

    } else {
      setStatus("failed")

      setTimeout(() => {
        navigate('/')
      }, 6000)
    }
  }

  useEffect(() => {
    if(success && orderId ){
      verifyPay()
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-[60vh] sm:min-h-[70vh] px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 md:p-10 text-center w-full max-w-md">

        {status === "verifying" && <h1 className="text-lg sm:text-xl">Verifying Payment...</h1>}

        {status === "success" && (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold text-green-600 mb-4">
              Payment Successful ✅
            </h1>
            <p className="text-sm sm:text-base">Redirecting to your orders...</p>
          </>
        )}

        {status === "failed" && (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">
              Payment Failed ❌
            </h1>
            <p className="text-sm sm:text-base">Redirecting to home...</p>
          </>
        )}

      </div>
    </div>
  )
}

export default Verify