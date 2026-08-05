import { menu_list } from '../../assets/assets'

const Exploremenu = ({setcategory,category}) => {
  return (
    <div className="mt-5 flex flex-col gap-5 px-3 sm:px-5">

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Explore our Menu</h1>

      <p className="max-w-xl text-sm sm:text-base text-zinc-700">
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience one delicious meal at a time.
      </p>

      {/* Scroll Container */}
      <div className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto scroll">

        {menu_list.map((item) => {
          return (
            <div
              onClick={() => setcategory(prev => prev === item.menu_name ? 'All' : item.menu_name)}
              key={item.menu_name}
              className="shrink-0 text-center"
            >

              <img
                src={item.menu_image}
                alt={item.menu_name}
                className={`w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-cover rounded-full mx-auto cursor-pointer ${category===item.menu_name ? 'border-2 border-orange-500 p-1' : ''}`}
              />

              <p className="mt-2 text-sm sm:text-base md:text-xl font-semibold cursor-pointer text-zinc-400">
                {item.menu_name}
              </p>

            </div>
          )
        })}

      </div>

      <hr className='text-zinc-300 my-4'/>
    </div>
  )
}

export default Exploremenu