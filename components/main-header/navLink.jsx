'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classes from './navLink.module.css'

export default function NavLink({ href, children }) {
  const path = usePathname()
  return (
    <Link
      href={href}
      className={path.startsWith(href) ? `${classes.link} ${classes.active}` : classes.link}
    >
      {children}
    </Link>
  )
}

// we should use use client as low as possible in the tree in order to keep the benefits of SSR
