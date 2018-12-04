import React, {Component, Fragment} from 'react';
import { NavBar,Checkbox,List,Stepper,Button} from "antd-mobile";
import {Link} from "react-router-dom";

const CheckboxItem = Checkbox.CheckboxItem;

/*结算*/
const Balance = ()=>{
    return (
        <div className="info">
            <div className="name">全选</div>
            <div className="container">
                <div className="name">合计:</div>
                <div className="price">￥1999.99</div>
            </div>
            <Button type="warning">去结算(99)</Button>
        </div>
    )
}

/*编辑*/
const Edit = ()=>(
    <div className="info btn-edit">
        <div className="name">全选</div>
        <div className="container">
            <Button type="primary" size="small">收藏</Button>
            <Button type="warning" size="small">删除</Button>
        </div>
    </div>
)


class CartContainer extends Component {
    static defaultProps = {
        listOpt:[[<Balance/>,'管理'],[<Edit/>,'完成']],

    }
    constructor(props) {
        super(props);
        this.state = {
            val: 3,
            currentOptIndex:0,
            currentOpt:[],
        };
    }
    componentDidMount(){
        var currentOpt = this.props.listOpt[this.state.currentOptIndex]
        this.setState({
            currentOpt: currentOpt,
            currentOptIndex:1,
        })
    }
    onChange = (val) => {
        // console.log(val);
        this.setState({ val });
    }
    handleOptBtn(index){
        console.log(index)
        switch (index) {
            case 1:
                return this.setState({
                    currentOpt:this.props.listOpt[index],
                    currentOptIndex:0,
                })
            default:
                return this.setState({
                    currentOpt:this.props.listOpt[index],
                    currentOptIndex:1,
                })
        }

    }
    render() {
        const data = [
            { value: 0, label: 'Ph.D.' },
            { value: 1, label: 'Bachelor' },
            { value: 2, label: 'College diploma' },
        ];
        return (
            <div id="cart-page">
                <NavBar
                    className="nav-block"
                    mode="light"
                    rightContent={[
                        (<div key="0" onClick={this.handleOptBtn.bind(this,this.state.currentOptIndex)}>{this.state.currentOpt[1]}</div>),
                    ]}
                >
                    购物车
                </NavBar>
                <div className="goods-cart-block">
                    <List
                    className="goods-slice"
                    arrow="horizontal"
                    renderHeader={() => (
                        <CheckboxItem className="overlay-checkbox" arrow="horizontal">
                            xxxx
                        </CheckboxItem>
                    )}>
                    {data.map(i => (
                        <CheckboxItem key={i.value}  className="overlay-checkbox">
                            <div className="goods-block">

                                <Link to={"/goods-detail/"}>
                                    <img src={require('../assets/images/flow-index3.png')} alt=""/>
                                </Link>

                                <div className="info">
                                    <Link to={"/goods-detail/"}>
                                        <div className="name">
                                                    name
                                        </div>
                                    </Link>

                                    <div className="attr">attr attr</div>
                                        <div className="view">
                                            <div className="price">￥198.99</div>
                                            <Stepper
                                                showNumber
                                                max={10}
                                                min={1}
                                                value={this.state.val}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </div>

                            </div>
                        </CheckboxItem>
                    ))}

                </List>
                    <List
                    className="goods-slice"
                    arrow="horizontal"
                    renderHeader={() => (
                        <CheckboxItem className="overlay-checkbox" arrow="horizontal">
                            xxxx
                        </CheckboxItem>
                    )}>
                    {data.map(i => (
                        <CheckboxItem key={i.value}  className="overlay-checkbox">
                            <div className="goods-block">

                                <Link to={"/goods-detail/"}>
                                    <img src={require('../assets/images/flow-index3.png')} alt=""/>
                                </Link>

                                <div className="info">
                                    <Link to={"/goods-detail/"}>
                                        <div className="name">
                                                    name
                                        </div>
                                    </Link>

                                    <div className="attr">attr attr</div>
                                        <div className="view">
                                            <div className="price">￥198.99</div>
                                            <Stepper
                                                showNumber
                                                max={10}
                                                min={1}
                                                value={this.state.val}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </div>

                            </div>
                        </CheckboxItem>
                    ))}

                </List>
                </div>

                <CheckboxItem className="handle-block">
                    {this.state.currentOpt[0]}
                </CheckboxItem>
            </div>
        );
    }
}

export default CartContainer;