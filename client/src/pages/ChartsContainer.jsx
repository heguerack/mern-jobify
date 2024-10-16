import { useState } from 'react'
// import BarChart from './BarChart'
import Wrapper from '../assets/wrappers/ChartsContainer'
import AreaChart from './AreaChart'
import BarChart from '../components/BarChart'
// import { Wrapper } from '../assets/wrappers/StatsContainer'

export default function ChartsContainer({ monthlyApplications }) {
  const [barChart, setBarChart] = useState(true)
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? (
        <BarChart monthlyApplications={monthlyApplications} />
      ) : (
        <AreaChart monthlyApplications={monthlyApplications} />
      )}
    </Wrapper>
  )
}
