import headerImg from '../../assets/header_img.png'

const Header = () => {
  return (
    <div
      className="
        h-[50vh] sm:h-[60vh] md:h-[70vh]
        flex items-end
        px-4 sm:px-6 pb-6 sm:pb-8 text-white
        rounded-2xl sm:rounded-3xl mt-6 sm:mt-8
      "
      style={{
        backgroundImage: `url(${headerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-sm sm:max-w-md">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold w-full sm:w-90">
          Order your favourite food here
        </h2>

        <p className="mt-3 text-xs sm:text-sm w-full sm:w-70">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted to satisfy your cravings and elevate your dining experience
          one delicious meal at a time.
        </p>

        <button className="mt-4 bg-white text-orange-500 px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base">
          View menu
        </button>
      </div>
    </div>
  )
}

export default Header