import PouchDB from 'pouchDB';

export default class DB{
  constructor(name){
    this.db = new PouchDB(name)
  }

  async getAllArticles(){
    let allArticles = await this.db.allArticles({include_docs: true})
    let articles = {}

    allArticles.rows.forEach(a => articles[a.id] = a.doc)
    return artices
  }
}
