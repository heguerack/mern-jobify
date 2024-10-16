import { Link, useRouteError } from 'react-router-dom'
import StyledErrorWrapper from '../assets/wrappers/ErrorPage'
import img from '../assets/images/not-found.svg'

export default function Error() {
  const error = useRouteError()
  console.log(error)

  if (error.status === 404) {
    return (
      <StyledErrorWrapper>
        <div>
          <img src={img} alt='not found' />
          <h3>Ohh! page not found</h3>
          <p>We can't seem to find the page you're looking for</p>
          <Link to='/dashboard'>back home</Link>
        </div>
      </StyledErrorWrapper>
    )
  }

  return (
    <StyledErrorWrapper>
      <h1>Error Page !!!</h1>
      <h4>{error.error.message}</h4>
      <h4>{error.status}</h4>

      <Link to='/dashboard'>back home</Link>
    </StyledErrorWrapper>
  )
}
