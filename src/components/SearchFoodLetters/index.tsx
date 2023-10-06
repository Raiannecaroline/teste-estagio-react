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
      <div className="container-buttons">
        {arrayOfLetters.map((letter) => (
          <button
            key={letter}
            onClick={handleOnClickButton(letter)}
            className={letter === selectedLetter ? "selected" : ""}
          >
            {letter}
          </button>
        ))}
      </div>
      {data.length > 0 && (
        <div className="meal-list">
          <h2>Refeições que começam com a letra '{selectedLetter}'</h2>
          <ul>
            {data.map((meal) => (
              <li key={meal.idMeal}>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <h2>{meal.strMeal}</h2>
                <p>{meal.strInstructions}</p>
                <button><a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">Ver Detalhes</a></button>
                
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default SearchFoodLettersComponent;

