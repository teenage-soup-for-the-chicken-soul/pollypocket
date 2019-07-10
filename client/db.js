import PouchDB from 'pouchDB';
import find from 'pouchdb-find';
import '../secrets';
PouchDB.plugin(find);

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

  createDBIndex() {
    this.db.createIndex({ index: { fields: ['userKey', '_id'] } });
    }

  findArticle(inputUserId) {
    return this.db
      .find({ selector: { userKey: { $eq: inputUserId } } })
      .then(function(result, err) {
        if (!err) {
          console.log('Successfully found articles by user', result);
          return result;
        } else {
          console.log('Error finding articles by user', err);
        }
      });
  }

  deleteArticle(article) {
    this.db.remove(article);
  }

  markArticleRead(article){
    this.db.put({
      _id: article._id,
      _rev: article._rev,
      userKey: article.userKey,
      title: article.title,
      image: article.image,
      linkCSS: article.linkCSS,
      styleCss: article.styleCss,
      linkData: article.linkData,
      articleURL: article.articleURL,
      read: "true"

    })
  }

  markArticleUnread(article){
    this.db.put({
      _id: article._id,
      _rev: article._rev,
      userKey: article.userKey,
      title: article.title,
      image: article.image,
      linkCSS: article.linkCSS,
      styleCss: article.styleCss,
      linkData: article.linkData,
      articleURL: article.articleURL,
      read: "false"

    })
  }
  // ARTICLE METHODS


  // async getArticlesByUser(userId) {
  //   let allArticles = await this.db.get(id).then(function(doc) {
  //   });
  // }

  // async getAllArticles(id) {
  //   let allArticles = await this.db.get(id).then(function(doc) {
  //   });
  // }

  // updateAnArticle(doc) {
  //   // fetch mittens
  //   db.get('id-goes-here')
  //     .then(function(doc) {
  //       // update their age
  //       doc.age = 4;
  //       // put them back
  //       return db.put(doc);
  //     })
  //     .then(function() {
  //       // fetch mittens again
  //       return db.get('id-goes-here');
  //     })
  //     .then(function(doc) {
  //     });
  // }

  // USER METHODS
  //   async addUser(obj) {
  //     let user = {
  //       _id: new Date().toISOString(),
  //       email: obj.email,
  //       password: obj.password,
  //       // goals: {
  //       //   goalId: obj.goal.id,
  //       //   title: obj.goal.title,
  //       //   articles: [].concat(obj.goals.articleUrl),
  //       //   completed: false
  //       // }
  //     };
  //     this.db.put(user).then(function(err, result) {
  //       if (!err) {
  //         console.log('Successfully added a user!');
  //       }
  //     });
  //   }
}
