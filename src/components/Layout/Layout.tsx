import { Fragment } from 'react'
import Header from './Header/Header'
import Routers from '../../routes/Routers'

const Layout = () => {
  return (
    <Fragment>
        <Header/>
        <Fragment>
          <Routers/>
        </Fragment>
    </Fragment>
  )
}

export default Layout