import classes from './meals-grid.module.css'
import MealItem from './meal.item'
export default function MealsGrid({ meals }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  )
}

{
  /* Look how we used to spread operator to pass props,
  it's important to note that all obj properties will 
  be passed even those we probably wont use
*/
}
