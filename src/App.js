import React, {Component, Fragment} from 'react';
import './App.css';
import IndexContainer from "./containers/Index";
import {Flex} from "antd-mobile/lib/flex";
import Foot from "./components/Foot";

class App extends Component {
  render() {
    return (

      <Fragment>
          <Flex direction="column">
              <Flex.Item className="content">
                  {this.props.children}
              </Flex.Item>
              <Flex.Item className="foot">
                  <Foot/>
              </Flex.Item>
          </Flex>
      </Fragment>
    );
  }
}

export default App;
