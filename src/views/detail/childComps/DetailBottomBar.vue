<template>
<!-- 商品页的加入购物车组件 -->
  <div class="bottom-bar">

    <div class="bar-item bar-left">

      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>

      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>

      <div @click="selectClick">
        <i class="icon select" :class="{active:isSelect}"></i>
        <span class="text">收藏</span>
      </div>


    </div>

    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>

    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isSelect: false
      }
    },

    methods: {

      addToCart () {
        this.$emit('addGoodToCart');
      },

      selectClick () {

        this.isSelect = this.isSelect ? false : true;
      }
    }
    
  }
</script>

<style scoped>


  .bottom-bar {
    height: 49px;
    position: fixed;
    background-color: #fff;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    text-align: center;
  }
   .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item>div {
    flex: 1;
  }

  .bar-left .text {
    font-size: 13px;
  }

  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 3px;
    background: url("~assets/images/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .service {
    background-position:0 -52px;
  }

  .bar-left .shop {
    background-position:0 -98px;
  }


  .bottom-bar .bar-left .active{
    background-position:0 -27px;
  }

  .bar-right {
    
    line-height: 49px;
    font-size: 17px;
    font-family: '宋体';
    font-weight: 600;
    color: #fff;
  }

  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }


  .bar-right .buy {
    background-color: #f40;
  }
</style>