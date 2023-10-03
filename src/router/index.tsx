import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/home";
import SearchLeters from "../pages/SearchLetters";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/search-letters",
    element: <SearchLeters/>,
  },
]);

export default router;