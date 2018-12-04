import React, {Component} from 'react';
import {Carousel,NavBar,Icon, Badge,List,Card} from "antd-mobile";
import {CustomIcon} from "../assets/fonts/iconfont/CustomIcon";

class GoodsDetailContainer extends Component {

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
            <div  id="goods-detail">
                <NavBar
                    className="nav-block"
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon  type="ellipsis" />,
                    ]}
                >
                    <div className="item">商品</div>
                    <div className="item">详情</div>
                    <div className="item">评价</div>
                </NavBar>
                <div className="info-block">
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
                                    style={{ width: '100%', verticalAlign: 'top',height:'200px' }}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            ))}
                        </Carousel>
                    </div>
                    <div className="goods-info">
                        <div className="name">xxxxxxxxx</div>
                        <div className="intro">xxxxxxxxx</div>
                        <div className="info-block">
                            <div className="price">
                                ￥ <span>1999.9</span>
                            </div>
                            <div className="number">
                                <div className="stock">
                                    999
                                </div>
                                <div className="view">
                                    999
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="list-block">
                        <List>
                            <div className="attr-block">
                                <div className="name">规格</div>
                                <List.Item
                                    arrow="horizontal"
                                >购买属性</List.Item>
                            </div>

                        </List>
                    </div>

                    <div className="list-block">
                        <List>
                            <List.Item
                                arrow="horizontal"
                            >规格</List.Item>
                        </List>
                        <List>
                            <List.Item
                                arrow="horizontal"
                                onClick={()=>{
                                    alert(13)
                                }}
                            >产品参数</List.Item>
                        </List>
                    </div>

                    <div className="list-block">
                        <List>
                            <List.Item
                                arrow="horizontal"
                            >商品评价</List.Item>
                            <List.Item className="comment-list">
                                <Card>
                                    <Card.Header
                                        title="用户昵称"
                                        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                                        extra={<span>2018-12-1</span>}
                                    />
                                    <Card.Body>
                                        <div>This is content of `Card`</div>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header
                                        title="用户昵称"
                                        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                                        extra={<span>2018-12-1</span>}
                                    />
                                    <Card.Body>
                                        <div>This is content of `Card`</div>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header
                                        title="用户昵称"
                                        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                                        extra={<span>2018-12-1</span>}
                                    />
                                    <Card.Body>
                                        <div>This is content of `Card`</div>
                                    </Card.Body>
                                </Card>
                            </List.Item>
                        </List>
                    </div>

                </div>
                <div id="goods-foot">
                    <div className="item coll">
                        <CustomIcon type={require('../assets/fonts/iconfont/star.svg')}/>
                        收藏
                    </div>
                    <div className="item cart">
                        <Badge
                            text={99}
                        >
                            <CustomIcon type={require('../assets/fonts/iconfont/cart.svg')}/>
                        </Badge>
                        购物车
                    </div>
                    <div className="item add-cart">
                        加入购物车
                    </div>
                    <div className="item buy">
                        立即购买
                    </div>
                </div>
            </div>
        );
    }
}

export default GoodsDetailContainer;