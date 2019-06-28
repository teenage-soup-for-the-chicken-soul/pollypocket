import React from "react";
import axios from "axios";
import DomTest from "../Components/domTest";
import DB from "../db.js";
import renderHTML from "react-render-html";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      parsed: "",
      stringParsed: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:5984/body_test/2ca86a060aeb361568fd28b4c6008e01")
      .then(json => this.setState({ parsed: json.data.linkUrl }));
  }

  handleClick() {
    this.setState({ stringParsed: true });
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
 