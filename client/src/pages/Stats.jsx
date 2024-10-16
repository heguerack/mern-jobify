// import { ChartsContainer, StatsContainer } from '../components'
import StatsContainer from '../components/StatsContainer'

import { useLoaderData } from 'react-router-dom'
import customFetch from '../utils/custumFetch'
import ChartsContainer from './ChartsContainer'

export const loader = async () => {
  try {
    const response = await customFetch.get('/jobs/stats')
    console.log(response.data)
    return response.data
  } catch (error) {
    return error
  }
}

export default function Stats() {
  const { defaultStats, monthlyApplications } = useLoaderData()
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer monthlyApplications={monthlyApplications} />
      )}
    </>
  )
}
