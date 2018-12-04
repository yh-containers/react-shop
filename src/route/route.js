import IndexContainer from "../containers/Index";
import CartContainer from "../containers/Cart";
import CateContainer from "../containers/Cate";
import MineContainer from "../containers/Mine";
import RootContainer from "../containers/Root";
import GoodsDetailContainer from "../containers/GoodsDetail";

export  const routes = [

    {
        path:'/goods-detail/:id',
        exact:true,
        strict:true,
        component: GoodsDetailContainer
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
                component: MineContainer
            },
        ]
    },

]