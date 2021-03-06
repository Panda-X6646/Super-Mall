<template>
    <div id="hy-swiper">
      <div class="swiper" ref="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <slot></slot>
      </div>
      <!-- <slot name="indicator">
      </slot> -->
      <div class="indicator">
        <slot name="indicator" v-if="showIndicator && slideCount>1">
          <div v-for="(item, index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}" :key="index"></div>
        </slot>
      </div>
    </div>
</template>

<script>
	export default {
		name: "Swiper",
    props: {

      // 图片轮播的时间间隔
      interval: {
		    type: Number,
        default: 3000
      },

      // 每张图片轮播的时间
      animDuration: {
		    type: Number,
        default: 300
      },

      // 滑动轮播图时，图片滑动的距离与屏幕的宽度比
      moveRatio: {
        type: Number,
        default: 0.25
      },

      // 控制图片下的小圆点是否展示
      showIndicator: {
        type: Boolean,
        default: true
      }
    },
    data: function () {
		  return {
        slideCount: 0,     // 图片的张数
        totalWidth: 0,     // swiper的宽度
        swiperStyle: {},   // swiper样式
        currentIndex: 1,   // 当前图片的索引
        scrolling: false,  // 是否正在滚动
      }
    },
    mounted: function () {
      setTimeout(() => {

      // 操作DOM, 在最前和最后添加Slide（Slide元素的个数不为一的情况下），添加后默认展示索引位为0的元素添加的元素
        this.handleDom();

        // 开启定时器
        this.startTimer();
      }, 3000)
    },
    methods: {

      // 定时轮播操作
      startTimer: function () {
		    this.playTimer = window.setInterval(() => {

          this.currentIndex++;
          
          // 元素滚动
          this.scrollContent(-this.currentIndex * this.totalWidth);
          
        }, this.interval)
      },






      // 清除定时器
      stopTimer: function () {
        window.clearInterval(this.playTimer);
      },







      //  元素滚动
      scrollContent: function (currentPosition) {

        // 开启滚动
        this.scrolling = true;

        // 1.开始滚动动画
        this.swiperStyle.transition ='transform '+ this.animDuration + 'ms';
        this.setTransform(currentPosition);

        // 2.判断滚动到的位置
        this.checkPosition();

        // 4.滚动完成
        this.scrolling = false
      },







      // 索引越界进行回正元素
      checkPosition: function () {
        window.setTimeout(() => {

          // 右越界
          this.swiperStyle.transition = '0ms';
          if (this.currentIndex >= this.slideCount + 1) {
            this.currentIndex = 1;
            this.setTransform(-this.currentIndex * this.totalWidth);

            // 左越界
          } else if (this.currentIndex <= 0) {
            this.currentIndex = this.slideCount;
            this.setTransform(-this.currentIndex * this.totalWidth);
          }

          // 2.结束移动后的回调
          // this.$emit('transitionEnd', this.currentIndex-1);
        }, this.animDuration)
      },




      // 滚动函数，并兼容浏览器
      setTransform: function (position) {
        this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
        this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
        this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
      },






      // 获取并操作DOM
      handleDom: function () {

        // 获取轮播运动的元素
        let swiperEl = this.$refs.swiper;
        let slidesEls = swiperEl.getElementsByClassName('slide');

        // 保存需要轮播的图片的张数
        this.slideCount = slidesEls.length;

        // 如果大于1个, 那么在前后分别添加一个slide
        if (this.slideCount > 1) {
          let cloneFirst = slidesEls[0].cloneNode(true);
          let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
          swiperEl.insertBefore(cloneLast, slidesEls[0]);
          swiperEl.appendChild(cloneFirst);
          this.totalWidth = swiperEl.offsetWidth;
          this.swiperStyle = swiperEl.style;

        }

        // 让swiper元素,并显示第一个(目前是显示前面添加的最后一个元素)
        this.setTransform(-this.totalWidth);
      },




      // 滑屏事件的处理
      touchStart: function (e) {

        // 元素正在滚动, 不可以拖动
        if (this.scrolling) return;

        // 2.清除定时器
        this.stopTimer();

        // 3.保存开始滚动的位置
        this.startX = e.touches[0].pageX;
      },




      touchMove: function (e) {

        // 1.计算出用户拖动的距离
        this.currentX = e.touches[0].pageX;
        this.distance = this.currentX - this.startX;
        let currentPosition = -this.currentIndex * this.totalWidth;
        let moveDistance = this.distance + currentPosition;

        // 2.设置当前的位置
        this.setTransform(moveDistance);
      },



      touchEnd: function (e) {
        // 1.获取移动的距离
        let currentMove = Math.abs(this.distance);

        // 2.判断最终的距离
        if (this.distance === 0) {
          return
        } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) { // 右边移动超过0.5
          this.currentIndex--
        } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) { // 向左移动超过0.5
          this.currentIndex++
        }

        // 让元素滚动
        this.scrollContent(-this.currentIndex * this.totalWidth);

        // 4.移动完成后重新开启定时器
        this.startTimer();
      },



      /**
       * 控制上一个, 下一个
       */
      // previous: function () {
      //   this.changeItem(-1);
      // },

      // next: function () {
      //   this.changeItem(1);
      // },

      // changeItem: function (num) {
      //   // 1.移除定时器
      //   this.stopTimer();

      //   // 2.修改index和位置
      //   this.currentIndex += num;
      //   this.scrollContent(-this.currentIndex * this.totalWidth);

      //   // 3.添加定时器
      //   this.startTimer();
      // }
    }
	}
</script>

<style scoped>
  #hy-swiper {
    overflow: hidden;
    position: relative;
  }

  .swiper {
    display: flex;
  }

  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }

  .indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }

  .indi-item.active {
    background-color: rgba(212,62,46,1.0);
  }
</style>
