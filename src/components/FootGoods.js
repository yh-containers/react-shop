import React, {Component, Fragment} from 'react';
import { TabBar,Icon } from 'antd-mobile';
class FootGoods extends Component {
    render() {
        return (
            <TabBar>
                <TabBar.Item
                    title="收藏"
                />
                <TabBar.Item
                    icon={
                        <Icon type="check"/>
                    }
                    title="购物车"
                />
                <TabBar.Item
                    icon={

                    }
                    title="加入购物车"
                />
                <TabBar.Item
                    title="购买"
                />

            </TabBar>
        );
    }
}

export default FootGoods;