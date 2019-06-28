const request = require('request')
const cheerio = require('cheerio')

const nano = require('nano')('http://admin:graceHopper@localhost:5984')

nano.db.create('tester')
tester = nano.use('tester')


function insertData(url, goal, title){
 request(url, function (error, response, html) {
   if (!error && response.statusCode == 200) {

      tester.insert({
        linkUrl: html, title: title, goalId: goal
      })

       console.log('you have inserted a document with an _id of rabbit')

   }
 });

}



insertData('https://onezero.medium.com/we-already-know-what-our-data-is-worth-48bca5643844', 2, "Fun Article for Frenz")

insertData('https://elemental.medium.com/the-cryptic-language-of-non-verbal-communication-c3deee315326', 2, "Quiet Time")

insertData('https://forge.medium.com/dont-be-friends-with-your-teenage-kid-7164f6844e5c', 1, 'Teenage Wasteland')
