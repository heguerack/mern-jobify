import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function BarChartComponent({ monthlyApplications }) {
  return (
    <ResponsiveContainer width='100%' height={400}>
      <BarChart data={monthlyApplications} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3 ' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey='count' fill='#2cb1bc' barSize={50} />
      </BarChart>
    </ResponsiveContainer>
  )
}
