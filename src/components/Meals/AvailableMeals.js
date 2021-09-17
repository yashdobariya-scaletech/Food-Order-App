import React, {useEffect, useState} from 'react'
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';

// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];


export default function AvailableMeals() {

  const [meals, setmeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState(null)
  
    useEffect(() => {

      const fetchMealsData = async () => {

        const response = await fetch('https://react-http-9d51f-default-rtdb.firebaseio.com/meals.json');

        if(!response.ok){
            throw new Error ('Somthing went wrong')
        }

        const responseData = await response.json();

        const loadedMealsData = [];

        for(const key in responseData){
          loadedMealsData.push({
            id:key,
            name:responseData[key].name,
            description:responseData[key].description,
            price:responseData[key].price
          });
        }

        setmeals(loadedMealsData);
        setIsLoading(false)
      };

        fetchMealsData().catch(error => {
          setIsLoading(false)
          setHttpError(error.message)   
        });
    },[])

    if(isLoading){
      return <section className={classes.mealLoading}>
          <h1>Loading...</h1>
      </section>
    }

    if(httpError){
      return <section className={classes.httpError}>
        <h1>{httpError}</h1>
      </section>
    }

    const mealList = meals.map((meal) => (
        <MealItem 
          id={meal.id} 
          key={meal.id} 
          name={meal.name} 
          description={meal.description} 
          price={meal.price}   
        />))

    return (
        <div className={classes.meals}> 
        <Card>
          <ul>{mealList}</ul>        
        </Card>
        </div>
    )
}
