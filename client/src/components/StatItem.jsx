import StyledStatItemWrapper from '../assets/wrappers/StatItem'

export default function StatItem({ count, title, icon, color, bcg }) {
  return (
    <StyledStatItemWrapper color={color} bcg={bcg}>
      <header>
        <span className='count'>{count}</span>
        <span className='icon'>{icon}</span>
      </header>
      <h5 className='title'>{title}</h5>
    </StyledStatItemWrapper>
  )
}
