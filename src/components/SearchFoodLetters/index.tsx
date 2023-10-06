import React, { useState, useEffect } from "react";
import Header from "../Header";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strYoutube: string;
}

const SearchFoodLettersComponent: React.FC = () => {
  const [data, setData] = useState<Meal[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string>('');

  const arrayOfLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const getMealByLetter = async (letter: string) => {
    try {
      const mealResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
      const mealData = await mealResponse.json();

      console.log(mealData);

      const { meals } = mealData;
      if (meals) {
        setData(meals);
      }
    } catch (error) {
      console.error("Erro ao buscar refeições:", error);
    }
  }

  const handleOnClickButton = (letter: string) => {
    return () => {
      setSelectedLetter(letter);
      getMealByLetter(letter);
    }
  }

  useEffect(() => {
    if (selectedLetter === '') {
      getMealByLetter('a');
    }
  }, [selectedLetter]);

  return (
    <>
      <Header />
      <div className="container-buttons flex flex-wrap justify-center space-x-2 py-4">
        {arrayOfLetters.map((letter) => (
          <button
            key={letter}
            onClick={handleOnClickButton(letter)}
            className={`uppercase font-semibold py-2 px-4 rounded ${
              letter === selectedLetter ? 'bg-orange-400 text-white' : 'bg-white border border-gray-300 text-gray-600 hover:bg-orange-400 hover:text-white'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>
      {data.length > 0 && (
        <div className="meal-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <h2 className="text-3xl text-center font-semibold text-orange-600 mt-4 mb-2 sm:col-span-4">
            Refeições que começam com a letra '{selectedLetter}'
          </h2>
          {data.map((meal) => (
            <div key={meal.idMeal} className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer hover:bg-orange-200">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover rounded-t-lg mb-4" />
              <h2 className="text-lg font-semibold text-orange-600">{meal.strMeal}</h2>
              <p className="text-sm mt-2 mb-4">{meal.strInstructions.length > 200 ? `${meal.strInstructions.slice(0, 300)}...` : meal.strInstructions}</p>
              <a href={meal.strYoutube} target="_blank" className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded text-center block">
                Assista no YouTube
              </a>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default SearchFoodLettersComponent;

