import styled from 'styled-components'

const StyledJobInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  .job-icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--text-secondary-color);
    }
  }
  .job-text {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
  }
`
export default StyledJobInfoWrapper
