const pool = require('../db/db')
const path = require("path");
const fs = require("fs");
const { finished } = require("stream/promises");
const userresolver = {

    Query: {

        users: async () => {
            try {

                const sql = 'select * from users'
                const result = await pool.query(sql)

                return result.rows

            } catch (error) {

                console.log(error)
            }


        },

        user: async (_, { id }) => {

            try {

                const sql = 'select * from users where id= $1'
                const result = await pool.query(sql, [id])

                return result.rows[0]


            } catch (error) {
                console.log(error)
            }
        }


    },
    Mutation: {

       createUser: async (_, { name, email, age, sex, image }) => {
  try {
    // Check required fields
    if (!name || !email || !age || !sex || !image) {
      return { message: "All fields are required" };
    }

    // Await the image promise to get actual file data
    const { createReadStream, filename } = await image.promise;

    if (!createReadStream || !filename) {
      return { message: "Invalid image upload" };
    }

    // Use process.cwd() to make sure 'uploads' is created in project root
    const uploadDir = path.join(process.cwd(), 'uploads');
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    const stream = createReadStream();
    const out = fs.createWriteStream(filePath);
    stream.pipe(out);
    await finished(out); // waits until stream is finished

    // Insert into database
    const sql = 'INSERT INTO users(name, email, age, sex, image) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const result = await pool.query(sql, [name, email, age, sex, filename]);

    return { user: result.rows[0] };

  } catch (error) {
    console.error("Error uploading user:", error.message);
    throw new Error(error.message);
  }
},

        updateUser: async (_, { id, name, email, age}) => {

            if (!name || !email || !age ) {


                return { message: 'All fields required' }


            }

            const sql = "update users set name = $1 ,email = $2,age = $3 where id = $4 RETURNING *"

            const result = await pool.query(sql, [name, email,age,id])

            return { user: result.rows[0] }
        },

        deleteUser: async (_, { id }) => {

            try {

                const sql = 'delete from users where id = $1'

                const result = await pool.query(sql, [id])

                return result.rowCount > 0
            } catch (error) {

                console.log(error)
            }


        }



    }

}

module.exports = userresolver