import PouchDB from 'pouchDB';
import Find from 'pouchdb-find';
PouchDB.plugin(Find);

export default class DB {
  constructor(name) {
    // set up the remote pouchdb and local and sync
    const remotedb = new PouchDB(
      `http://admin:graceHopper@localhost:5984/${name}`
    );
    console.log('Remote database created Successfully.');
    this.db = new PouchDB(name, { skip_setup: true });
    console.log('Local database created Successfully.');
    this.db.sync(remotedb, {
      live: true,
      retry: true,
    });
  }
  async createDBIndex() {
    this.db.createIndex({ index: { fields: ['userId'] } });
  }
  // async getAllArticles(){
  //   let allArticles = await this.db.allArticles({include_docs: true})
  //   let articles = {}
  //
  //   allArticles.rows.forEach(a => articles[a.id] = a.doc)
  //   return artices
  // }

  async getArticlesByUser(userId) {
    let allArticles = await this.db.get(id).then(function(doc) {
      console.log(doc);
    });
  }

  async addArticles(obj) {
    let addedArticle = await this.db.put(obj);
  }

  async getAllArticles(id) {
    let allArticles = await this.db.get(id).then(function(doc) {
      console.log(doc);
    });
  }

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

  async addArticle(obj) {
    let newArticle = {
      _id: new Date().toISOString(),
      articleTitle: obj.articleTitle,
      articleUrl: obj.articleUrl,
      userId: obj.userId,
      goalId: obj.goalId,
    };
    console.log('the object being put into db', newArticle);
    this.db.put(newArticle).then(function(err, result) {
      if (!err) {
        console.log('Successfully added a article!');
      } else {
        console.log(err);
      }
    });
  }

  async updateAnArticle(doc) {
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

  async findArticle(inputUserId) {
    this.db
      .find({ selector: { userId: inputUserId } })
      .then(function(err, result) {
        if (!err) {
          console.log('successfully found articles by user');
        } else {
          console.log(err);
        }
      });
  }
}
