import { StyledLogoutContainerWrapper } from '../assets/wrappers/LogoutContainer'
import { FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useDashboardContext } from '../pages/DashboardLayout'
import { useState } from 'react'

export default function LogoutContainer() {
  const [showLogout, setShowLogout] = useState(false)
  const { user, logoutUser } = useDashboardContext()

  return (
    <StyledLogoutContainerWrapper>
      <button
        type='button'
        className='btn logout-btn'
        onClick={() => setShowLogout(!showLogout)}>
        {user.avatar ? (
          <img src={user.avatar} alt='avatar' className='img' />
        ) : (
          <FaUserCircle />
        )}

        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
        <button type='button' className='dropdown-btn' onClick={logoutUser}>
          logout
        </button>
      </div>
    </StyledLogoutContainerWrapper>
  )
}
