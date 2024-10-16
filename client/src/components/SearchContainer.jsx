import FormRowComponent from './FormRowComponent'
import FormRowSelect from './FormRowSelect'
import SubmitBtn from './SubmitBtn'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { Form, useSubmit, Link } from 'react-router-dom'
import { useAllJobsContext } from '../pages/AllJobs'
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../utils/constants'

export default function SearchContainer() {
  const { data, searchValues } = useAllJobsContext()
  const { search, jobStatus, jobType, sort } = searchValues

  const { totalJobs, numOfPages, currentPage, jobs } = data
  // console.log(jobs)
  console.log(searchValues)

  const submit = useSubmit()
  const debounce = (onChange) => {
    let timeout
    return (e) => {
      const form = e.currentTarget.form
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        onChange(form)
      }, 2000)
    }
  }
  return (
    <Wrapper>
      <Form className='form'>
        <h5 className='form-title'>search form</h5>
        <div className='form-center'>
          {/* search position */}

          <FormRowComponent
            type='search'
            name='search'
            // defaultValue='a'
            defaultValue={search}
            // onChange={(e) => submit(e.currentTarget.form)}
            onChange={debounce((form) => {
              submit(form)
            })}
          />
          <FormRowSelect
            labelText='job status'
            name='jobStatus'
            list={['all', ...Object.values(JOB_STATUS)]}
            // defaultValue='all'
            defaultValue={jobStatus}
            // onChange={(e) => submit(e.currentTarget.form)}
            onChange={debounce((form) => {
              submit(form)
            })}
          />
          <FormRowSelect
            labelText='job type'
            name='jobType'
            list={['all', ...Object.values(JOB_TYPE)]}
            // defaultValue='all'
            defaultValue={jobType}
            // onChange={(e) => submit(e.currentTarget.form)}

            onChange={debounce((form) => {
              submit(form)
            })}
          />
          <FormRowSelect
            name='sort'
            // defaultValue='newest'
            defaultValue={sort}
            // onChange={(e) => submit(e.currentTarget.form)}

            list={[...Object.values(JOB_SORT_BY)]}
            onChange={debounce((form) => {
              submit(form)
            })}
          />

          <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
            Reset Search Values
          </Link>
          {/* TEMP!!!! */}
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}
