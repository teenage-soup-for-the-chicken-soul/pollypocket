const options = {
  type: 'basic',
  iconUrl: 'icon16.png',
  title: "This is a notification",
  message: "Sucessfully added an article!"
}

chrome.notifications.create(options, callback)

function callback(){
  console.log("Popup done!")
}
