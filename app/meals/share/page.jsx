'use client'
// import { useActionState } from 'react'
import { useFormState } from 'react-dom'
import classes from './page.module.css'
import ImagePicker from '@/components/meals/image-picker'
import { shareMeal } from '@/lib/actions' // because we used a "use server" compo in another file now can use "use client" here
import MealsFormSubmitBtn from '@/components/meals/meals-form-submit'
// they just cannot be together in the same file
export default function ShareMealPage() {
  //! async function shareMeal(formData) {
  //   'use server'
  //   // now this directive is important to indicate that this func will only run in the server, not how we add use server to the func and not file
  //   // Must add the async
  //   // if we had a "use client" on top of the file in which use server is used, we get an error
  //   //! why does use server exists
  //   //to allow the func to be used in server components, later we will add it to action property in a form
  //   // we get the formData obj with entered values automatically that we can use to create a meal, this will be a problem
  //   // let's take it to its own file in the lib folder(actions), and use it here by simply importing it
  // }

  const [state, formAction] = useFormState(shareMeal, { message: null })
  // this hook requires 2 arguments, the action and the initial state value(before the error value)
  // then it returns two values,
  //  the state, and the formAction which corresponds to the action provided, shareMeal in this case
  // the new state value is provided by shareMeal server action
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        {/* when using action like this,
         Next behind the scenes will created a req to send to the Next server in this app, so func is triggered IN THE SERVER */}
        <form
          className={classes.form}
          action={formAction}
        >
          <div className={classes.row}>
            <p>
              <label htmlFor='name'>Your name</label>
              <input
                type='text'
                id='name'
                name='name'
                required
              />
            </p>
            <p>
              <label htmlFor='email'>Your email</label>
              <input
                type='email'
                id='email'
                name='email'
                required
              />
            </p>
          </div>
          <p>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              id='title'
              name='title'
              required
            />
          </p>
          <p>
            <label htmlFor='summary'>Short Summary</label>
            <input
              type='text'
              id='summary'
              name='summary'
              required
            />
          </p>
          <p>
            <label htmlFor='instructions'>Instructions</label>
            <textarea
              id='instructions'
              name='instructions'
              rows='10'
              required
            ></textarea>
          </p>
          <ImagePicker
            label='Your image'
            name='image'
          />
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmitBtn />
          </p>
        </form>
      </main>
    </>
  )
}
