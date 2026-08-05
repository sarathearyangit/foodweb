import { useState } from 'react'
import Header from '../../components/Header/Header'
import Exploremenu from '../../components/Exploremenu/Exploremenu'
import Fooddisplay from '../../components/FoodDisplay/Fooddisplay'
import Appdown from '../../components/Appdown/Appdown'

const Home = () => {

  const [category, setcategory] = useState('All')
  return (
    <div className='px-3 sm:px-5 md:px-8 lg:px-12'>
      <Header />
      <Exploremenu 
        category={category}
        setcategory={setcategory}
      />
      <Fooddisplay 
        category={category}
      />
      <Appdown />
    </div>
  )
}

export default Home