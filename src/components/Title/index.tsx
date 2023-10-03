/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react"

type Props = {
  children:  ReactNode
  label?: string
}

const Title: React.FC<Props> = ({children, label}) => {
  return (

    <>
      <h1>{children}</h1>
      <div>
        {label}
      </div>
      <form>
        <label>Nome</label>
        <input type="text"/>
      </form>
    </>
  )
}

export default Title