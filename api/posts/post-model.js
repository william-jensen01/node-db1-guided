const db = require('../../data/db-config');

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

async function get() {
  // knex will return an array of objects (the posts)

  const posts = await db('posts'); // db.select('*').from('posts')
    // select * from 'posts'

  return posts;
}

async function getById(id) {
  // id will return a number
  // { id } will return {id: number}
  // knex needs { id } to find the post with specified id

  // knex will return an array of objects that meet the criteria given in the .where
  // if knex finds 3 objects it will return an array of 3 objects
  // if knex finds 0 objects it will return an array of 0 objects
  // in the checkId function of post-router.js we are checking if the post is assigned a value
  // an empty array is a valid value
  // so we want to make post -> [post] because we are taking the first returned value and assigning it to post
  // if it is an empty array, the first element is undefined and post will not have a value ... if it is an array of 3 objects the first element of the 3 will be returned as post

  const [post] = await db('posts').where({ id });
    // SELECT * FROM 'posts' WHERE 'id' = id

  return post;
}

async function create(data) {
  // when using insert() knex will return an array with the new post's id
  // we know it's an array so we make postId -> [postId] (we dereference it) so instead of the value being an array of numbers it will only be the number itself
  // doing it this way means the req.body can only accept one posts object

  const [postId] = await db('posts').insert(data);
    // INSERT INTO 'posts' ('contents', 'title') VALUES (*contents*, *title*)

  // now that we have the id by itself, we'll want to look up the post using getById()
  const post = await getById(postId)

  // once we receive the specific post we'll want to return it
  return post;
}

async function update(id, changes) {
  // when using update(), knex will return a number of rows that were successfully changed
  const count = await db('posts').where({ id }).update(changes);
  return count;
}

// function updateThen(id, changes) {
//   db('posts').where({ id }).update(changes)
//     .then(count => {
//       return count;
//     })
//     .catch(err => {
//       throw err;
//     })
// }

async function remove(id) {
  // similar to update(), when using del() knex will return a number of affected rows
  const count = await db('posts').where({ id }).del();
  return count;
}
