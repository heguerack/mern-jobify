import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useAllJobsContext } from '../pages/AllJobs'

export default function PageBtnContainerComplex() {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext()

  const { search, pathname } = useLocation()
  const navigate = useNavigate()

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1)

  console.log(search) //seems like search is the whole url after the roor url. its just a coincidence that we have a parameter called search too
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  const addPageButton = (pageNumber, activeClass) => {
    return (
      <button
        className={`btn page-btn ${activeClass && 'active'}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}>
        {pageNumber}
      </button>
    )
  }

  const renderPageButtons = () => {
    const pageButtons = []
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    )
    return pageButtons
  }

  return (
    <Wrapper>
      <button
        className='btn prev-btn'
        onClick={() => {
          let prevPage = currentPage - 1
          if (prevPage < 1) prevPage = numOfPages
          handlePageChange(prevPage)
        }}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>{renderPageButtons()}</div>
      <button
        className='btn next-btn'
        onClick={() => {
          let nextPage = currentPage + 1
          if (nextPage > numOfPages) nextPage = 1
          handlePageChange(nextPage)
        }}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}
