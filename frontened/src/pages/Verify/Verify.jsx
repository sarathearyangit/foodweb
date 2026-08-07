import { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../../components/context/StoreContext'

const Verify = () => {

    console.log("VERIFY COMPONENT LOADED")

    const [searchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const navigate = useNavigate()

    const { url } = useContext(StoreContext)

    const [status, setStatus] = useState("verifying")


    const verifyPay = async () => {

        try {

            console.log("SUCCESS:", success)
            console.log("ORDER ID:", orderId)
            console.log("BACKEND URL:", url)


            if (!success || !orderId) {

                console.log("Invalid verification data")

                setStatus("failed")

                setTimeout(() => {
                    navigate("/")
                }, 3000)

                return
            }


            const response = await axios.post(
                url + "/api/order/verify",
                {
                    success,
                    orderId
                }
            )


            console.log("VERIFY RESPONSE:", response.data)


            if (response.data.success) {

                setStatus("success")

                setTimeout(() => {
                    navigate("/myorders")
                }, 6000)

            } 
            else {

                setStatus("failed")

                setTimeout(() => {
                    navigate("/")
                }, 6000)

            }


        } catch (error) {

            console.log(
                "VERIFY ERROR:",
                error.response?.data || error.message
            )

            setStatus("failed")

        }

    }



    useEffect(() => {

        verifyPay()

    }, [])



    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white rounded-lg p-8 shadow-md text-center">


                {
                    status === "verifying" && (

                        <h1 className="text-xl font-bold">
                            Verifying Payment...
                        </h1>

                    )
                }



                {
                    status === "success" && (

                        <>
                            <h1 className="text-3xl font-bold text-green-600 mb-4">
                                Payment Successful ✅
                            </h1>

                            <p>
                                Redirecting to your orders...
                            </p>

                        </>

                    )
                }




                {
                    status === "failed" && (

                        <>
                            <h1 className="text-3xl font-bold text-red-600 mb-4">
                                Payment Failed ❌
                            </h1>

                            <p>
                                Redirecting to home...
                            </p>

                        </>

                    )
                }


            </div>

        </div>

    )

}


export default Verify
