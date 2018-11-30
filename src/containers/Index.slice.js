import React, {Component, Fragment} from 'react';
import { Flex } from 'antd-mobile';
class IndexSlice extends Component {

    static defaultProps = {
        data:[
            {
                img:require('../assets/images/flow-index1.png'),
                name:'ICON名称'
            },
            {
                img:require('../assets/images/flow-index1.png'),
                name:'ICON名称'
            },
            {
                img:require('../assets/images/flow-index1.png'),
                name:'ICON名称'
            },
            {
                img:require('../assets/images/flow-index1.png'),
                name:'ICON名称'
            },
        ]
    }

    render() {
        return (
            <Flex
                className = "slice-block"
                justify = "center"
            >
                {this.props.data.map(function(value,index){
                    return (
                        <Flex.Item key={'slick-block'+index}>
                            <img src={value.img} alt=""/>
                            <span>{value.name}</span>
                        </Flex.Item>
                    )
                })}

            </Flex>
        );
    }
}

export default IndexSlice;