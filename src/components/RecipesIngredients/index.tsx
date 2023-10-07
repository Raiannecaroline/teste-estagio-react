import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchFoodComponent from "../SearchFood";

type Ingredient = {
  strIngredient: string,
  strMeal: string,
  strMealThumb: string,
  idIngredient: string,
};

const IngredientsComponent: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filtered, setFiltered] = useState<Ingredient[]>([])
  const navigate = useNavigate();

  const getIngredients = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
      );
      const responseData = await response.json();

      if (responseData.meals && responseData.meals.length > 0) {
        setIngredients(responseData.meals);
        setFiltered(responseData.meals);
      } else {
        setIngredients([]);
      }
    } catch (error) {
      console.error("Erro ao buscar ingredientes:", error);
      setError(
        "Ocorreu um erro ao buscar os ingredientes. Por favor, tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const getFilterIngredientsByName = (name: string) => {
    const filter = ingredients.filter((ingredient) => {
      return ingredient.strIngredient.includes(name)
    })

    setFiltered(filter);
  }


  const handleIngredientClick = (ingredientName: string) => {
    navigate(`/search-recipes-by-ingredients/${encodeURIComponent(ingredientName)}`);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <>
      <SearchFoodComponent label="Pesquise Ingredientes" onSearch={getFilterIngredientsByName}/>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Ingredientes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading && <p>Carregando ingredientes...</p>}
          {error && <p>{error}</p>}
          {!loading &&
            !error &&
            filtered.map((ingredient) => (
              <div
                key={ingredient.idIngredient}
                className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer hover:bg-orange-200"
                onClick={() => handleIngredientClick(ingredient.strIngredient)}
              >
                <h3 className="text-lg font-semibold text-orange-600 cursor-pointer">
                  {ingredient.strIngredient}
                </h3>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default IngredientsComponent;
