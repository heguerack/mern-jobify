import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import StyledAdminWrapper from '../assets/wrappers/StatsContainer'
import StatItem from '../components/StatItem'

export default function StatsContainer({ defaultStats }) {
  const stats = [
    {
      title: 'pending applications',
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#f59e0b',
      bcg: '#fef3c7',
    },
    {
      title: 'interviews scheduled',
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'jobs declined',
      count: defaultStats?.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ]
  return (
    <StyledAdminWrapper>
      {' '}
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />
      })}
    </StyledAdminWrapper>
  )
}
