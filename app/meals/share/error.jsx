'use client'
export default function Error({ error }) {
  return (
    <>
      <main className='error'>
        <h1>Sharing meal error</h1>
        <p>Failed to share your meal. Please try again later.</p>
      </main>
    </>
  )
}
