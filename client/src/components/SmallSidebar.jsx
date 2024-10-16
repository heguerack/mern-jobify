import SmallSidebarWrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from 'react-icons/fa'

import { useDashboardContext } from '../pages/DashboardLayout'
import Logo from './Logo'

import NavLinks from './NavLinks'

export default function SmallSidebar() {
  // const data = useDashboardContext()
  const { user, toggleSidebar, showSidebar } = useDashboardContext()

  return (
    <SmallSidebarWrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }>
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </SmallSidebarWrapper>
  )
}
