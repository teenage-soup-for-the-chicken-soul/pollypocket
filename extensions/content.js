

const url = $(location).attr('href')

chrome.storage.local.set({'articleUrl': url}, function() {
    console.log('Value is set to ' + url);
});

chrome.storage.local.get(['articleUrl'], function(result) {
  console.log('Value currently is ' + result.articleUrl)
});

// const addItBTN = document.getElementById('add-it-btn')
//
// addItBTN.onclick = function(element){
//   $.post('/api/articles', {articleUrl: url}, function(result){
//      console.log(result)
//   })
// }


// Not sure what to do here because the insertData function in the post route is expecting articleURL, userKey, goalId as parameters. 

$("button").click(function(){
  $.post('/api/articles', {articleUrl: url}, function(result){
     console.log(result)
  })
})
