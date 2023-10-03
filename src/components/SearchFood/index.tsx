/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

type Props = {
  label: string,
  onSearch: (text: string) => void
}

const SearchFoodComponent: React.FC<Props> = ({label, onSearch}) => {
  const [search, setSearch] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setSearch(text)
  }

  console.log(search)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(search)
  }

  return (
    <>
    <div>
      <form onSubmit={handleSubmit}>
      <label htmlFor="search">{label}</label>
      <br/>
      <input id="search" type="text" style={{border: "1px solid black"}} placeholder="Pesquisar" value={search} onChange={handleSearch}/>
      <br/>
      <button type="submit">Pesquisar</button>
      </form>
    </div>
    </>
  )
}

export default SearchFoodComponent;