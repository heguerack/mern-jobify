import { useOutletContext } from 'react-router-dom'
import { JOB_STATUS, JOB_TYPE } from '../utils/constants'
import { Form, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import customFetch from '../utils/custumFetch'
import StyledDashboardFormpageWrapper from '../assets/wrappers/DashboardFormPage'
import FormRowComponent from '../components/FormRowComponent'
import FormRowSelect from '../components/FormRowSelect'
import { useRef } from 'react'
import SubmitBtn from '../components/SubmitBtn'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  console.log(data)
  try {
    const res = await customFetch.post('/jobs', data)
    console.log(res.data)
    toast.success('Job created succesfully!')
    return null
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

export default function AddJob() {
  const { user } = useOutletContext()
  console.log(user)

  const formRef = useRef(null)

  return (
    <StyledDashboardFormpageWrapper>
      <Form method='post' className='form' ref={formRef}>
        <h4 className='form-title'>add job</h4>
        <div className='form-center'>
          <FormRowComponent type='text' name='position' />
          <FormRowComponent type='text' name='company' />
          <FormRowComponent
            type='text'
            labelText='job location'
            name='jobLocation'
            defaultValue={user.location}
          />
          <FormRowSelect
            list={Object.values(JOB_STATUS)}
            name='jobStatus'
            defaultValue={JOB_STATUS.PENDING}
            labelText='job status'
          />

          <FormRowSelect
            list={Object.values(JOB_TYPE)}
            name='jobType'
            defaultValue={JOB_TYPE.FULL_TIME}
            labelText='job type'
          />
          {/* I removed this from here, and the createdBy will be added at the back end job controller, craete job,  req.body.createdBy = req.user.userId*/}
          {/* <input
            type='text'
            name='createdBy'
            defaultValue={user._id}
            required
            hidden
          /> */}
          <SubmitBtn formBtn formRef={formRef} />
        </div>
      </Form>
    </StyledDashboardFormpageWrapper>
  )
}
