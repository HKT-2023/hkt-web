import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function ExampleComponent() {
  const dispatch = useDispatch()
  const [rowsPerPage, setRowsPerPage] = useState(5)
  useEffect(() => {}, [rowsPerPage])
  const handleRequestSort = (event, property) => {
    setRowsPerPage(Date())
    dispatch({
      type: 'handleRequestSort',
      payload: property,
    })
  }

  return <div onClick={(event) => handleRequestSort(event, 1)}>example</div>
}
