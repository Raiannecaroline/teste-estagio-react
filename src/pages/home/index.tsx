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
    <div className="sm:p-8 p-4">
      <Header />
      <h1 className="text-3xl sm:text-4xl lg:text-5xl text-orange-400 font-bold mb-4 sm:mb-8 mt-4 sm:mt-8 text-center">Receitas Aleatórias...</h1>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((homeFood) => {
          const { idMeal, strMeal, strInstructions, strMealThumb, strYoutube } = homeFood;
  
          return (
            <div key={idMeal} className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer hover:bg-orange-200">
              <img src={strMealThumb} alt={strMeal} className="w-full h-48 object-cover rounded-t-lg mb-4" />
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600">{strMeal}</h2>
              <p className="text-sm sm:text-base mt-2 mb-4">{strInstructions.length > 300 ? `${strInstructions.slice(0, 300)}...` : strInstructions}</p>
              <a href={strYoutube} target="_blank" className="bg-orange-300 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded text-center cursor-pointer block">Assista no YouTube</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
