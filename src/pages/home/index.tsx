import { useState, useEffect } from "react";
import Header from "../../components/Header";

type ListFood = {
  idMeal: string,
  strMeal: string,
  strInstructions: string,
  strMealThumb: string,
  strYoutube: string,
}

const Home: React.FC = () => {

  const [data, setData] = useState<ListFood[]>([])

  const getTenFoods = async () => {
    const promises = [];
    for (let i = 0; i < 10; i++) {
      promises.push(fetch(`https://www.themealdb.com/api/json/v1/1/random.php`));
    }

    const responses = await Promise.all(promises);
    const foodsData = await Promise.all(responses.map((response) => response.json()));
    const meals = foodsData.map((foodData) => foodData.meals).filter((meal) => meal);

    if (meals.length > 0) {
      setData(meals.flat());
    }
  }

  useEffect(() => {
    getTenFoods()
  }, [])


  return (
    <>
      <div>
        <Header />
        <h1>Home Page</h1>
      </div>

      <div>
        <br />
        {data.map((homeFood) => {
          const { idMeal, strMeal, strInstructions, strMealThumb, strYoutube } = homeFood

          return (
            <div key={idMeal}>
              <img src={strMealThumb} alt={strMeal} />
              <div>
                <h2>{strMeal}</h2>
                <p>{strInstructions}</p>
                <a href={strYoutube} target="_blank">{strYoutube}</a>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Home;
