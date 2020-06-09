<template>
  <div v-show="isShow">
    <gray class="gray"></gray>
    <div class="dialog">
      <div class="dialog_bg">
        <div v-show="type == 'success'">
          <div class="ico_area">
            <div class="ico"><img src="./img/success.png" alt=""></div>
            <div class="ico_txt">领取成功</div>
          </div>
          <div class="content">{{message}}</div>
        </div>
        <div v-show="type == 'fail'">
          <div class="ico_area">
            <div class="ico"><img src="./img/sad.png" alt=""></div>
          </div>
          <div class="content">{{message}}</div>
        </div>
        <div class="success-btn" @click="close">知道了</div>
      </div>
    </div>
  </div>
</template>

<script>
import gray from "@/components/gray/index.vue";
export default {
  data() {
    return {};
  },
  props: {
    isShow: Boolean,
    type: {
      default: "success",
      type: String
    },
    message:String,
    isRedirect:Boolean
  },
  components: {
    gray
  },
  methods: {
    close() {
      this.$emit('close')
      if(this.isRedirect){
        this.$router.push({path: '/'})
      }
      // 跳转到首页（领取成功、已领取、无库存、无领取资格）
    }
  }
};
</script>

<style lang="less" scoped>
.dialog {
  position: absolute;
  top: 27%;
  width: 100%;
  .dialog_bg {
    border-radius: 20px;
    margin: 0 auto;
    min-height: 454px;
    height: 100%;
    width: 620px;
    background-color: white;
    text-align: center;
    .ico_area {
      height: 164px;
      .ico {
        display: inline-block;
        img {
          height: 46px;
          width: 46px;
          padding-bottom: 4px;
          vertical-align: middle;
        }
      }
      .ico_txt {
        display: inline-block;
        vertical-align: middle;
        font-size: 36px;
        color: #49bd36;
      }
    }
    .content {
      margin: 0 auto;
      text-align: left;
      /*padding-top: 65px;*/
      width: 470px;
      font-size: 30px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 51px;
    }
    .success-btn {
      width: 520px;
      height: 88px;
      line-height: 88px;
      margin: 62px auto 56px auto;
      font-size: 30px;
      font-weight: 400;
      color: rgba(42, 42, 42, 1);
      background: rgba(255, 211, 54, 1);
      border-radius: 44px;
    }
  }
}
</style>
