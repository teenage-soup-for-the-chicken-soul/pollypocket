# Polly Pocket

A progressive web app that saves articles online and renders them offline with a built in reading incentive tool.

[Watch Our Demo Here](https://www.youtube.com/watch?v=oeeHZJ-goRg&list=PLx0iOsdUOUmkGcxY8of0CAWlyyXkB90e0&index=7&t=0s)


## Getting Started

These instructions will get your copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Prerequisites

This project uses CouchDB, please be sure install on your local machine
find more here. [CouchDB](http://couchdb.apache.org)

Also you may need to run this script to enable CORS

```
npm install -g add-cors-to-couchdb
add-cors-to-couchdb
```

In order to use the chrome extension functionality make sure to also sign up for a Google OAuth ID/Secret. 
* [Google Oauth Instructions](https://developers.google.com/identity/protocols/OAuth2)
* [Google Developers Console](https://console.developers.google.com)


Install the chrome extension [here](https://chrome.google.com/webstore/detail/pollypocket-extension/jmdkjchmkgpngpbfkdeiokoogjehmkel?hl=en)


Create a secrets.js file with these process.env variables

* process.env.GOOGLE_CALLBACK = '/auth/google/callback';

With your IDs and secrets: 
* process.env.CLOUDANT_ID = 'Your CouchDB ID'
* process.env.CLOUDANT_SECRET = 'Your CouchDB Secret'
* process.env.COUCHDB_URL = 'Your CouchDB URL'
* process.env.GOOGLE_CLIENT_ID = 'Your Google Client ID'
* process.env.GOOGLE_CLIENT_SECRET = 'Your Google Client Secret'


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


## Running the tests

This script will run unit tests on the project's React Components, Redux Store, and PostgreSQL Models. 

```
npm run test
```
<!-- ### Break down into end to end tests

Explain what these tests test and why

```
Give an example
``` -->

## Deployment

[Live Site](https://pollypocket-gracehopper.herokuapp.com)


## Built With

* [React](https://reactjs.org) - The web framework used
* [Node](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Cloudant](https://www.ibm.com/cloud/cloudant) - Online NoSQL Database that syncs with PouchDb
* [PouchDb](https://pouchdb.com) - Offline db syncing


## Authors

See also the list of [contributors](https://github.com/orgs/teenage-soup-for-the-chicken-soul/people) who participated in this project.


## Acknowledgments

* Special thanks to [GH](https://www.gracehopper.com)!
