import { StyledThemetoggleWrapper } from '../assets/wrappers/ThemeToggle'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import { useDashboardContext } from '../pages/DashboardLayout'

export default function ThemeToggle() {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext()
  return (
    <StyledThemetoggleWrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillSunFill className='toggle-icon' />
      ) : (
        <BsFillMoonFill className='toggle-icon' />
      )}
    </StyledThemetoggleWrapper>
  )
}
