'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { saveMeal } from './meal'

// validate entered data: if user overrides the required attribute set in the html:
function validateText(text) {
  return !text || text.trim() === ''
}
export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instruction: formData.get('instructions'),
    image: formData.get('image'),
    // for this to work we must make sure that we pass the correct name to our ImagePicker Compo
    // the image should be stored in the file system, while the src should be stored in the db
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  }

  if (
    validateText(meal.title) ||
    validateText(meal.summary) ||
    validateText(meal.instruction) ||
    validateText(meal.creator) ||
    validateText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    !meal.image.size === 0
  ) {
    return {
      message: 'Invalid input',
    }
  }
  await saveMeal(meal)
//! revalidate simply means (throw the cashed pages and save new ones)
revalidatePath('/meals', 'page') // tell next JS to run the page,
//  otherwise Next will reused the cashed pages it collects at the start and serve them again and again
// the first argument is the path(route) we want to revalidate
// the second argument ( default = page) is choosing between revalidating the first page in that path or every nested page in that path
// to revalidate all pages in the app folder we could use revalidatePath('/', 'layout')
  redirect('/meals')
}
