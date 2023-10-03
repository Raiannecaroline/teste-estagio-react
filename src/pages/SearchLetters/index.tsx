import Header from "../../components/Header";
import SearchFoodComponent from "../../components/SearchFood";
import { useState, useEffect } from "react";

type ListMeal = {
  strYoutube: string, 
  strInstructions: string, 
  strMeal: string, 
  strMealThumb: string, 
  idMeal: string
}

const SearchLeters: React.FC = () => {

  const [data, setData] = useState<ListMeal[]>([])

  const getFoodApi = async (name: string) => {
    const foodResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    const foodData = await foodResponse.json()

    console.log(foodData)

    const {meals} = foodData
    if (meals) {
      setData(meals)
    }
  }

  // useEffect(() => {
  //   getFoodApi()
  // }, [])
  

  console.log({data})

  return (
    <>
      <Header/>
      <SearchFoodComponent label="Pesquisar por Nome.." onSearch={getFoodApi}/>
      <br/>
      <hr/>
      {data.map((food) => {
        const {strYoutube, strInstructions, strMeal, strMealThumb, idMeal} = food

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
    </>
  )
}

export default SearchLeters;