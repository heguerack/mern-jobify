import { useOutletContext } from 'react-router-dom'
import { Form } from 'react-router-dom'
// import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import FormRowComponent from '../components/FormRowComponent'
import StyledDashboardFormpageWrapper from '../assets/wrappers/DashboardFormPage'
import customFetch from '../utils/custumFetch'
import SubmitBtn from '../components/SubmitBtn'

export const action = async ({ request }) => {
  const formData = await request.formData()
  // const data = Object.fromEntries(formData)

  // This becuase when we are patching or updating we might not change the image
  const file = formData.get('avatar')
  if (file && file.size > 500000) {
    toast.error('Image size too large')
    return null
  }

  try {
    // we sernd the whol fomr data becuase this is how we need it at the back end, then we use a pasckgage there to retreive the data
    const updatedUser = await customFetch.patch('/users/update-user', formData)
    console.log(updatedUser)
    toast.success('Profile updated successfully')
    return redirect('/dashboard')
  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.msg)
    return null
  }
}

export default function Profile() {
  const { user } = useOutletContext()
  const { name, lastName, email, location } = user

  return (
    <StyledDashboardFormpageWrapper>
      {/* becasue we are sending a file to the srver, we gotta send it as formData no  json. we aslo add encType='multipart/form-data' to the form*/}
      <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>profile</h4>

        <div className='form-center'>
          <div className='form-row'>
            <label htmlFor='image' className='form-label'>
              Select an image file (max 0.5 MB):
            </label>
            <input
              type='file'
              id='avatar'
              name='avatar'
              className='form-input'
              accept='image/*'
            />
          </div>
          <FormRowComponent type='text' name='name' defaultValue={name} />
          <FormRowComponent
            type='text'
            labelText='last name'
            name='lastName'
            defaultValue={lastName}
          />
          <FormRowComponent type='email' name='email' defaultValue={email} />
          <FormRowComponent
            type='text'
            name='location'
            defaultValue={location}
          />
          <SubmitBtn fomrBtn />
        </div>
      </Form>
    </StyledDashboardFormpageWrapper>
  )
}
