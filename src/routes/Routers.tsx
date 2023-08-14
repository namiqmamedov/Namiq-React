import {Routes,Route,Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import BlogDetail from '../pages/BlogDetail'
import { Tabs } from '@mui/material'


import Messenger from '../admin/content/applications/Messenger'
import Transactions from '../admin/content/applications/Transactions'
import Overview from '../admin/content/overview'
import Accordions from '../admin/content/pages/Components/Accordions'
import Avatars from '../admin/content/pages/Components/Avatars'
import Badges from '../admin/content/pages/Components/Badges'
import Buttons from '../admin/content/pages/Components/Buttons'
import Cards from '../admin/content/pages/Components/Cards'
import Forms from '../admin/content/pages/Components/Forms'
import Modals from '../admin/content/pages/Components/Modals'
import Tooltips from '../admin/content/pages/Components/Tooltips'
import StatusMaintenance from '../admin/content/pages/Status/Maintenance'
import BaseLayout from '../admin/layouts/BaseLayout'
import SidebarLayout from '../admin/layouts/SidebarLayout'
import Crypto from '../admin/content/dashboards/Crypto'
import UserProfile from '../admin/content/applications/Users/profile'
import UserSettings from '../admin/content/applications/Users/settings'


const Routers = () => {
  return (
    <Routes>


        {/* ADMIN ROUTES */}

        <Route path="/" element={<BaseLayout />}>
      <Route index element={<Overview />} />
      <Route path="overview" element={<Navigate to="/" replace />} />
      <Route path="status">
        <Route path="maintenance" element={<StatusMaintenance />} />
      </Route>
    </Route>
    <Route path="dashboards" element={<SidebarLayout />}>
      <Route index element={<Navigate to="crypto" replace />} />
      <Route path="crypto" element={<Crypto />} />
      <Route path="messenger" element={<Messenger />} />
    </Route>
    <Route path="management" element={<SidebarLayout />}>
      <Route index element={<Navigate to="transactions" replace />} />
      <Route path="transactions" element={<Transactions />} />
      <Route path="profile">
        <Route index element={<Navigate to="details" replace />} />
        <Route path="details" element={<UserProfile />} />
        <Route path="settings" element={<UserSettings />} />
      </Route>
    </Route>
    <Route path="/components" element={<SidebarLayout />}>
      <Route index element={<Navigate to="buttons" replace />} />
      <Route path="buttons" element={<Buttons />} />
      <Route path="modals" element={<Modals />} />
      <Route path="accordions" element={<Accordions />} />
      <Route path="tabs" element={<Tabs />} />
      <Route path="badges" element={<Badges />} />
      <Route path="tooltips" element={<Tooltips />} />
      <Route path="avatars" element={<Avatars />} />
      <Route path="cards" element={<Cards />} />
      <Route path="forms" element={<Forms />} />
    </Route>
    </Routes>
  )
}

export default Routers