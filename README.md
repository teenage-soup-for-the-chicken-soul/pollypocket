# Poly Pocket

A progressive web app that saves articles online and renders them offline with a built in reading incentive tool.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Prerequisites

This project uses CouchDB, please be sure install on your local machine
find more here. [CouchDB](http://couchdb.apache.org)

Also you may need to run this script to enable CORS

```
npm install -g add-cors-to-couchdb
add-cors-to-couchdb
```

In order to use the chrome extension functionality make sure to also sign up for a Google Oauth ID/Secret and Chrome Extension Manifest. 
[Google Oauth Instructions](https://developers.google.com/identity/protocols/OAuth2)
[Google Developers Console](https://console.developers.google.com)
Please also create a seperate Client ID for a Chrome App


Create a secrets.js file with these process.env variables

process.env.GOOGLE_CALLBACK = '/auth/google/callback';

With your ID's and secrets: 
process.env.CLOUDANT_ID = 'Your CouchDB ID'
process.env.CLOUDANT_SECRET = 'Your CouchDB Secret'
process.env.COUCHDB_URL = 'Your CouchDB URL'
process.env.EXTENSION_MANIFEST = 'Your Chrome Extension Manifest'
process.env.GOOGLE_CLIENT_ID = 'Your Google Client ID'
process.env.GOOGLE_CLIENT_SECRET = 'Your Google Client Secret'


### Installing

This script will seed your database and create your db view for the json output

```
npm run seed
```

This script will start the application

```
npm run start-dev
```

Checkout out localhost:3000


For the Chrome Extension, please visit [Chrome Extensions](chrome://extensions/) to load and unpack the Polly Pocket Extension. 


## Running the tests

Explain how to run the automated tests for this system


### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

## Deployment

[Live](https://pollypocket-gracehopper.herokuapp.com)


## Built With

* [React](https://reactjs.org) - The web framework used
* [Node](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Cloudant](https://www.ibm.com/cloud/cloudant) - Online NoSQL Database that syncs with PouchDb
* [PouchDb](https://pouchdb.com) - Offline db syncing


## Authors

See also the list of [contributors](https://github.com/orgs/teenage-soup-for-the-chicken-soul/people) who participated in this project.


## Acknowledgments

* Special thanks to [GH](https://www.gracehopper.com)!
