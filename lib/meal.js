import { S3 } from '@aws-sdk/client-s3'
import fs from 'node:fs'
import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'

const s3 = new S3({
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})
const db = sql('meals.db') // connect to the meals database (collections)

export async function getMeals() {
  // this func doesn't have to be async , we are using it for demo purpose
  await new Promise((resolve) => setTimeout(resolve, 2000))
  //! throw new Error('An Error has occurred')
  // we simulate an error in fetching here to test error.js inside meal
  // we simulate a delay to be able to work on loading state
  return db.prepare('SELECT * FROM meals').all()
  // prepare is like calling fetch
  // the statement is requesting all columns from meals db
  // .all gets multiple line, if we wanter one line we use .get
  // .run is used to post data instead of requesting it
}

// before setting this route we need to install 2 packages,
//1) slugify creates a slug for us, something like a schema
//2) xss, protects us from cross scripts attacks, something like helmet
export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
  // if we use string literal instead of the ? we wil expose out self to script attacks
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true }) // force the entered data to become lowercase
  meal.instructions = xss(meal.instructions) //< eliminate anu potential scripts>

  // get the file name
  const extension = meal.image.name.split('.').pop() // split at . and get the final part of the string
  const fileName = `${meal.slug}.${extension}`

  const bufferedImage = await meal.image.arrayBuffer() // this will return an array buffer

  s3.putObject({
    Bucket: 'ninja-posts-nextjs-images',
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  })

  meal.image = fileName

  db.prepare(
    `
        INSERT INTO meals
         (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
           @title,
           @summary,
           @instructions,
           @creator,
           @creator_email,
           @image,
           @slug
         )
     `
  ).run(meal)
  // the VALUES order matter, it must match the INSERT INTO order
}

//! code that was previously used to save img in the file system:
//  //+ create a stream of data (pure nodejs file system), let's create a chunk
//  const stream = fs.createWriteStream(`public/images/${fileName}`)
//  const bufferedImage = await meal.image.arrayBuffer() // this will return an array buffer

//  stream.write(Buffer.from(bufferedImage), (error) => {
//    // this callback func is executed only after the Buffer.from finishes work
//    // this error will have value only of there is an an error
//    if (error) {
//      throw new Error('Writing Image Failed')
//    }
//  })
//  // this method wants a chunk as an argument...
//  // change the array buffer to a regular buffer with Buffer.from()

//  //+ override the image File with only the image path as we are not supposed to save images in DBs
//  meal.image = `/images/${fileName}` // we removed public because it is used in our fetching later

//  //+ save meal in DB:

//  db.prepare(
//    `
//    INSERT INTO meals
//      (title, summary, instructions, creator, creator_email, image, slug)
//      VALUES (
//        @title,
//        @summary,
//        @instructions,
//        @creator,
//        @creator_email,
//        @image,
//        @slug
//      )
//  `
//  ).run(meal)
