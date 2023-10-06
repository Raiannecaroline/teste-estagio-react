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
  //   getFoodApi('')
  // }, [])
  

  console.log({data})

  return (
    <>
      <SearchFoodComponent label="Pesquisar por Nome.." onSearch={getFoodApi} />
      <br />
      <hr />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((food) => {
          const { strYoutube, strInstructions, strMeal, strMealThumb, idMeal } = food;

          return (
            <div key={idMeal} className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer hover:bg-orange-200">
              <img src={strMealThumb} alt={strMeal} className="w-full h-48 object-cover rounded-t-lg mb-4" />
              <h2 className="text-lg font-semibold text-orange-600">{strMeal}</h2>
              <p className="text-sm mt-2 mb-4">{strInstructions.length > 200 ? `${strInstructions.slice(0, 200)}...` : strInstructions}</p>
              <a
                href={strYoutube}
                target="_blank"
                className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded text-center block"
              >
                Assista no YouTube
              </a>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default SearchLeters;