import { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import Fooditem from '../Fooditem/Fooditem'

const Fooddisplay = ({ category }) => {

    const { food_list } = useContext(StoreContext)

    return (
        <div id='food-display' className='mt-8 flex flex-col px-3 sm:px-4'>
            <h2 className='text-xl sm:text-2xl md:text-3xl font-semibold'>Top dishes near you</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-x-4 gap-y-5'>
                {food_list.map((item, index) => {
                    if(category === 'All' || category === item.category){
                        return (
                            <Fooditem
                                key={item._id}
                                _id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                            />
                        )
                    }
                    return null
                })}
            </div>
        </div>
    )
}

export default Fooddisplay