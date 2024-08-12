'use client'
// error.js must be a client compo, because it needs to catch all error, not only server err
export default function Error({ error }) {
  console.log(error)
  // an error obj is provided with all necessary properties, next hide the error message
  // to prevent us from exposing sensitive data to users
  return (
    <>
      <main className='error'>
        <h1>{error.Error}</h1>
        <p>Failed to fetch meals. Please try again later.</p>
      </main>
    </>
  )
}
