const express = require('express');
const knex = require('./db/index.js');
const app = express();
const cors = require('cors')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const port = 4400

app.use(express.json())
app.use(cors())
app.use(bodyParser.json());



app.get('/', (req, res) => {
  res.send('Successful response.');
});

//#######################  USERS  #################################################
//<<<<<<<<<< GET ALL USERS Unauth>>>>>>>>>>>>>
app.get('/users', async (req, res) => {
	try {
	  const users = await knex('users')
		.select("*")
    console.log(users)
	  res.status(201).json(users)
	} catch (err) {
	  res.status(500).json({ message: 'Failed to retrieve users' })
	}
  })
//<<<<<<<<<< GET OnE USER >>>>>>>>>>>>>
app.get('/user/:id', async (req, res) => {
  const { id } = req.params

	try {
	  const requestedUser = await knex('users').where({id}).first()
    if (requestedUser) {
      res.status(201).json(requestedUser)
    } else {
      // Return a 404 error if the user is not found
      res.status(404).json({message: 'User not found'});
    }
	} catch (err) {
	  res.status(500).json({ message: `Failed to retrieve ${id}` })
	}
})

//<<<<<<<<<< ADD USER >>>>>>>>>>>>>
app.post('/users', async (req, res) => {
	const { first_name, last_name, username, password } = req.body;
	console.log(req.body)
	const newUser = {
	  first_name: first_name,
	  last_name: last_name,
	  username: username,
	  password: bcrypt.hashSync(password, 10)
	}
  
	try {
	  const response = await knex('users')
		.insert(newUser)
		.returning('*')
  
	  console.log('user response: ', response)
  
	  delete response[0].password

	  res.status(201).json(response[0])
	} catch (err) {
	  res.status(500).json(err.message)
	}
  
  })
  //<<<<<<<<<< DELETE USER >>>>>>>>>>>>>
  app.delete('/users/delete/:id', async (req, res) => {
    const { id } = req.params
  
    try {
      await knex('users')
        .delete()
        .where('id', id)
  
      res.status(200).json({ message: "User Deleted" })
    } catch (err) {
      res.status(500).json({ message: "Failed to delete User." })
    }
  })
    //<<<<<<<<<< USER LOGIN >>>>>>>>>>>>>
  app.post('/login', async (request, response) => {
    const { username, password } = request.body;
      try {
        const data = await knex('users').where({username}).first()
        if (!data) {
          response.status(401).json({
          error: 'No user by that name'
          });
        } else {
          // Use bcrypt to compare the password
          const isAuth = await bcrypt.compare(password, data.password); 
          if (isAuth) {
            delete data.password;

            response.status(200).json( data );			
          } else {
            response.status(401).json({
              error: 'Invalid password',
            });
          }}
            } catch (err) {
              response.status(500).json({ message: 'Failed to retrieve users data.' })
            }
          }
  )
 


//#######################  ITEMS  #################################################
//<<<<<<<<<< Get All Items >>>>>>>>>>>>>
  app.get('/items', async (req, res) => {
    try {
      const items = await knex('items')
        .select(
          'id',
          'item_name',
          'item_description',
          'item_quantity'
          );

      res.status(201).json(items)
    } catch (err) {
      res.status(500).json({ message: 'Failed to retrieve items data.' })
    }
    })
//<<<<<<<<<< Get All Items >>>>>>>>>>>>>
    app.get('/inventory', async (req, res) => {
      try {
        const items = await knex('items')
          .select('*');
  
        res.status(201).json(items)
      } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve items data.' })
      }
      })


//<<<<<<<<<< GET OnE ITEm >>>>>>>>>>>>>
app.get('/item/:id', async (req, res) => {
  const { id } = req.params
  const reqID = id;

  try {
    const requestedItem = await knex('items').where({id}).first()
    if (requestedItem) {
      res.status(201).json(requestedItem)
    } else {
      // Return a 404 error if the user is not found
      res.status(404).json({message: `Item _${reqID}_ not found`});
    }
  } catch (err) {
    res.status(500).json({ message: `Failed to retrieve Item` })
  }
})


//<<<<<<<<<< Add Item >>>>>>>>>>>>>
app.post('/items', async (req, res) => {
	const { item_userid, item_name, item_description, item_quantity } = req.body;
  const max = await knex('items').max('id as max').first();
	console.log(req.body)
	const newItem = {
      id: max.max + 1,
      item_userid: item_userid,
      item_name: item_name,
      item_description:item_description,
      item_quantity: item_quantity
	}
  
	try {
	  const addedItemResponse = await 
      knex('items')
        .insert(newItem)
        .returning('*');

	  res.status(201).json(addedItemResponse[0])
	} catch (err) {
	  res.status(500).json(err.message)
	}
  
  })


app.listen({port}, () => console.log(`Inventory Server is listening on port ${port}.`));
