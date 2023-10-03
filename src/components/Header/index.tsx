import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Pesquisar por Receitas</Link></li>
          <li><Link to="/search-letters">Pesquisar por Letras</Link></li>
          <li><Link to="/">Pesquisar por Ingredientes</Link></li>
        </ul>
      </nav>
      <br/>
      <hr/>
    </header>
  )
}

export default Header;