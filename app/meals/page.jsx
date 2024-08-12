import { Suspense } from 'react'
import classes from './page.module.css'
import Link from 'next/link'
import MealsGrid from '@/components/meals/meal-grid'
import { getMeals } from '@/lib/meal'

// this is how to override layout metadata for specific pages
export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community.',
}

async function MealLoader() {
  const meals = await getMeals()
  return <MealsGrid meals={meals} />
}

export default function MealsPage() {
  // compo in Client React cannot be async, yet in SSR React //!IT CAN BE
  // we don't need it in this case but let's just simulate it
  return (
    <>
      <header className={classes.header}>
        <h1>Delicious meals, created</h1> <span>by you</span>
        <p>Choose your favorite recipe and cook it yourself, it is easy and fun!</p>
        <p className={classes.cta}>
          <Link href='/meals/share'>Share Your Favorite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
          <MealLoader />
        </Suspense>
      </main>
    </>
  )
}

// instead of creating a loading.js file that will display some content whenever a fetching
// process is taking place, we use React Suspense , note that this hook can be used in SSR
