// it's problematic if we pass share as a slug, because we have a /share route
import Image from 'next/image'
import classes from './page.module.css'
import { getMeal } from '@/lib/meal'
import { notFound } from 'next/navigation'

// this how you can generate dynamic metadata, the func must be named exactly as below
export async function generateMetadata({ params }) {
  const meal = getMeal(params.slug)

  if (!meal) {
    notFound()
  }
  
  return {
    title: meal.title,
    description: meal.description,
  }
}

//! notFound func provided by next js to navigate to the closest not-found.js
export default function MealDetailPage({ params }) {
  const meal = getMeal(params.slug)

  if (!meal) {
    notFound()
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />')
  // because line breaks are ignored by the obj, we add br elem to apply them
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            fill
            // src={meal.image}
            src={`https://ninja-posts-nextjs-images.s3.amazonaws.com/${meal.image}`}
            alt={meal.title}
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.text}>
            by{' '}
            <a
              href={`mailto:${meal.creator_email}`}
              className={classes.creator}
            >
              {meal.creator}
            </a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main className={classes.main}>
        {/* expose HTML to the client... */}
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  )
}
// params prop (obj) is set manually by next.js, I don't need to pass it to the compo call
// we are extracting params.slug to get the id because we named the folder slug
