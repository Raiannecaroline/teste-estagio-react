import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header";

interface IngredientsDetails {
  idMeal: number;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  strCategory: string;
  strArea: string;
  strTags: string;
  strSource: string;
  ingredients: string[];
  measures: string[];
}

const IngredientsDetails: React.FC = () => {
  const { detailsId } = useParams<{ detailsId: string }>();
  const [ingredientDetails, setIngredientDetails] = useState<IngredientsDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIngredientDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${detailsId}`);
        const data = await response.json();
        
        if (data.meals && data.meals.length > 0) {
          setIngredientDetails(data.meals[0]);
        } else {
          setIngredientDetails(null);
        }

      } catch (error) {
        console.error("Erro ao buscar detalhes do ingrediente:", error);
        setError("Ocorreu um erro ao buscar os detalhes do ingrediente. Por favor, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    if (detailsId) {
      fetchIngredientDetails();
    }
  }, [detailsId]);

  function getIngredientsDetails(ingredientDetails: IngredientsDetails) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = ingredientDetails[`strIngredient${i}` as keyof IngredientsDetails];
      if (ingredient && typeof ingredient === 'string' && ingredient.trim() !== '') {
        ingredients.push(ingredient);
      }
    }
    return ingredients;
  }
  
  function getMeasuresDetails(ingredientDetails: IngredientsDetails) {
    const measures = [];
    for (let i = 1; i <= 20; i++) {
      const measure = ingredientDetails[`strMeasure${i}` as keyof IngredientsDetails];
      if (measure && typeof measure === 'string' && measure.trim() !== '') {
        measures.push(measure);
      }
    }
    return measures;
  }

  return (
    <>
      <Header />
      {loading && <p className="text-center my-4">Carregando detalhes do ingrediente...</p>}
      {error && <p className="text-center my-4">{error}</p>}
      {ingredientDetails && (
        <div className="container mx-auto p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
            <h2 className="text-2xl font-bold mb-4">{ingredientDetails.strMeal}</h2>
            <img src={ingredientDetails.strMealThumb} alt={ingredientDetails.strMeal} className="w-500 max-h-100 object-cover rounded-lg mb-6" />
            <p className="text-sm mb-4">{ingredientDetails.strInstructions}</p>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Ingredientes:</h3>
              <ul className="list-disc pl-4">
                {getIngredientsDetails(ingredientDetails).map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Medidas:</h3>
              <ul className="list-disc pl-4">
                {getMeasuresDetails(ingredientDetails).map((measure, index) => (
                  <li key={index}>{measure}</li>
                ))}
              </ul>
            </div>
            {ingredientDetails.strYoutube && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Vídeo da Receita:</h3>
                <Link
                  to={`https://www.youtube.com/watch?v=${ingredientDetails.strYoutube}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg mt-2 hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                  Assistir no YouTube
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default IngredientsDetails;

