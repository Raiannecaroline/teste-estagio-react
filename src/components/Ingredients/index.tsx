import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header";

interface IngredientsDetails {
  idMeal: string,
  strMealThumb: string,
  strMeal: string,
}

const Ingredients: React.FC = () => {
  const { ingredientName } = useParams();
  const [ingredientDetails, setIngredientDetails] = useState<IngredientsDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIngredientDetails = async (ingredientName: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
      const data = await response.json();

      console.log({data})
      setIngredientDetails(data.meals);

    } catch (error) {
      console.error("Erro ao buscar detalhes do ingrediente:", error);
      setError("Ocorreu um erro ao buscar os detalhes do ingrediente. Por favor, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ingredientName) {
      fetchIngredientDetails(ingredientName);
    }
  }, [ingredientName]);

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        {loading && <p>Carregando detalhes do ingrediente...</p>}
        {error && <p>{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ingredientDetails.map(({ idMeal, strMeal, strMealThumb }) => (
            <div key={idMeal} className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer hover:bg-orange-200">
              <h2 className="text-lg font-semibold text-orange-600">{strMeal}</h2>
              <Link to={`../details-food/${idMeal}`}>
                <img src={strMealThumb} alt={strMeal} className="w-full h-48 object-cover rounded-lg mt-4" />         
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Ingredients;

