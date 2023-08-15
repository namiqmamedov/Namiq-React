import { Fragment } from 'react'
import Header from './Header/Header'
import Routers from '../../routes/Routers'
import { ScrollRestoration } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'

const Layout = () => {
  return (
    <Fragment>
        <ScrollRestoration/>
        <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
        <Header/>
        <Fragment>
          <Routers/>
        </Fragment>
    </Fragment>
  )
}

export default Layout