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

  const getFoodHome = async () => {
    const foodHomeResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    const foodHomeData = await foodHomeResponse.json()

    const {meals} = foodHomeData
    if (meals) {
      setData(meals)
    }

    console.log(foodHomeData)

  }

  useEffect(() => {
    getFoodHome()
  }, [])


  console.log({data})


  return (
    <>
      <div>
        <Header/>
        <h1>Home Page</h1>
      </div>

      <div>
        {/* <Home label="Receitas Aleatórias..." onSearched={getFoodHome}/> */}
        <br/>
        {data.map((homeFood) => {
          const {idMeal, strMeal, strInstructions, strMealThumb, strYoutube} = homeFood

          return ( 
            <div key={idMeal}>
              <img src={strMealThumb} alt={strMeal}/>
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