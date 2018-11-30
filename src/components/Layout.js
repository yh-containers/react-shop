import React, {Component, Fragment} from 'react';
import { Flex } from 'antd-mobile';
import Foot from "./Foot";

class Layout extends Component {
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

export default Layout;