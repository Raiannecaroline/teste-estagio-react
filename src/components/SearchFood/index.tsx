/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import Header from "../Header";

type Props = {
  label: string,
  onSearch: (text: string) => void
}

const SearchFoodComponent: React.FC<Props> = ({onSearch}) => {
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
    <Header/>
    <hr/>
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:items-center">
        <label htmlFor="search" className="text-lg font-semibold mb-2 sm:mb-0 sm:mr-2">Pesquisar:</label>
        <input
          id="search"
          type="text"
          className="border-2 border-orange-400 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-600 flex-grow"
          placeholder="Pesquisar"
          value={search}
          onChange={handleSearch}
        />
        <button
          type="submit"
          className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg mt-2 sm:mt-0"
        >
          Pesquisar
        </button>
      </form>
    </div>
    </>
  )
}

export default SearchFoodComponent;