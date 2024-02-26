
// import { useState } from 'react'
import './App.css'
import useSWR from 'swr'
import { Box } from '@mantine/core'
import AddToDo from './components/AddTodo'

export const ENDPOINT = 'http://localhost:4000'
const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then(r => r.json())

function App() {

  const { data, mutate } = useSWR('api/todos', fetcher)
  console.log(mutate)
  return (
    <Box>
      {JSON.stringify(data)}
      <AddToDo/>
    </Box>
  )
}

export default App
