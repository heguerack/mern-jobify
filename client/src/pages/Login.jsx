import StyledRegisterLoginWrapper from '../assets/wrappers/RegisterAndLoginPage'
import FormRowComponent from '../components/FormRowComponent'
import Logo from '../components/Logo'
import { Form, redirect, Link } from 'react-router-dom'
import customFetch from '../utils/custumFetch'
import { toast } from 'react-toastify'
import SubmitBtn from '../components/SubmitBtn'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    const res = await customFetch.post('/auth/login', data)
    toast.success('Login successful')
    return redirect('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

export default function Login() {
  return (
    <StyledRegisterLoginWrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRowComponent type='email' name='email' defaultValue='@gmail.com' />
        <FormRowComponent
          type='password'
          name='password'
          defaultValue='123456'
        />
        <SubmitBtn />
        <button type='button' className='btn btn-block'>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </StyledRegisterLoginWrapper>
  )
}
