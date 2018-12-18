import IndexContainer from "../containers/Index";
import CartContainer from "../containers/Cart";
import CateContainer from "../containers/Cate";
import MineContainer from "../containers/Mine";
import RootContainer from "../containers/Root";
import GoodsDetailContainer from "../containers/GoodsDetail";
import LoginContainer from "../containers/Login";
import OrderPreviewContainer from "../containers/OrderPreview";
import AddressContainer from "../containers/Address";
import AddressOptContainer from "../containers/AddressOpt";
import PayContainer from "../containers/Pay";
import OrderListContainer from "../containers/OrderList";
import OrderDetailContainer from "../containers/OrderDetail";

export  const routes = [

    {
        path:'/login',
        exact:true,
        strict:true,
        component: LoginContainer
    },
    {
        path:'/goods-detail/:id',
        exact:true,
        strict:true,
        component: GoodsDetailContainer
    },
    {
        path:'/order-preview/:info(goods_info/\\d+-\\d+)?/:addr(address/\\d+)?',    //路由匹配 goods_id-attr_id
        exact:true,
        strict:true,
        component: OrderPreviewContainer
    },
    {
        path:'/pay/:order_id(\\d+[_\\d+]?)?',
        exact:true,
        strict:true,
        component: PayContainer
    },

    {
        path:'/address',
        exact:true,
        strict:true,
        component: AddressContainer
    },
    {
        path:'/address-opt/:id(\\d+)?',
        exact:true,
        strict:true,
        component: AddressOptContainer
    },
    {
        path:'/order-list/:initial_page(\\d+)?',
        exact:true,
        strict:true,
        component: OrderListContainer
    },
    {
        path:'/order-detail/:id(\\d+)?',
        exact:true,
        strict:true,
        component: OrderDetailContainer
    },
    {
        path:'/',
        component:RootContainer,
        routes:[
            {
                path:'/',
                exact:true,
                component: IndexContainer
            },
            {
                path:'/Cart',
                exact:true,
                component: CartContainer
            },
            {
                path:'/Cate',
                exact:true,
                component: CateContainer
            },
            {
                path:'/Mine',
                exact:true,
                component: MineContainer,
            },
        ]
    },

]