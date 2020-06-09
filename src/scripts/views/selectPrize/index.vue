<template>
  <div class="prize-container">
    <ul class="prize-list-container">
      <li
        v-for="item in prizes"
        class="prize-item"
        :style="{backgroundImage: `url(${item.prize_img})`}"
        @click="selectPrize(item.id, item.type)"
      >
        <span class="prize-name">{{item.type_cn}}</span>
        <span class="prize-num">
          {{item.value}}
          <span class="unit" v-show="item.type == 'red_pack'">元</span>
          <span class="unit" v-show="item.type == 'point'">次</span>
        </span>
        <span class="selected-icon" v-show="currPrize === item.id"></span>
        <p class="description">{{item.prize_desc}}</p>
      </li>
    </ul>
    <div class="btn-container">
      <div :class="{selected: currPrize !== ''}" class="confirm-btn" @click="submitPrize">确定</div>
    </div>
  </div>
</template>

<script>
import SelectPrizeServices from "@/services/selectPrize";
let selectPrizeServices = new SelectPrizeServices();
export default {
  data() {
    return {
      prizeurl:
        "//cdn.51talk.com/apollo/images/1e7cff9d22898684385cba30496819ff.png",
      cardurl:
        "//cdn.51talk.com/apollo/images/392e8f79aee8868bddfecd14066aa656.png",
      currPrize: "",
      currPrizeType: "",
      prizes: []
    };
  },
  created() {
    this.getPrizes();
  },
  methods: {
    /**
     * 获取奖品列表
     */
    async getPrizes() {
      let res = await selectPrizeServices.getPrizes();
      this.prizes = res.data;
      return res;
    },
    /**
     * 提交奖品信息
     */
    async submitPrize() {
      if (this.currPrize === "") return;
      let params = {
        prize_id: this.currPrize,
        type: this.currPrizeType
      };
      let res = await selectPrizeServices.selectPrize(params);
      if (res.status == 10000) {
        this.$toast("模板演示完毕，正式开发时记得删除本页面哦~");
      }
    },
    /**
     * 选择奖品操作
     */
    selectPrize(prizeId, type) {
      this.currPrize = prizeId;
      this.currPrizeType = type;
    }
  }
};
</script>
<style lang="less">
@import "./index.less";
</style>