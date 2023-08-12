import {Routes,Route,Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import BlogDetail from '../pages/BlogDetail'


const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to={'home'}/>} /> 
        <Route path='/home' element={<Home/>} />
        <Route path='/search' element={<Home/>} />
        <Route path='/blog' element={<BlogDetail/>} />
    </Routes>
  )
}

export default Routers