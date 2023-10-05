import {Link} from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Início</Link></li>
          <li><Link to="/search-food-letters">Pesquisar por Letras</Link></li>
          <li><Link to="/search-letters">Pesquisar por Receitas</Link></li>
          <li><Link to="/serch-recipes-ingredients">Receitas por Ingredientes</Link></li>
        </ul>
      </nav>
      <br/>
      <hr/>
    </header>
  )
}

export default Header;