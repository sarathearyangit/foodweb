import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Order/Order'


const App = () => {

  const url = 'http://localhost:4000'
  
  return (
    <div>
      <Navbar />
      <hr />
      <div className='flex pt-20'>
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>} />
          <Route path='/list' element={<List url={url}/>}/>
          <Route path='/orders' element={<Order url={url}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App