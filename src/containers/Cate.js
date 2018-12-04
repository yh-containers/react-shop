import React, {Component, Fragment} from 'react';
import { Tabs } from 'antd-mobile';
import {Card} from "antd-mobile/lib/card";
import GoodsList from "../components/GoodsList";

class CateContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tabs: []
        }
    }

    componentDidMount() {
        var tabs = [];
        for(let i=0;i<20;i++){
            tabs.push({title:'分类'+i})
        }
        this.setState({
            tabs:tabs
        })
    }

    render() {
        return (
            <Fragment>
                <Tabs
                    tabs={this.state.tabs}
                    tabBarPosition="left"
                    tabDirection="vertical"
                    prerenderingSiblingsNumber={3}
                    swipeable={true}
                    renderTabBar={props => (
                              <Tabs.DefaultTabBar
                                  prefixCls="am-tabs-default-bar"
                                  {...props}
                                  page={10}
                                  renderTab ={(tab)=>(
                                      <div className="cate-page tab-name">
                                          {tab.title}
                                      </div>
                                  )}
                              />
                              )}
                >
                    <div className="cate-page-content">
                            <GoodsList showView={false}/>
                            <GoodsList showView={false}/>
                            <GoodsList showView={false}/>
                            <GoodsList showView={false}/>
                            <GoodsList showView={false}/>
                            <GoodsList showView={false}/>
                            <GoodsList showView={false}/>
                            <GoodsList showView={false}/>
                    </div>
                    <div className="cate-page-content">2</div>
                    <div className="cate-page-content">3</div>
                    <div className="cate-page-content">4</div>
                    <div className="cate-page-content">5</div>
                    <div className="cate-page-content">6</div>
                    <div className="cate-page-content">7</div>
                </Tabs>

            </Fragment>
        );
    }
}

export default CateContainer;