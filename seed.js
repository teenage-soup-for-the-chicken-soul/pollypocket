'use strict'

const request = require('request')
const cheerio = require('cheerio')
// const nano = require("nano")
//
// nano(process.env.COUCHDB_URL || 'http://127.0.0.1:5984');
const nano = require('nano')('http://admin:graceHopper@localhost:5984')

nano.db.create('users').then(body => {
  console.log('database users created!')
})

const couchDB = nano.use('users')

async function seed(data, goals = {}) {
  await request(
    'https://medium.com/react-native-development/easily-build-forms-in-react-native-9006fcd2a73b',
    function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html)
        $('body').each(function(i, element) {
          var a = $(this).html()
          couchDB.insert({
            userKey: '7260ed80-9c37-11e9-a4f1-e1ff71ed010e'
          })
        })
      }
    }
  )
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed(
      {
        userKey: 'na7260ed80-9c37-11e9-a4f1-e1ff71ed010e',
        goalId: 2,
        title: 'Fun Article for Frenz',
        articles: [].concat(
          'https://onezero.medium.com/we-already-know-what-our-data-is-worth-48bca5643844'
        )
      }
    )
    await seed(
      {
        userKey: 'na7260ed80-9c37-11e9-a4f1-e1ff71ed010e',
        goalId: 2,
        title: 'Quiet Time',
        articles: [].concat(
          'https://elemental.medium.com/the-cryptic-language-of-non-verbal-communication-c3deee315326'
        )
      }
    )

    await seed(
      {
        userKey: 'nan',
        goalId: 1,
        title: 'Teenage Wasteland',
        articles: [].concat(
          'https://forge.medium.com/dont-be-friends-with-your-teenage-kid-7164f6844e5c'
        )
      }
    )
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
