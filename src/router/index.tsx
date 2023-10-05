import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/home";
import SearchLeters from "../pages/SearchLetters";
import SearchFoodComponent from "../components/SearchFood";

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
]);

export default router;