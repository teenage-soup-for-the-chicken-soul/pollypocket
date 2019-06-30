
import React,{Component} from "react"
import axios from "axios"
import renderHTML from "react-render-html";
import DB from '../db.js'

class App extends React.Component {
 constructor() {
   super();
   this.state = {
     db: new DB("alice2"),
     parsed: '',
     stringParsed: false
   };
   this.handleClick = this.handleClick.bind(this);
 }

  componentDidMount() {
    // axios
    //   .get("http://127.0.0.1:5984/body_test/2ca86a060aeb361568fd28b4c6008e01")
    //   .then(json => this.setState({ parsed: json.data.linkUrl }));

    // this.state.db.getAllArticles("2ca86a060aeb361568fd28b4c600abd1")
  }

  handleClick() {
    this.setState({ stringParsed: true });
    this.state.db.getAllArticles("2ca86a060aeb361568fd28b4c600abd1")
  }

  render() {
    return this.state.stringParsed ? (
      <div>{renderHTML(this.state.parsed)}</div>
    ) : (
      <div>
        <button type="button" onClick={() => this.handleClick()}>
          CLICK HERE TO RENDER
        </button>
      </div>
    );
  }
}

export default App;
