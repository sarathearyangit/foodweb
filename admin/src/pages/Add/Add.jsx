import { useState } from 'react'
import { assets } from '../../assests/assets'
import axios from 'axios'

const Add = ({url}) => {

    const [image, setimage] = useState(false)
    const [data, setdata] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Salad'
    })

    const onChangehandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setdata(prev => ({...prev,[name]:value}))
    }

    const onSubmithandler = async (event) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append('name',data.name)
        formData.append('description',data.description)
        formData.append('price',Number(data.price))
        formData.append('category',data.category)
        formData.append('image',image)

        const response = await axios.post(`${url}/api/food/add`,formData)

        if(response.data.success){
           setdata({
            name: '',
            description: '',
            price: '',
            category: 'Salad'
           })
           setimage(false)
        }
    }

    return (

    <div className='ml-20 md:ml-56 px-6 w-full'>

        <form className='flex flex-col gap-5 max-w-2xl bg-white p-6' onSubmit={onSubmithandler}>

            {/* Upload Image */}
            <div>
                <p className='font-medium mb-2'>Upload Image</p>

                <label htmlFor="image">
                    <img
                    src={image ? URL.createObjectURL(image) : assets.upload_area}
                    alt=""
                    className='w-40 border border-orange-500 rounded-lg p-2 cursor-pointer'
                    />
                </label>

                <input
                onChange={(e) => setimage(e.target.files[0])}
                type="file"
                id="image"
                hidden
                required
                />
            </div>


            {/* Product Name */}
            <div>
                <p className='font-medium mb-1'>Product Name</p>

                <input
                type="text"
                name="name"
                placeholder='Type here'
                className='w-full border border-orange-500 rounded-lg p-2 outline-none'
                onChange={onChangehandler}
                value={data.name}
                required
                />
            </div>


            {/* Description */}
            <div>
                <p className='font-medium mb-1'>Product Description</p>

                <textarea
                name="description"
                rows="5"
                placeholder='Write content here'
                required
                className='w-full border border-orange-500 rounded-lg p-2 outline-none'
                onChange={onChangehandler}
                value={data.description}
                ></textarea>
            </div>


            {/* Category + Price */}
            <div className='flex flex-col md:flex-row gap-4'>

                <div className='flex-1 border border-orange-500 rounded-lg p-3'>
                    <p className='mb-1'>Product Category</p>

                    <select
                    name="category"
                    onChange={onChangehandler}
                    className='w-full outline-none'
                    >

                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>

                    </select>
                </div>


                <div className='flex-1 border border-orange-500 rounded-lg p-3'>
                    <p className='mb-1'>Product Price</p>

                    <input
                    onChange={onChangehandler}
                    type="number"
                    name='price'
                    placeholder='$20'
                    className='w-full outline-none'
                    required
                    />
                </div>

            </div>


            {/* Button */}
            <button
            type='submit'
            className='bg-orange-400 hover:bg-orange-600 transition text-white py-2 rounded-lg w-40'
            >
            ADD
            </button>

        </form>

    </div>
  )
}

export default Add