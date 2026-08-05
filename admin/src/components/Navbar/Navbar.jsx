import { assets } from '../../assests/assets'

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 w-full bg-gray-500 flex justify-between items-center px-4 md:px-10 py-3 z-50 border-b border-gray-300'>
        
        <img 
          src={assets.logo} 
          alt="logo" 
          className='h-10 md:h-12 object-contain'
        />

        <img 
          src={assets.profile_image} 
          alt="profile" 
          className='h-8 w-8 md:h-10 md:w-10 rounded-full border border-gray-400'
        />

    </div>
  )
}

export default Navbar
