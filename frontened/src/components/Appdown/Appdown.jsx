import { assets } from '../../assets/assets'

const Appdown = () => {
  return (
    <div id='app-down' className='text-center text-2xl sm:text-3xl md:text-4xl font-semibold mt-16 sm:mt-20 md:mt-22 px-4'>
        <p>For better Experience Download <br/> Tomato App</p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mt-8'>
            <img src={assets.play_store} alt="" className='cursor-pointer w-32 sm:w-36 md:w-40 hover:scale-105 transition-transform duration-700'/>
            <img src={assets.app_store} alt="" className='cursor-pointer w-32 sm:w-36 md:w-40 hover:scale-105 transition-transform duration-700'/>
        </div>
    </div>
  )
}

export default Appdown