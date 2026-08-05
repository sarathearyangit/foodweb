import { useEffect, useState } from 'react'
import axios from 'axios'

const List = ({url}) => {

  const [list, setlist] = useState([])

  const fetchlist = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    console.log(response.data)
    if(response.data.success){
      setlist(response.data.data)
    }else{
      console.log('error')
    }
  }

  const removefood = async(foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchlist()
  }

  useEffect(() => {
    fetchlist()
  },[])

  return (
    <div className='ml-20 md:ml-56 pt-5 px-4 md:px-6 w-full h-[calc(100vh-64px)] overflow-y-auto scrollbar-hide'>
        <p className='text-2xl font-semibold mb-4'>All Foods List</p>
        <div className='w-full max-w-6xl border-2 border-orange-500 rounded-lg overflow-hidden'>

          {/* header */}
          <div className='grid grid-cols-5 bg-gray-200 py-4 text-center font-semibold'>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>

          {/* data rows */}
          {list.map((item,index) => {
            return (
              <div key={index} className='grid grid-cols-5 text-center p-2 border-t border-orange-500'>
                <div className='flex justify-center'>
                  <img src={`${url}/images/`+item.image} alt="" className='w-10 h-10 rounded-2xl'/>
                </div>
                <p className='flex items-center justify-center'>{item.name}</p>
                <p className='flex items-center justify-center'>{item.category}</p>
                <p className='flex items-center justify-center'>{item.price}</p>
                <button className="flex justify-center items-center text-red-500 font-bold hover:scale-110 transition w-full cursor-pointer" onClick={() => removefood(item._id)}>X</button>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default List