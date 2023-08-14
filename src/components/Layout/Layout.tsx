import { Fragment } from 'react'
import Header from './Header/Header'
import Routers from '../../routes/Routers'
import { ScrollRestoration } from 'react-router-dom'

const Layout = () => {
  return (
    <Fragment>
        <ScrollRestoration/>
        <Header/>
        <Fragment>
          <Routers/>
        </Fragment>
    </Fragment>
  )
}

export default Layout