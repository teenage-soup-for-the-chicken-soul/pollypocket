import React from "react";

class DomTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parsed: null
    };
  }

  componentDidMount() {
    var newDiv = document.createElement("div");
    newDiv.innerHTML = this.props.currParsed
    this.setState({parsed:newDiv})
  }

  render() {
    console.log("in the render", this.state.parsed);
    return this.state.parsed
  }
}

export default DomTest;
