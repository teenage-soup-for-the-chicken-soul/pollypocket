import PouchDB from 'pouchDB';

export default class DB{
  constructor(name){
    // set up the remote pouchdb and local and sync
    const remotedb = new PouchDB(`http://admin:graceHopper@localhost:5984/${name}`)
    this.db = new PouchDB(name)
    this.db.sync(remotedb, {
      live: true,
      retry: true
    })
  }

  async getAllArticles(){
    let allArticles = await this.db.allArticles({include_docs: true})
    let articles = {}

    allArticles.rows.forEach(a => articles[a.id] = a.doc)
    return artices
  }
}
