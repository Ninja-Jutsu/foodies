export default function NotFound() {
  return (
    <main className='not-found'>
      <h1>not found</h1>
      <p>Unfortunately, we could not find the requested page or resource!</p>
    </main>
  )
}
// we can either add this file to the root folder to show it whenever any route doesn't exist
// or we could add it to lower levels to show more specific errors
