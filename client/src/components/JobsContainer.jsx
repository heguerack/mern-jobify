import StyledJobsContainerWrapper from '../assets/wrappers/JobsContainer'
import { useAllJobsContext } from '../pages/AllJobs'
import Job from './Job'
import PageBtnContainer from './PageBtnContainer'

export default function JobsContainer() {
  const { data } = useAllJobsContext()
  const { totalJobs, numOfPages, currentPage, jobs } = data

  return (
    <StyledJobsContainerWrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'}
      </h5>
      <div className='jobs'>
        {jobs ? (
          jobs.map((job) => <Job key={job._id} {...job} />)
        ) : (
          <h1>Not jobs to show at this time</h1>
        )}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </StyledJobsContainerWrapper>
  )
}
