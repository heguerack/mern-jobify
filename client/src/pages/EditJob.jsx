import { useLoaderData } from 'react-router-dom'
import { Form, useNavigation, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormRowSelect from '../components/FormRowSelect'
import FormRowComponent from '../components/FormRowComponent'
import { JOB_STATUS, JOB_TYPE } from '../utils/constants'
import customFetch from '../utils/custumFetch'

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`)
    return data
  } catch (error) {
    toast.error(error.response.data.msg)
    return redirect('/dashboard/all-jobs')
  }
}

export const action = async ({ request, params }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.patch(`/jobs/${params.id}`, data)
    toast.success('Job edited successfully')
    return redirect('/dashboard/all-jobs')
  } catch (error) {
    toast.error(error.response.data.msg)
    return error
  }
}

export default function EditJob() {
  const { job } = useLoaderData()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <div>
      {' '}
      <Form method='post' className='form'>
        <h4 className='form-title'>edit job</h4>
        <div className='form-center'>
          <FormRowComponent
            type='text'
            name='position'
            defaultValue={job.position}
          />
          <FormRowComponent
            type='text'
            name='company'
            defaultValue={job.company}
          />
          <FormRowComponent
            type='text'
            labelText='job location'
            name='jobLocation'
            defaultValue={job.jobLocation}
          />

          <FormRowSelect
            name='jobStatus'
            labelText='job status'
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name='jobType'
            labelText='job type'
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <button
            type='submit'
            className='btn btn-block form-btn '
            disabled={isSubmitting}>
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </div>
  )
}
