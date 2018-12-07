// import React, {Component} from 'react';
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// import GoodsList from "../components/GoodsList";
//
// import {initCateData,initCateAddDATA} from '../reducers/globalData'
// import {axiosHandleRequest} from "../axios.service";
// import WrapWithAjaxData from "../components/WrapWithAjaxData";
//
// class CateContainer extends Component {
//
//     static propTypes = {
//         cate_data:PropTypes.array,
//         initCateData:PropTypes.func,
//         initCateAddDATA:PropTypes.func,
//     }
//
//     constructor(props) {
//         super(props)
//         this.state = {
//             cate_index_lock : 0,
//             is_check_update : false,
//         }
//     }
//
//     componentDidUpdate(prevProps, prevState){
//         if(this.state.is_check_update===false){
//             let cate_id = this.props.cate_data.length>0?this.props.cate_data[this.state.cate_index_lock]['id']:0
//             this.setState({
//                 is_check_update:true
//             })
//
//             cate_id && this._loadCateGoodsData(this.state.cate_index_lock,cate_id)
//         }
//     }
//
//
//     //加载分类商品数据
//     _loadCateGoodsData(index,cate_id){
//         this.props.cate_data[index].hasOwnProperty('data') || axiosHandleRequest('goods-list-data',{cid:cate_id},(data)=>{
//             this.props.initCateAddDATA(index,data)
//         })
//     }
//
//     handleCateIndexLock(index,cate_id){
//         this.setState({
//             cate_index_lock:index
//         })
//         this._loadCateGoodsData(index,cate_id)
//     }
//
//     render() {
//         var current_data = this.props.cate_data[this.state.cate_index_lock];
//         var data = current_data && current_data.hasOwnProperty('data')?current_data.data:[]
//         return (
//             <div id="cate-page">
//
//                 <ul className="cate-list">
//
//                     {this.props.cate_data.map(function(value,index){
//                         return (
//                             <li
//                                 key={'cate-page-'+index}
//                                 className={index===this.state.cate_index_lock?'active':''}
//                                 onClick={this.handleCateIndexLock.bind(this,index,value.id)}
//                             >{value.name}</li>
//                         )
//                     },this)}
//                 </ul>
//                 <div className="content">
//                     <div className="cate-goods-list">
//
//                         {data.map(function(value,index){
//                             return (
//                                 <GoodsList
//                                     key={'cate-goods-list'+index}
//                                     id={value.id}
//                                     img={value.cover_img}
//                                     name={value.name}
//                                     price={value.price}
//                                     stock={value.stock}
//                                     view={value.view}
//                                 />
//                             )
//                         })}
//                     </div>
//                 </div>
//
//             </div>
//         );
//     }
// }
//
// const mapStateProps = (state)=>{
//     return {
//         cate_data:state.globalData.cate_data,
//     }
// }
//
// const mapDispatchProps = (dispatch)=>{
//     return {
//         initCateData:(cate_data)=>{
//             dispatch(initCateData(cate_data))
//         },
//         initCateAddDATA:(index,goods_list)=>{
//             dispatch(initCateAddDATA(index,goods_list))
//         }
//     }
// }
//
//
// CateContainer = WrapWithAjaxData(CateContainer, [
//     ['goods-cate','initCateData',{},600],
// ])
//
// export default connect(mapStateProps,mapDispatchProps)(CateContainer);