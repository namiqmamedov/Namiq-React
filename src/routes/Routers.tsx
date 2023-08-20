import {Routes,Route,Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import BlogDetail from '../pages/BlogDetail'
import Login from '../pages/Login'
import Dashboard from '../admin/components/Dashboard/Dashboard'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to={'home'}/>} /> 
        <Route path='/home' element={<Home />} />
        <Route path='/search' element={<Home />} />
        <Route path='/blog' element={<BlogDetail/>} />

        {/* ADMIN ROUTES */}

        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/login' element={<Login/>} />
    </Routes>
  )
}

export default Routers