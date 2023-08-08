import { Fragment } from 'react'
import Header from './Header/Header'
import Home from '../../pages/Home'

const Layout = () => {
  return (
    <Fragment>
        <Header/>
        <Home/>
    </Fragment>
  )
}

export default Layout