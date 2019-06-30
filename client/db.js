import PouchDB from 'pouchDB';

export default class DB{
  constructor(name){
    // set up the remote pouchdb and local and sync
    const remotedb = new PouchDB(`http://admin:graceHopper@localhost:5984/${name}`)
    console.log ("Remote database created Successfully.");
    this.db = new PouchDB(name, { skip_setup: true });
    console.log ("Local database created Successfully.");
    this.db.sync(remotedb, {
      live: true,
      retry: true
    })
  }

  // async getAllArticles(){
  //   let allArticles = await this.db.allArticles({include_docs: true})
  //   let articles = {}
  //
  //   allArticles.rows.forEach(a => articles[a.id] = a.doc)
  //   return artices
  // }

  async addArticles(obj){
    let addedArticle = await this.db.put(obj)
  }

  async getAllArticles(id){
    let allArticles = await this.db.get(id).then(function(doc){
      console.log(doc)
    })
  }

  async updateAnArticle(doc){
    // fetch mittens
    db.get('id-goes-here').then(function (doc) {
      // update their age
      doc.age = 4;
      // put them back
      return db.put(doc);
    }).then(function () {
      // fetch mittens again
      return db.get('id-goes-here');
    }).then(function (doc) {
      console.log(doc);
    });
  }
}
