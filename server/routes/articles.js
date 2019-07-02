
const router = require('express').Router()

var request = require("request");
var cheerio = require("cheerio");
const nano = require("nano")("http://admin:graceHopper@localhost:5984");


function insertData(obj) {
  const bodyTest = nano.use("articles");
  request(
    obj.articleURL,
    function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        $("body").each(function(i, element) {
          var a = $(this).html();
          bodyTest.insert({
            linkData: a,
            title: obj.title,
            articleURL: obj.articleURL,
            userKey: obj.userKey,
            goalId: obj.goalId

          });
        });
      }
    }
  );
}

router.get('/', async (req, res, next) => {
  try{
    res.send()
  }
  catch(err){
    next(err)
  }
})


router.get('/:id', async (req, res, next) => {
  try {

    res.json()
  }
  catch(err){
    next(err)
  }
})


// POST ROUTES || CREATE


router.post('/', async (req, res, next) => {
  try {
 await insertData(req.body)

    // nano.db.create("body_test");




    res.status(201).send("Success, Article Added!")
  }
  catch (e) {
    next(e)
  }
})




// PUT ROUTES || UPDATE
router.put('/:id', async (req, res, next) => {
  try {
      res.send()
  }
  catch (err) {
    next(err)
  }
})



// DELETE ROUTES || DESTROY
router.delete('/:id', async (req, res, next) => {
  try {

      res.send({message: 'Deleted successfully'})
  }
  catch (err) {
    next(err)
  }
})


module.exports = router
