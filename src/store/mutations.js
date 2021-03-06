import {ADD_COUNT, ADD_TO_CART} from './mutation_types'
                


export default {
  [ADD_TO_CART] (state, payload) {

    // 定义该商品的数量和在购物车中默认选中
    payload.count = 1;
    payload.check = true;
  // 没有相同的数据就添加商品
  state.shoppingCartGoodsInfo.push(payload);
  },

  [ADD_COUNT] (state, payload) {
  
    // 有相同的数据就让在context.shoppingCartGoodsInfo找到的商品数量加一,
    payload.count++;
  },


  // 点击了商品数量减一
  ClickCountAdd (state, id) {

    
    state.shoppingCartGoodsInfo.find( value =>  value.id == id).count ++
    
  },
  
  // 点击了商品数量减一
  ClickCountReduce (state, id) {

    
    state.shoppingCartGoodsInfo.find( value =>  value.id == id).count --
  }
}