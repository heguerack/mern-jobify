import { redirect } from 'react-router-dom'

import { toast } from 'react-toastify'
import customFetch from '../utils/custumFetch'

export async function action({ params }) {
  try {
    await customFetch.delete(`/jobs/${params.id}`)
    toast.success('Job deleted successfully')
  } catch (error) {
    toast.error(error.response.data.msg)
  }
  return redirect('/dashboard/all-jobs')
}

export default function DeleteJob() {
  return <div>DeleteJob</div>
}
