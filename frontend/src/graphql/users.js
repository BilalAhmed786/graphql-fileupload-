import { gql } from "@apollo/client"

export const get_User = gql `
 query{
 users{
  id
  name
  email
  age
  image
    
}
 }
`

export const ADD_USER = gql`
  mutation($name: String, $email: String, $age: Int, $sex: String, $image:Upload) {
    createUser(name: $name, email: $email, age: $age, sex: $sex, image: $image) {
     user{
      id
      name
      email
      age
      sex
      image
     }
     message
    }
  }
`
export const UPDATE_USER = gql `

  mutation($id:ID!,$name:String!,$email:String!,$age:Int!) {
   
   updateUser(id:$id,name:$name,email:$email,age:$age){
    user{
    name
    age  
    
    }
   message
  
  }
  
  
  }



`

export const DELETE_USER = gql `

mutation($id:ID!){

   deleteUser(id:$id)

  }
`