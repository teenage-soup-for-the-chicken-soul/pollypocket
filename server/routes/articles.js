const router = require('express').Router();
var request = require('request');
var cheerio = require('cheerio');
const nano = require('nano')('http://admin:graceHopper@localhost:5984');

async function insertData(obj) {
  const db = nano.use('articles');
  let cssURLArr = [];

  let parsedBody;
  let parsedStyle;
  let articleTitle;
  let mainImage;

  //parses the body
  request(obj.articleURL, function(error, response, html) {
    if (!error && response.statusCode === 200) {
      var $ = cheerio.load(html);
      parsedBody = $('body').html();
      request(obj.articleURL, function(error, response, html) {
        if (!error && response.statusCode === 200) {
          var $ = cheerio.load(html);
          $('link[rel="stylesheet"]').each(function(i, element) {
            cssURLArr.push($(element).attr('href'));
            
            //this nest is weird for a forEach
            
            request(obj.articleURL, function(error, response, html) {
              if (!error && response.statusCode === 200) {
                var $ = cheerio.load(html);
                articleTitle = $('title').html();
                request(obj.articleURL, function(error, response, html) {
                  if (!error && response.statusCode === 200) {
                    var $ = cheerio.load(html);
                    mainImage = $('meta[property="og:image"]').attr('content');
                    console.log(
                      'deep in a nest of functions...',
                      mainImage,
                      articleTitle,
                      cssURLArr
                    );
                  }
                });
              }
            });
          });
        }
      });
    }
  });

  //saves css styling
  // cssURLArr.forEach(elem => {
  //   request(elem, function(error, response, html) {
  //     if (!error && response.statusCode === 200) {
  //       var $ = cheerio.load(html);
  //       console.log($);
  //     }
  //   });
  // });

  // db.insert({
  //   linkCSS: parsedStyle,
  //   linkData: parsedBody,
  //   title: obj.title,
  //   articleURL: obj.articleURL,
  //   userKey: obj.userKey,
  //   goalId: obj.goalId,
  // });
}

// router.get('/', async (req, res, next) => {
//   try {
//     res.send();
//   } catch (err) {
//     next(err);
//   }
// });

// router.get('/:id', async (req, res, next) => {
//   try {
//     res.json();
//   } catch (err) {
//     next(err);
//   }
// });

// POST ROUTES || CREATE

router.post('/', async (req, res, next) => {
  try {
    await insertData(req.body);
    res.status(201).send('Success, Article Added!');
  } catch (e) {
    next(e);
  }
});

// PUT ROUTES || UPDATE
// router.put('/:id', async (req, res, next) => {
//   try {
//     res.send();
//   } catch (err) {
//     next(err);
//   }
// });

// DELETE ROUTES || DESTROY
// router.delete('/:id', async (req, res, next) => {
//   try {
//     res.send({ message: 'Deleted successfully' });
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
