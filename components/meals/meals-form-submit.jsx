'use client'
import { useFormStatus } from 'react-dom'

export default function MealsFormSubmitBtn() {
  const { pending } = useFormStatus()
  //! useFormStatus:
  // A hook that returns an object about the status of the form being submitted, the button must be inside the form and of time submit
  // it only works in client mode, so we must create the button somewhere else then use it inside the server mode
  // pending returns a boolean value, true if the req is processing

  return (
    <button
      type='submit'
      disabled={pending}
    >
      {pending ? 'Submitting' : 'Share Meal'}
    </button>
  )
}
