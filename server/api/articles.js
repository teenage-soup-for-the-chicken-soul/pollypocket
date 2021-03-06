const router = require('express').Router();
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const rp = require('request-promise');
const Cloudant = require('@cloudant/cloudant');
const cloudant = Cloudant({
  account: process.env.CLOUDANT_ID,
  password: process.env.CLOUDANT_SECRET,
});

//POSTS NEW ARTICLE WITH JSDOM
async function insertData(obj) {
  const db = cloudant.use('articles');
  let cssURL = [];
  let cssStyle = [];
  let parsedBody;
  let articleTitle;
  let mainImage;

  jsdom.defaultDocumentFeatures = {
    QuerySelector: true,
  };

  await JSDOM.fromURL(obj.articleURL, {
    resources: 'usable',
    pretendToBeVisual: true,
    runScripts: 'dangerously',
  }).then(async function(dom) {
    parsedBody = dom.window.document.querySelector('body').innerHTML;
    articleTitle = dom.window.document.querySelector('title').textContent;
    mainImage = dom.window.document.querySelector(
      'meta[property="og:image"][content]'
    ).content;
    dom.window.document
      .querySelectorAll('head > link[rel="stylesheet"')
      .forEach(node => {
        cssURL.push(node.href);
      });
    if (dom.window.document.querySelector('style')) {
      dom.window.document
        .querySelectorAll('style')
        .forEach(node => cssStyle.push(node.innerHTML));
    }
    if (cssURL.length) {
      await Promise.all(
        cssURL.map(async function(cssLink) {
          let innerStyle = await rp({ url: cssLink });
          cssStyle.push(innerStyle);
        })
      );
    }
    console.log('new article posted');
    return db.insert({
      userKey: obj.userKey,
      title: articleTitle,
      image: mainImage,
      linkCSS: cssURL,
      styleCss: cssStyle,
      linkData: parsedBody,
      articleURL: obj.articleURL,
      goalId: obj.goalId,
      read: 'false',
    });
  });
}

// POST ROUTES || CREATE

router.post('/', async (req, res, next) => {
  let goalId = req.body.goalId;
  if (!goalId) {
    goalId = null;
  }
  let newObj = {
    articleURL: req.body.articleURL,
    userKey: req.body.userKey,
    goalId,
  };
  console.log(newObj, 'this is the obj');
  try {
    await insertData(newObj);
    res.status(201).send('Success, Article Added!');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
