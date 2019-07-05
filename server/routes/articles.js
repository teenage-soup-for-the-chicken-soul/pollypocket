const router = require('express').Router();
var request = require('request');
var cheerio = require('cheerio');
const nano = require('nano')("http://admin:graceHopper@localhost:5984")
// nano(process.env.COUCHDB_URL || 'http://127.0.0.1:5984');

// ('http://admin:graceHopper@localhost:5984');

//POSTS NEW ARTICLE WITH CHEERIO
function insertData(obj) {
  const db = nano.use('articles');
  let cssURLArr = [];
  let parsedBody;
  let articleTitle;
  let mainImage;

  request(obj.articleURL, function(error, response, html) {
    if (!error && response.statusCode === 200) {
      var $ = cheerio.load(html);

      parsedBody = $('body').html();
      articleTitle = $('title').html();
      mainImage = $('meta[property="og:image"]').attr('content');
      $('link[rel="stylesheet"]').each(function(i, element) {
        cssURLArr.push($(element).attr('href'));
      });
      db.insert({
        userKey: obj.userKey,
        title: articleTitle,
        image: mainImage,
        linkCSS: cssURLArr,
        linkData: parsedBody,
        articleURL: obj.articleURL,
        goalId: obj.goalId,
      });
      console.log('new article posted');
    }
  });
}

// POST ROUTES || CREATE

router.post('/', async (req, res, next) => {
  try {
    await insertData(req.body);
    res.status(201).send('Success, Article Added!');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
