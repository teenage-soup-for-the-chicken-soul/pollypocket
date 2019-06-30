const nano = require('nano')('http://admin:graceHopper@localhost:5984')

const tester = nano.use('tester')


tester.insert(
 {
   views: {
     viewByGoal: {
       map: function(doc) {
         emit(doc.goalId, {title: doc.title, linkUrl: doc.linkUrl});
       },
     },
   },
 },
 '_design/articlesViewGoal',
 function(error, response) {
   console.log(error, undefined, 'Failed to create views');
   console.log(response.ok, true, 'Response should be ok');
 }
);
