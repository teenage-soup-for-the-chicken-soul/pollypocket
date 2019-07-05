import PouchDB from 'pouchDB';
import Find from 'pouchdb-find';
PouchDB.plugin(Find);

export default class DB {
  constructor(name) {
    // set up the remote pouchdb and local and sync
    const remotedb = new PouchDB(
      `${process.env.COUCHDB_URL}${name}`
    );
    console.log('Remote database created Successfully.');
    this.db = new PouchDB(name, { skip_setup: true });
    console.log('Local database created Successfully.');
    this.db.sync(remotedb, {
      live: true,
      retry: true,
    });
  }

  // CLASS METHODS ------------------------

  // ARTICLE METHODS
  async createDBIndex() {
    this.db.createIndex({ index: { fields: ['userKey', 'goals', '_id'] } });

  }

  findGoals(inputUserId) {
    return this.db
      .find({
        selector: { userKey: { $eq: inputUserId }, goals: { $gt: null } },
      })
      .then(function(result, err) {
        if (!err) {
          console.log('successfully found goals by user', result);
          return result;
        } else {
          console.log('this is the error', err);
        }
      });
  }

  addGoal(obj) {
    let newGoal = {
      userKey: obj.userKey,
      goals: obj.goals,
    };
    let currDoc = this.db
      .find({
        selector: { userKey: { $eq: obj.userKey }, goals: { $gt: null } },
      })
      .then(function(result, err) {
        if (!err) {
          console.log('successfully in goals  by user', result);
          return result;
        } else {
          console.log('this is the error', err);
        }
      });
    console.log(currDoc);
    this.db.put(doc); // initial put
    db.get('test')
      .then(function(doc) {
        doc.results[doc.results.length] = 44; // modify it here instead
        return db.put(doc);
      })
      .then(function() {
        return db.get('test');
      })
      .then(function(doc) {
        console.log(doc);
      });
  }

  async getArticlesByUser(userId) {
    let allArticles = await this.db.get(id).then(function(doc) {
      console.log(doc);
    });
  }

  async getAllArticles(id) {
    let allArticles = await this.db.get(id).then(function(doc) {
      console.log(doc);
    });
  }

  updateAnArticle(doc) {
    // fetch mittens
    db.get('id-goes-here')
      .then(function(doc) {
        // update their age
        doc.age = 4;
        // put them back
        return db.put(doc);
      })
      .then(function() {
        // fetch mittens again
        return db.get('id-goes-here');
      })
      .then(function(doc) {
        console.log(doc);
      });
  }

  findArticle(inputUserId) {
    return this.db
      .find({ selector: { userKey: { $eq: inputUserId } } })
      .then(function(result, err) {
        if (!err) {
          console.log('successfully found articles by user', result);
          return result;
        } else {
          console.log('this is the error', err);
        }
      });
  }

  deleteArticle(article){
   this.db.remove(article);
    



  }

  // USER METHODS
  async addUser(obj) {
    let user = {
      _id: new Date().toISOString(),
      email: obj.email,
      password: obj.password,
      // goals: {
      //   goalId: obj.goal.id,
      //   title: obj.goal.title,
      //   articles: [].concat(obj.goals.articleUrl),
      //   completed: false
      // }
    };
    this.db.put(user).then(function(err, result) {
      if (!err) {
        console.log('Successfully added a user!');
      }
    });
  }
}
