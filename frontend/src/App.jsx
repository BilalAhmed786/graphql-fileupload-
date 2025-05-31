import { useState } from 'react'
import { useQuery,useMutation } from '@apollo/client'
import { get_User,UPDATE_USER,DELETE_USER } from './graphql/users'
import UserForm from './components/user'
import './App.css'

function App() {
  const [editid, setEditid] = useState('')
  const [edituser, setEdituser] = useState(
    {
      id: "",
      name: "",
      email: "",
      age: "",
      image: null

    }
  )
  const { loading, error, data,refetch } = useQuery(get_User)
  const [updateUser,{data:updatedata}]  = useMutation(UPDATE_USER)
  const [deleteUser] = useMutation(DELETE_USER)     
  const handleDelete = async(id) => {

    deleteUser({
      variables:{
        id
      }
    })

    await refetch()

  }

   return (
    <div>
      <>
        <UserForm refetch={refetch}/>

        <div className='text-center'>
          <h1>User List</h1>

          <table className='text-center mx-auto mb-15'>
            <thead>
              <th className='border px-4 py-2'>Name</th>
              <th className='border px-4 py-2'>Email</th>
              <th className='border px-4 py-2'>Age</th>
              <th className='border px-4 py-2'>image</th>
              <th className='border px-4 py-2'>Delete</th>
              <th className='border px-4 py-2'>Update</th>
            </thead>
            <tbody>
              {data && data.users.map((alluser, index) => (
                editid !== alluser.id ? (
                  <tr key={index}>
                    <td className='border px-4 py-2'>{alluser.name}</td>
                    <td className='border px-4 py-2'>{alluser.email}</td>
                    <td className='border px-4 py-2'>{alluser.age}</td>
                    <td className='border px-4 py-2'>
                      <img className='w-[40px]' src={`http://localhost:4000/uploads/${alluser.image}`} alt="User" />
                    </td>
                    <td className='border px-4 py-2'>
                      <button className='text-red-500' onClick={() => handleDelete(alluser.id)}>Delete</button>
                    </td>
                    <td className='border px-4 py-2'>
                      <button className='text-blue-500' onClick={() => {
                        setEditid(alluser.id);
                        setEdituser(alluser); // Set user data for editing
                      }}>Edit</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={index}>
                    <td className='border px-4 py-2'>
                      <input
                        type="text"
                        value={edituser.name}
                        onChange={(e) => setEdituser({ ...edituser, name: e.target.value })}
                        className='w-full px-2 py-1 border'
                      />
                    </td>
                    <td className='border px-4 py-2'>
                      <input
                        type="email"
                        value={edituser.email}
                        onChange={(e) => setEdituser({ ...edituser, email: e.target.value })}
                        className='w-full px-2 py-1 border'
                      />
                    </td>
                    <td className='border px-4 py-2'>
                      <input
                        type="number"
                        value={edituser.age}
                        onChange={(e) => setEdituser({ ...edituser, age: e.target.value })}
                        className='w-full px-2 py-1 border'
                      />
                    </td>
                    <td className='border px-4 py-2'>
                      <img
                        className='w-[40px]'
                        src={`http://localhost:4000/uploads/${edituser.image}`}
                        alt="Edit Preview"
                      />
                    </td>
                    <td className='border px-4 py-2'>
                      <button
                        className='text-green-500'
                        onClick={() => {
                          updateUser({
                            variables:{
                              id:edituser.id,
                              name:edituser.name,
                              email:edituser.email,
                              age:edituser.age

                            }
                              
                          })
                          setEditid('');
                        }}
                      >Update</button>
                    </td>
                    <td className='border px-4 py-2'>
                      <button
                        className='text-red-500'
                        onClick={() => setEditid('')}
                      >Cancel</button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>

          </table>
        </div>
      </>

    </div>
  )
}

export default App
