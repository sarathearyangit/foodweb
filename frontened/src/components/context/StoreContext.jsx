import { createContext, useEffect, useState } from "react"
import axios from "axios"
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

  const url = "https://foodweb-backened.onrender.com"

  const [cartItems, setcartItems] = useState({})
  const [token, settoken] = useState('')
  const [food_list, setfood_list] = useState([])

  const addtoCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setcartItems((prev) => ({ ...prev, [itemId]: 1 }))
    } else {
      setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }

    if (token) {
      await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } })
    }
  }

  const removefromcart = async (itemId) => {
    setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if (token) {
      await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } })
    }
  }

  const getTotal = () => {
    let totalAmount = 0

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item)
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item]
        }
      }
    }
    return totalAmount
  }

  const getTotalCartItems = () => {
    let totalItems = 0

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item]
      }
    } return totalItems
  }

  const fetchFoodlist = async () => {
    const response = await axios.get(url + "/api/food/list")
    setfood_list(response.data.data)
  }

  const loadCartdata = async (token) => {
    const response = await axios.post(url + '/api/cart/get', {}, { headers: { token } })
    setcartItems(response.data.cartData)
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodlist()
      if (localStorage.getItem('token')) {
        settoken(localStorage.getItem('token'))
        await loadCartdata(localStorage.getItem('token'))
      }
    }
    loadData()
  }, [])

  const contextValue = {
    food_list,
    cartItems,
    setcartItems,
    addtoCart,
    removefromcart,
    getTotal,
    getTotalCartItems,
    url,
    token,
    settoken
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
