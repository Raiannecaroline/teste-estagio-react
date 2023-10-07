import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/home";
import SearchLeters from "../pages/SearchLetters";
import SearchFoodLettersComponent from "../components/SearchFoodLetters";
import RecipesIngredientsComponent from "../components/RecipesIngredients";
import Ingredients from "../components/Ingredients";
import IngredientsDetails from "../components/IngredientsDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/search-letters",
    element: <SearchLeters/>,
  },
  {
    path: "/search-food-letters",
    element: <SearchFoodLettersComponent/>
  },
  {
    path: "/search-recipes-by-ingredients",
    element: <RecipesIngredientsComponent/>
  },
  {
    path: "/search-recipes-by-ingredients/:ingredientName",
    element: <Ingredients/>
  },
  {
    path: "/details-food/:detailsId",
    element: <IngredientsDetails/>
  },
]);

export default router;