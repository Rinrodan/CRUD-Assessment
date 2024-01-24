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
//<<<<<<<<<< GET ALL USERS >>>>>>>>>>>>>
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


//#######################  ITEMS  #################################################
//<<<<<<<<<< Get All Items >>>>>>>>>>>>>
  app.get('/items', async (req, res) => {
    try {
      const items = await knex('items')
      .select("*")
      res.status(201).json(items)
    } catch (err) {
      res.status(500).json({ message: 'Failed to retrieve items data.' })
    }
    })

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
	  const response = await 
      knex('items')
        .insert(newItem)
        .returning('*');

	  res.status(201).json(response[0])
	} catch (err) {
	  res.status(500).json(err.message)
	}
  
  })


app.listen({port}, () => console.log(`Inventory Server is listening on port ${port}.`));
