import { useNavigation } from 'react-router-dom'

export default function SubmitBtn({ formBtn, formRef }) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  // Reset form after submission
  if (!isSubmitting && formRef?.current) {
    formRef?.current?.reset()
  }

  return (
    <button
      type='submit'
      className={`btn btn-block ${formBtn && 'form-btn'}`}
      disabled={isSubmitting}>
      {isSubmitting ? 'submitting...' : 'submit'}
    </button>
  )
}
