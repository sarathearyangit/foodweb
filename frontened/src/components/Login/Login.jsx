import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'

const Login = ({setshowlogin}) => {

    const {url,settoken} = useContext(StoreContext)

    const [currState, setcurrState] = useState('Login')
    const [data,setdata] =useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setdata(data => ({...data,[name]:value}))
    }

    const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url

        if(currState === "Login"){
            newUrl += "/api/user/login"
        }else{
            newUrl += "/api/user/register"
        }

        try{
        const response = await axios.post(newUrl,data)

        if(response.data.success){
            settoken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setshowlogin(false)
        }else{
            alert(response.data.message)
        }

        }catch(error){
            console.log(error)
            alert("Error occurred")
        }
    }


  return (
    <div className='fixed z-50 inset-0 flex justify-center items-center bg-black/50 px-4'>
        <form onSubmit={onLogin} className='w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-zinc-300 flex flex-col items-center justify-center gap-5 p-6 sm:p-8 md:p-10 rounded-2xl'>

            <div className='flex justify-between w-full'>
                <h2 className='text-xl sm:text-2xl mb-2 font-semibold'>{currState}</h2>
                <img onClick={() => setshowlogin(false)} src={assets.cross_icon} alt="" className='cursor-pointer w-5 h-5 sm:w-6 sm:h-6'/>
            </div>

            <div className='flex flex-col gap-2 w-full'>
                {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required className='bg-white rounded-xl p-2'/> }
                
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required className='bg-white rounded-xl p-2'/>
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required className='bg-white rounded-xl p-2'/>
            </div>

            <button type='Submit' className='bg-orange-500 w-full rounded-2xl p-2 text-white cursor-pointer text-sm sm:text-base'>{currState === "Sign Up" ? "Create account" : "Login " }</button>

            <div className='flex gap-2 items-start text-xs sm:text-sm'>
                <input type="checkbox" required className='cursor-pointer mt-1'/>
                <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>

            {
                currState === "Login" ? 
                <p className='text-xs sm:text-sm'>Create a new account ? <span className='text-blue-600 cursor-pointer' onClick={() => setcurrState('Sign Up')}>Click here</span></p> :
                <p className='text-xs sm:text-sm'>Already have an account ? <span className='text-blue-600 cursor-pointer' onClick={() => setcurrState('Login')}>Login here</span></p>
            }            
            
        </form>
    </div>
  )
}

export default Login