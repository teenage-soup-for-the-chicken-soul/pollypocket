const router = require('express').Router();
var request = require('request');
var cheerio = require('cheerio');
const nano = require('nano')
nano(process.env.COUCHDB_URL || 'http://127.0.0.1:5984');

// ('http://admin:graceHopper@localhost:5984');

function insertData(obj) {
  const bodyTest = nano.use('articles');
  request(obj.articleURL, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      let styles = [];
      $('head').each((i, el) => {
    
        el.children.forEach((child, i) => {
          if(child.type === 'style' && child.children.length) {
            let nodes = [];
            child.children.forEach((node, i) => {
              if(node.type === 'text') {
                console.log("HIT", node)
                nodes.push(node.data)
              }
            })
            styles.concat(nodes)
          }
        })
        
      });
      console.log("STYLE TAGS", styles)
      $('body').each(function(i, element) {
        var a = $(this).html();
        bodyTest.insert({
          linkData: a,
          title: obj.title,
          articleURL: obj.articleURL,
          userKey: obj.userKey,
          goalId: obj.goalId,
        });
      });
    }
  });
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
