// instead of using use client here and lose the benefit of SSR, we instead extracted the code
// that needs interaction on client side, placed it in its own compo with use client and imported it here
//! TAKE AWAY:
//+ Always try to use 'use client' as low as possible in the code tree
//+ You can use Client compo inside SSR compo but the opposite is false

import Link from 'next/link'
import Image from 'next/image'
//  benefits:
// uses lazy loading for the img, the img is only loaded if it's visible on the page,
// we cancel this for img we know will need to load with 0 latency such as layout img ny adding priority attribute
// img optimization, best resolution depending on the end device and img quality (using the srcset attribute, check devtools)
// it even changes the file format depending on the browser (MIND BLOWING)
// it can uses all info provided in LogoImg obj to load the image in an ideal way

import MainHeaderBackground from './main-header-background'
import logoImg from '@/assets/logo.png'
import classes from './main-header.module.css'
import NavLink from './navLink'
export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link
          href='/'
          className={classes.logo}
        >
          <Image
            //   width={150}
            //   height={150}
            priority
            src={logoImg}
            alt='A plate with food on it'
          />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href='/meals'>Explore Meals</NavLink>
            </li>
            <li>
              <NavLink href='/community'>Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}
