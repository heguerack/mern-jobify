import { Outlet, useLoaderData, redirect, useNavigate } from 'react-router-dom'
import BigSidebar from '../components/BigSidebar'
import SmallSidebar from '../components/SmallSidebar'
import Navbar from '../components/Navbar'
import { StyledDashboardWrapper } from '../assets/wrappers/Dashboard'
import { useContext, createContext, useState } from 'react'
import customFetch from '../utils/custumFetch'
import { toast } from 'react-toastify'

export const loader = async () => {
  try {
    const data = await customFetch.get('/users/current-user')
    return data
  } catch (error) {
    return redirect('/')
  }
}

const DashboardContext = createContext()
export default function DashboardLayout({ isDarkThemeEnabled }) {
  const user = useLoaderData().data.user
  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(false)
  // it seems like this way we avoid running a useEffect hook
  // const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme())
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled)

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    document.body.classList.toggle('dark-theme', newDarkTheme)
    localStorage.setItem('darkTheme', newDarkTheme)
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const logoutUser = async () => {
    navigate('/')
    await customFetch.get('auth/logout')
    toast.success('user logged out sucesfully!!')
  }

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}>
      <StyledDashboardWrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </StyledDashboardWrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext)
