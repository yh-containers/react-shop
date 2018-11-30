import React, {Component, Fragment} from 'react';
import { Flex } from 'antd-mobile';
import Foot from "../components/Foot";
import { renderRoutes } from 'react-router-config'

class RootContainer extends Component {
    render() {
        //路由组件获取
        var {route}= this.props

        return (
            <Fragment>
                <Flex direction="column">
                    <Flex.Item className="content">
                        {renderRoutes(route.routes)}
                    </Flex.Item>
                    <Flex.Item className="foot">
                        <Foot/>
                    </Flex.Item>
                </Flex>
            </Fragment>
        );
    }
}

export default RootContainer;