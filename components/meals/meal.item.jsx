import Link from 'next/link'
import Image from 'next/image'

import classes from './meal-item.module.css'

export default function MealItem({ title, slug, image, summary, creator }) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image
            src={`https://ninja-posts-nextjs-images.s3.amazonaws.com/${image}`}
            alt={title}
            fill
          />
          {/* we are using fill because we can't set width and height which are required.
            we can't set width and height because we don't know the dimensions of every img
            as some of them will be loaded by the users...
            always use fill when you don't know the dimensions
            previously nextJS was able to look down the img details when the img was inside assets folder
            because those images are run on build-time,
             on the contrary it can't read img details of img coming from public
             and that is because those img are used on run-time
             //! so fill tells Next to fill the available space set by the parent
          */}
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
          {/* path injected dynamically where we can use in slug inside meals route */}
        </div>
      </div>
    </article>
  )
}
