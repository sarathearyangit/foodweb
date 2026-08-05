import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div
      id='footer'
      className='text-zinc-200 bg-zinc-800 flex flex-col items-center pt-12 sm:pt-16 mt-16 sm:mt-20 px-4'
    >
      <div className='w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10'>

        {/* LEFT */}
        <div className='flex flex-col gap-4'>
          <img src={assets.logo} alt="logo" className='w-28 sm:w-32' />

          <p className='text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xs'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Aut quia dicta est? Reprehenderit quis temporibus necessitatibus.
          </p>

          <div className='flex gap-3'>
            <img
              src={assets.facebook_icon}
              alt="facebook"
              className='w-8 h-8 sm:w-9 sm:h-9 rounded-full cursor-pointer'
            />
            <img
              src={assets.twitter_icon}
              alt="twitter"
              className='w-8 h-8 sm:w-9 sm:h-9 rounded-full cursor-pointer'
            />
            <img
              src={assets.linkedin_icon}
              alt="linkedin"
              className='w-8 h-8 sm:w-9 sm:h-9 rounded-full cursor-pointer'
            />
          </div>
        </div>

        {/* CENTER */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-base sm:text-lg font-semibold'>COMPANY</h2>
          <ul className='flex flex-col gap-2 text-xs sm:text-sm text-zinc-300'>
            <li className='cursor-pointer hover:text-white'>Home</li>
            <li className='cursor-pointer hover:text-white'>About us</li>
            <li className='cursor-pointer hover:text-white'>Delivery</li>
            <li className='cursor-pointer hover:text-white'>Privacy Policy</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-base sm:text-lg font-semibold'>GET IN TOUCH</h2>
          <ul className='flex flex-col gap-2 text-xs sm:text-sm text-zinc-300'>
            <li>+91 1234567897</li>
            <li>sabd@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr className='w-full max-w-6xl border-zinc-600 my-6 sm:my-8' />

      <p className='text-xs sm:text-sm text-zinc-400 pb-6 text-center'>
        © 2024 Tomato.com — All Rights Reserved.
      </p>
    </div>
  )
}

export default Footer
