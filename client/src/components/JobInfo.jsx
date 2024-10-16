import StyledJobInfoWrapper from '../assets/wrappers/JobInfo'

export default function JobInfo({ icon, text }) {
  return (
    <StyledJobInfoWrapper>
      <span className='job-icon'>{icon}</span>
      <span className='job-text'>{text}</span>
    </StyledJobInfoWrapper>
  )
}
