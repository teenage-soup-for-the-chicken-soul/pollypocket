import React from "react"
import axios from "axios"

import DB from '../db.js'

class App extends React.Component {
 constructor() {
   super();
   this.state = {
     parsed: '',
     stringParsed: false
   };
   this.handleClick = this.handleClick.bind(this);
 }

 componentDidMount() {
    axios.get("http://127.0.0.1:5984/tester/d6e5852b0ed019df0956b4deb4001b14").then(json => this.setState({parsed: json.data.linkUrl}))
 }

 handleClick() {
   let parser = new DOMParser();
   let doc = parser.parseFromString(this.state.parsed, 'text/html');
   console.log('between doc and setstate', doc)
   const bodyElements = doc.getElementsbyTagName('body')
   const innerBody = bodyElements[0].innerHTML
   this.setState({ parsed: innerBody, stringParsed: true });
 }

 render() {
   return this.state.stringParsed ? (
     <div>{this.state.parsed}</div>
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
