import './globals.css'
import MainHeader from '@/components/main-header/main-header'

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  )
}
// every next project needs at least one layout.js file. We can also nest layouts in every folder
// every layout only applies to the pages that are his siblings.
// the icon or favicon in the first folder is needed, they are special, it will be automatically used as fav icon
