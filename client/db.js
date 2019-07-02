import PouchDB from "pouchDB";
import Find from "pouchdb-find";
PouchDB.plugin(Find);

export default class DB {
  constructor(name) {
    // set up the remote pouchdb and local and sync
    const remotedb = new PouchDB(
      `http://admin:graceHopper@localhost:5984/${name}`
    );
    console.log("Remote database created Successfully.");
    this.db = new PouchDB(name, { skip_setup: true });
    console.log("Local database created Successfully.");
    this.db.sync(remotedb, {
      live: true,
      retry: true
    });
  }

  // CLASS METHODS ------------------------

  // ARTICLE METHODS
  async createDBIndex() {
    this.db.createIndex({ index: { fields: ["userKey"] } });
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

  async addArticle(obj) {
    let newArticle = {
      _id: new Date().toISOString(),
      articleTitle: obj.articleTitle,
      articleURL: obj.articleUrl,
      userKey: obj.userId,
      goalId: obj.goalId
    };

    console.log("the object being put into db", newArticle);
    this.db.put(newArticle).then(function(err, result) {
      if (!err) {
        console.log("Successfully added a article!");
      } else {
        console.log(err);
      }
    });
  }

  async updateAnArticle(doc) {
    // fetch mittens
    db.get("id-goes-here")
      .then(function(doc) {
        // update their age
        doc.age = 4;
        // put them back
        return db.put(doc);
      })
      .then(function() {
        // fetch mittens again
        return db.get("id-goes-here");
      })
      .then(function(doc) {
        console.log(doc);
      });
  }

  findArticle(inputUserId) {
    return this.db
      .find({ selector: { userKey: {$eq: inputUserId }} })
      .then(function(result, err) {
        if (!err) {
          console.log("successfully found articles by user", result);
          return result;
        } else {
          console.log("this is the error", err);
        }
      });
  }

  // USER METHODS
  async addUser(obj) {
    let user = {
      _id: new Date().toISOString(),
      email: obj.email,
      password: obj.password
      // goals: {
      //   goalId: obj.goal.id,
      //   title: obj.goal.title,
      //   articles: [].concat(obj.goals.articleUrl),
      //   completed: false
      // }
    };
    this.db.put(user).then(function(err, result) {
      if (!err) {
        console.log("Successfully added a user!");
      }
    });
  }
}
