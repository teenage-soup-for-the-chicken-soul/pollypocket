# Poly Pocket

A web and mobile app that saves articles online and renders them offline with a built in reading incentive tool.

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

### Installing

This script will seed your database and create your db view for the json output

```
npm run seed
```

This script will start the application

```
npm run start-dev
```

checkout out localhost:5001

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

## Deployment

[Live](https://git.heroku.com/polly-pocket.git)

## Built With

* [React](https://reactjs.org) - The web framework used
* [Node](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [PouchDb](https://pouchdb.com) - Offline db syncing

## Authors

See also the list of [contributors](https://github.com/orgs/teenage-soup-for-the-chicken-soul/people) who participated in this project.

## Acknowledgments

* Thanks to GH!
