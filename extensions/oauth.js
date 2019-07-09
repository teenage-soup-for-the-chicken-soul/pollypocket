window.onload = function() {
    document.querySelector('button').addEventListener('click', function() {
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
            'https://people.googleapis.com/v1/contactGroups/all?maxMembers=20&key=AIzaSyDcY2VDQzK0EX8Ven9Kvqj-kpTyU8rnWzA',
            init)
            .then((response) => response.json())
            .then(function(data) {
              console.log(data)
            });
      });
    });
  };
