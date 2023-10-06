import { useState, useEffect } from "react";
import SearchFoodComponent from "../SearchFood";

type Ingredient = {
  strMeal: string,
  idMeal: string,
}

const RecipesIngredientsComponent: React.FC = () => {
  
  const [data, setData] = useState<Ingredient[]>([])

  const getIngredients = async (name: string) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
      const data = await response.json();
      
      if (data.ingredients && data.ingredients.length > 0) {
        setData(data.ingredients);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Erro ao buscar ingredientes:", error);
    }
  }

  useEffect(() => {
    getIngredients('');
  }, [])

  console.log({data})

  return (
    <>
      <div>
        <SearchFoodComponent label="Ingredientes" onSearch={getIngredients}/>

        <br />
        {data.map((ingredientes) => {
          const { strMeal, idMeal } = ingredientes

          return (
            <div key={idMeal}>
              <a href=""></a>
              <h3>{strMeal}</h3>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default RecipesIngredientsComponent