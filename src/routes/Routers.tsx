import {Routes,Route,Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import BlogDetail from '../pages/BlogDetail'
import Dashboard from '../admin/components/Sidebar/Dashboard'
import Login from '../pages/Login'
import DashboardMain from '../admin/components/DashboardMain/DashboardMain'


const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to={'home'}/>} /> 
        <Route path='/home' element={<Home />} />
        <Route path='/search' element={<Home />} />
        <Route path='/blog' element={<BlogDetail/>} />

        {/* ADMIN ROUTES */}

        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/dashboardmain' element={<DashboardMain/>} />
        <Route path='/login' element={<Login/>} />

    </Routes>
  )
}

export default Routers