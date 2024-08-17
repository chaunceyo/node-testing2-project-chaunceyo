exports.seed = async function(knex) {
  return knex('players').truncate()
  .then( () => {
    return knex('accounts').insert([

    ])
  })
};
