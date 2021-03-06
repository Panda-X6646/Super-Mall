<template>
  <div id="cart-list-item">
    
    <!-- 选中商品 -->           
    <div class="item-selector">
      <!--  v-model="itemInfo.checked" -->
      <check-button :is-check="itemInfo.check" @click.native="checkedChange"/>
    </div>

    <!-- 商品图片 -->
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>

    <!-- 商品结算信息 -->
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.realPrice}}</div>
        <div class="item-count right">

          <button class="increment" @click="add_count(itemInfo.id)">+</button>
          <div class="count">{{itemInfo.count}}</div>
          <button class="decrement" @click="reduce_count(itemInfo.id)" :disabled="isDisabled">-</button>

        </div>
        
      </div>
    </div>
  </div>
</template>

<script>

  // 选中商品进行价格结算的组件
  import CheckButton from 'components/content/checkButton/CheckButton'


  export default {
    props: {
      itemInfo: {
        type: Object,
        default () {
          return {}
        }
      }
    },

    components: {
      CheckButton
    },

    methods: {

      checkedChange () {
        this.itemInfo.check = !this.itemInfo.check;
      },


      // 点击购物车里的某件商品的加号
      add_count (id) {

        this.$store.commit('ClickCountAdd', id)

      },

      // 点击购物车里的某件商品的减号
      reduce_count (id) {
        this.$store.commit('ClickCountReduce', id)
      }
    },
    computed : {

      // 当某件商品的数量为一时，不可点击减号
      isDisabled () {

        // 需要用到当前点击到的商品的id，所以不用getters
        return this.$store.state.shoppingCartGoodsInfo.find( value =>  value.id == this.itemInfo.id).count == 1
      }
    },

    
    
  }
</script>

<style scoped>
#cart-list-item {
    display: flex;
    width: 100%;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-title{
    font-weight: 600;
  }

  .item-title, 
  .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    display: block;
    width: 80px;
    height: 100px;
    border-radius: 5px;
  }

  .item-info {
    position: relative;
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 13px;
    color: #666;
    margin-top: 10px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    padding-left: 35px;
    color: #f40;
  }
  .item-count{
    display:flex;
    justify-content: center;
    height: 20px;
  }
  .decrement, 
  .increment,
  .count {
    height: 20px;
    width: 20px;
    text-align: center;
    line-height: 20px;
  }
  .decrement{
    line-height: 16px;
  }
  .count{
    width: 45px;
  }

</style>