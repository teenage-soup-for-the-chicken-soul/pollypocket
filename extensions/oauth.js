window.onload = function() {
  let url = "";
    document.querySelector('button').addEventListener('click', function() {
      chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
        }, function(tabs) {
            var tab = tabs[0];
            url += tab.url
        });
      chrome.identity.getAuthToken({interactive: true}, function(token) {
        let init = {
          method: 'GET',
          async: true,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          'contentType': 'json'
        };
        fetch(
            'https://www.googleapis.com/oauth2/v1/userinfo',
            init)
            .then((response) => response.json())
            .then(function(data) {
              console.log(url, "this is url", data, "this is data")
              fetch('http://localhost:3000/api/articles', {
                     method: 'POST',
                     headers: {'Content-Type': 'application/json'},
                     body: JSON.stringify({ articleURL: `${url}`, userKey: `${data.id}`})
                     })
                     .then(function (data) {
                       console.log('Request succeeded with JSON response', data);
                     })
                     .catch(function (error) {
                       console.log('Request failed', error);
                   });
            });
      });
    });
  };
