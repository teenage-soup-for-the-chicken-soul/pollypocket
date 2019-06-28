var request = require("request");
var cheerio = require("cheerio");

const nano = require("nano")("http://admin:graceHopper@localhost:5984");

nano.db.create("body_test");
const bodyTest = nano.use("body_test");

function insertData(url, goal, title) {
  //  request(url, function (error, response, html) {
  //    if (!error && response.statusCode == 200) {

  //       tester.insert({
  //         linkUrl: html, title: title, goalId: goal
  //       })

  //        console.log('you have inserted a document with an _id of rabbit')

  //    }
  //  });

  request(
    "https://medium.com/react-native-development/easily-build-forms-in-react-native-9006fcd2a73b",
    function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        $("body").each(function(i, element) {
          var a = $(this).html();
          bodyTest.insert({
            linkUrl: a,
            title: title,
            goalId: goal
          });
        });
      }
    }
  );
}

insertData('https://onezero.medium.com/we-already-know-what-our-data-is-worth-48bca5643844', 2, "Fun Article for Frenz")

insertData('https://elemental.medium.com/the-cryptic-language-of-non-verbal-communication-c3deee315326', 2, "Quiet Time")

insertData('https://forge.medium.com/dont-be-friends-with-your-teenage-kid-7164f6844e5c', 1, 'Teenage Wasteland')

// request('https://medium.com/react-native-development/easily-build-forms-in-react-native-9006fcd2a73b', function (error, response, html) {
//   if (!error && response.statusCode == 200) {
//     var $ = cheerio.load(html);
//     // $('div.comhead').each(function(i, element){
//       var a = $('span.n').prev()
//       console.log(a.text);

//   }
// });

// $('div[id="list"]').find('div > div > a').each(function (index, element) {
//   list.push($(element).attr('href'));
// });
// console.dir(list)
