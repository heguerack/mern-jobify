import StyledBigsidebarWrapper from '../assets/wrappers/BigSidebar'
import { FaTimes } from 'react-icons/fa'

import { useDashboardContext } from '../pages/DashboardLayout'
import Logo from './Logo'

import NavLinks from './NavLinks'

export default function BigSidebar() {
  const { user, toggleSidebar, showSidebar } = useDashboardContext()

  return (
    <StyledBigsidebarWrapper>
      <div
        className={
          showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }>
        <div className='content'>
          <header>
            <Logo />
          </header>
          {/* we passs the sidebar pro here, to give the optiopn to keep the bigsidebar open when cliking on a link.  */}
          <NavLinks isBigSidebar />
        </div>
      </div>
    </StyledBigsidebarWrapper>
  )
}
