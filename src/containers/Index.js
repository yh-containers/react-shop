import React, {Component, Fragment} from 'react';
import { Carousel,Card } from 'antd-mobile';
import IndexSlice from "./Index.slice";
import GoodsListContainer from "./GoodsList";

class IndexContainer extends Component {


    constructor(props) {
        super(props)
        this.state={
            images: {
                imgHeight: 176,
                data:[
                {
                    title:'one',
                    url :require('../assets/images/flow-index1.png')
                },
                {
                    title:'two',
                    url :require('../assets/images/flow-index2.png')
                },
                {
                    title:'three',
                    url :require('../assets/images/flow-index3.png')
                }]
            },
        }
    }

    render() {
        return (
            <Fragment>
                <div>
                    <Carousel
                        autoplay={true}
                        infinite={true}
                    >
                        {this.state.images.data.map((val,index) => (

                            <img
                                key ={'flow-img'+index}
                                src={val.url}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        ))}
                    </Carousel>
                </div>

                <IndexSlice/>

                <Card>
                    <Card.Header
                        title="This is title"
                        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                        extra={<span>this is extra</span>}
                    />
                    <Card.Body>
                        <div>This is content of `Card`</div>
                    </Card.Body>
                    <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
                </Card>
                <GoodsListContainer/>
            </Fragment>
        );
    }
}

export default IndexContainer;