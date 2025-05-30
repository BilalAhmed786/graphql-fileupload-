import { gql } from "@apollo/client"

export const get_User = gql `
 query{
 users{
  name
  email
  age
    
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
`;