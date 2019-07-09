const options = {
  type: 'basic',
  iconUrl: 'icon16.png',
  title: "Polly Pocket notification",
  message: "Sucessfully added an article!"
}

chrome.notifications.create(options, callback)

function callback(){
  console.log("Popup done!")
}
