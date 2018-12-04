import React, {Component, Fragment} from 'react';
import { Carousel,Card } from 'antd-mobile';
import IndexSlice from "./Index.slice";
import GoodsList from "../components/GoodsList";

import {axiosInstance} from '../axios.service'

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

    componentDidMount()
    {

        axiosInstance.get("goods/listData")
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
                        title="热门商品"
                    />
                    <Card.Body className="mod-card-padding">
                        <div className="goods-block hot-goods">
                            <GoodsList/>
                            <GoodsList/>
                            <GoodsList/>
                        </div>
                    </Card.Body>
                </Card>



            </Fragment>
        );
    }
}

export default IndexContainer;