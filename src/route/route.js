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
        path:'/order-preview/:info(\\d+-\\d+)?',    //路由匹配 goods_id-attr_id
        exact:true,
        strict:true,
        component: OrderPreviewContainer
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