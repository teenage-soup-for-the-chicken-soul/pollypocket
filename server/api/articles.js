const router = require('express').Router();
var request = require('request');
var cheerio = require('cheerio');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const nano = require('nano')(
  process.env.COUCHDB_URL || 'http://127.0.0.1:5984'
);


//POSTS NEW ARTICLE WITH JSDOM
function insertData(obj) {
  const db = nano.use('articles');
  let cssURLArr = [];
  let cssStyle = [];
  let parsedBody;
  let articleTitle;
  let mainImage;

  jsdom.defaultDocumentFeatures = {
    QuerySelector: true,
  }; //not sure if this is doing anything

  JSDOM.fromURL(obj.articleURL, {
    resources: 'usable',
    pretendToBeVisual: true,
    runScripts: 'dangerously',
  }).then(dom => {
    parsedBody = dom.window.document.querySelector('body').innerHTML;
    articleTitle = dom.window.document.querySelector('title').textContent;
    mainImage = dom.window.document.querySelector(
      'meta[property="og:image"][content]'
    ).content;
    dom.window.document
      .querySelectorAll('head > link[rel="stylesheet"]')
      .forEach(node => cssURLArr.push(node.href));
    if (dom.window.document.querySelector('style')) {
      dom.window.document
        .querySelectorAll('style')
        .forEach(node => cssStyle.push(node.innerHTML));
    }
    db.insert({
      userKey: obj.userKey,
      title: articleTitle,
      image: mainImage,
      linkCSS: cssURLArr,
      styleCss: cssStyle,
      linkData: parsedBody,
      articleURL: obj.articleURL,
      goalId: obj.goalId,
    });
    console.log('new article posted');
  });
}

// POST ROUTES || CREATE

router.post('/', async (req, res, next) => {
  try {
    // const {userKey, goalId} = req.body
    await insertData(req.body);
    res.status(201).send('Success, Article Added!');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
