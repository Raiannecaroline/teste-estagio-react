import {Link} from 'react-router-dom'

const Header: React.FC = () => {
  return (
   <>
    <header className="bg-transparent p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img src="/src/images/theMealDB.png" alt="TheMealDb Logo" className="w-50 h-40" />
        </Link>
        <ul className="flex flex-wrap justify-center items-center space-x-4">
          <li className="mb-2 sm:mb-0 sm:mr-4">
            <Link
              to="/search-food-letters"
              className="text-orange-400 hover:text-orange-300 transition duration-300 font-semibold text-lg"
            >
              Pesquisar por Letras
            </Link>
          </li>
          <li className="mb-2 sm:mb-0 sm:mr-4">
            <Link
              to="/search-letters"
              className="text-orange-400 hover:text-orange-300 transition duration-300 font-semibold text-lg"
            >
              Pesquisar por Receitas
            </Link>
          </li>
          <li className="mb-2 sm:mb-0">
            <Link
              to="/search-recipes-by-ingredients"
              className="text-orange-400 hover:text-orange-300 transition duration-300 font-semibold text-lg"
            >
              Receitas por Ingredientes
            </Link>
          </li>
        </ul>
      </nav>
      <hr className="mt-4 border-t border-orange-300" />
    </header>
   </>
  )
}

export default Header;