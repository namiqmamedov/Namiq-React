import { Fragment } from 'react'
import Header from './Header/Header'
import Routers from '../../routes/Routers'
import { ScrollRestoration, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import Sidebar from './Sidebar/Sidebar';

const Layout = () => {
  const location = useLocation();

  const customLayoutURLs = ['/admin'];
  const useCustomLayout = customLayoutURLs.some(url => location.pathname.startsWith(url));
  return (
    <Fragment>
      <ScrollRestoration/>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
      {useCustomLayout ? <Sidebar/>  : <Header/> }
      <Fragment>{useCustomLayout ? null : <Routers /> }</Fragment>
    </Fragment>
  )
}

export default Layout