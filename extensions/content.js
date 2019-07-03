

const url = $(location).attr('href')
let i = 0

chrome.storage.local.set({'articleUrl': url}, function() {
    console.log('Value is set to ' + url);
    window.localStorage.setItem(`articleUrl${i++}`, JSON.stringify(url));
});

chrome.storage.local.get(['articleUrl'], function(result) {
  console.log('Value currently is ' + result.articleUrl)
});
