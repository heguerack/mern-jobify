import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa'
import { useLoaderData, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import StyledAdminWrapper from '../assets/wrappers/StatsContainer'
import customFetch from '../utils/custumFetch'
import StatItem from '../components/StatItem'

export const loader = async () => {
  try {
    const response = await customFetch.get('/users/admin/app-stats')
    console.log(response.data)

    return response.data
  } catch (error) {
    toast.error('You are not authorized to view this page')
    return redirect('/dashboard')
  }
}

export default function Admin() {
  const count = useLoaderData()

  return (
    <StyledAdminWrapper>
      <StatItem
        title='current users'
        count={count.allUsers}
        color='#e9b949'
        bcg='#fcefc7'
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title='total jobs'
        count={count.allJobs}
        color='#647acb'
        bcg='#e0e8f9'
        icon={<FaCalendarCheck />}
      />
    </StyledAdminWrapper>
  )
}
