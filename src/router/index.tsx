import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/home";
import SearchLeters from "../pages/SearchLetters";
import SearchFoodComponent from "../components/SearchFood";
import SearchFoodLettersComponent from "../components/SearchFoodLetters";
import RecipesIngredientsComponent from "../components/RecipesIngredients";

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
    path: "/search-food",
    element: <SearchFoodComponent/>,
  },
  {
    path: "/search-food-letters",
    element: <SearchFoodLettersComponent/>
  },
  {
    path: "/serch-recipes-ingredients",
    element: <RecipesIngredientsComponent/>
  },
]);

export default router;