

const url = $(location).attr('href')

chrome.storage.local.set({'articleUrl': url}, function() {
    console.log('Value is set to ' + url);
});

chrome.storage.local.get(['articleUrl'], function(result) {
  console.log('Value currently is ' + result.articleUrl)
});

chrome.notifications.onButtonClicked.addListener(function(tab){
    var obj = {
        type: 'basic',
        iconUrl: 'icon16.png',
        title: "This is a notification",
        message: "Sucessfully added an article!"
      }
      return obj
    });
  )
}
