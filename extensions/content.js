

const url = $(location).attr('href')

chrome.storage.local.set({'articleUrl': url}, function() {
    console.log('Value is set to ' + url);
});

chrome.storage.local.get(['articleUrl'], function(result) {
  console.log('Value currently is ' + result.articleUrl)
});
