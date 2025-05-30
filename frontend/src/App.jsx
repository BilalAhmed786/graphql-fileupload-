import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { get_User } from './graphql/users'
import UserForm from './components/user'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const {loading,error,data} = useQuery(get_User)
   console.log(data)
  return (
    <div>
   <>
   <UserForm/>
   </>

    </div>
  )
}

export default App
