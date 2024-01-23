const bcrypt = require('bcrypt')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { first_name: 'George',
    last_name: 'Washington',
    username: 'gwash',
    password: bcrypt.hashSync('123', 10)
    },
    { first_name: 'Harry',
    last_name: 'Truman',
    username: 'dabomb',
    password: bcrypt.hashSync('123', 10)
    },
    { first_name: 'Jim',
    last_name: 'FromTheOffice',
    username: 'bigtuna',
    password: bcrypt.hashSync('123', 10)
    },    
    { first_name: 'Albert',
    last_name: 'Albertsons',
    username: 'aber123',
    password: bcrypt.hashSync('123', 10)
    }
  ]);
};