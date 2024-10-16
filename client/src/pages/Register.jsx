import StyledRegisterLoginWrapper from '../assets/wrappers/RegisterAndLoginPage'
import Logo from '../components/Logo'
import FormRowComponent from '../components/FormRowComponent'
import { Form, redirect, useNavigation, Link } from 'react-router-dom'
import customFetch from '../utils/custumFetch'
import { toast } from 'react-toastify'
import SubmitBtn from '../components/SubmitBtn'

// export const action = async (data) => {

export const action = async ({ request }) => {
  // we destructure from data response
  const formData = await request.formData() // but tis funny cuz if i consle.log( request),i cant see the formData there, yet this work fantastic!
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('/auth/register', data)
    toast.success('Loginsuccessful')
    return redirect('/login')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

export default function Register() {
  return (
    <StyledRegisterLoginWrapper>
      <h1>hello</h1>
      {/* <form className='form'> */}
      {/* this is to be able to use the action set in App, in the routers */}
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>

        <FormRowComponent
          type='text'
          name='name'
          labelText='first name'
          defaultValue={''}
        />
        <FormRowComponent
          placeholder=''
          type='text'
          name='lastName'
          labelText='last name'
          defaultValue={'lastname'}
        />
        <FormRowComponent
          type='text'
          name='location'
          defaultValue={'Calgary'}
        />
        <FormRowComponent
          type='email'
          name='email'
          defaultValue={'@gmail.com'}
        />
        <FormRowComponent
          type='password'
          name='password'
          defaultValue={'123456'}
        />

        <SubmitBtn />
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </StyledRegisterLoginWrapper>
  )
}
