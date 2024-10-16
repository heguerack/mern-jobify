import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomeLayout from './pages/HomeLayout'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'
import Error from './pages/Error'
import DashboardLayout from './pages/DashboardLayout'
import AddJob from './pages/AddJob'
import EditJob from './pages/EditJob'
import Stats from './pages/Stats'
import AllJobs from './pages/AllJobs'
import Profile from './pages/Profile'
import Admin from './pages/Admin'

import { action as registerAction } from './pages/Register'
import { action as loginAction } from './pages/Login'
import { action as jobAction } from './pages/AddJob'
import { action as editJobAction } from './pages/EditJob'
import { action as deleteJobAction } from './pages/DeleteJob'
import { action as profileAction } from './pages/Profile'

import { loader as userLoader } from './pages/DashboardLayout'
import { loader as allJobsLoader } from './pages/AllJobs'
import { loader as editJobLoader } from './pages/EditJob'
import { loader as adminLoader } from './pages/Admin'
import { loader as statsLoader } from './pages/Stats'

const checkDefaultTheme = () => {
  //it seems that when we store in local storage, things get saved as strings in there. that why 'true' instead of true
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme)
  return isDarkTheme
}
const isDarkThemeEnabled = checkDefaultTheme()

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        // Now, an action can be placed here or it could be use where need it and importted from here
        // action: () => {
        //   console.log('hello there')
        //   return null // you must always return something or null
        // },
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      // Dashbaord
      {
        path: 'dashboard',
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: userLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: jobAction,
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: profileAction,
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          {
            path: 'delete-job/:id',
            element: <EditJob />,
            action: deleteJobAction,
          },
        ],
      },
    ],
  },
])

export default function App() {
  // return <div>Jobiffy App</div>
  return <RouterProvider router={router} />
}
