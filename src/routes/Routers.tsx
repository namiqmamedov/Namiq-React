import {Routes,Route,Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import BlogDetail from '../pages/BlogDetail'
import Login from '../pages/Login'
import Dashboard from '../admin/pages/Dashboard/Dashboard'
import CategoryPage from '../admin/pages/Category/Category'
import TagPage from '../admin/pages/Tag/Tag'
import CommentPage from '../admin/pages/Comment/Comment'
import Error from '../pages/Error'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Home />} />
        <Route path='/blog/:id' element={<BlogDetail/>} />

        <Route path='*' element={<Navigate to = '/not-found' />}/>
        <Route path='/not-found' element={<Error/>} />

        {/* ADMIN ROUTES */}

        <Route path='/admin/dashboard' element={<Dashboard/>} />
        <Route path='/admin/category' element={<CategoryPage/>} />
        <Route path='/admin/tag' element={<TagPage/>} />
        <Route path='/admin/comment' element={<CommentPage/>} />
        <Route path='/login' element={<Login/>} />
    </Routes>
  )
}

export default Routers