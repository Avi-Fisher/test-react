import { useState } from 'react'
import './App.css'
import TableComponent from "./AddData/AddData"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TableComponent></TableComponent>
    </>
  )
}

export default App
