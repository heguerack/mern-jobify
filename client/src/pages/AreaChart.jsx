import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

export default function AreaChartComponent({ monthlyApplications }) {
  return (
    <ResponsiveContainer width='100%' height={400}>
      <AreaChart data={monthlyApplications} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='4 4 ' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type='monotone' dataKey='count' stroke='#2cb1bc' fill='#074e53' />
      </AreaChart>
    </ResponsiveContainer>
  )
}
