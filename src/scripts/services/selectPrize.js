import BaseService from "./baseService";

/**
 * 接口
 * @class
 * @extends {BaseService}
 */
export default class Services extends BaseService {
  /**
   * 构造器，初始化相关信息
   */
  constructor() {
    super();
  }
  /**
   * 获取奖品列表
   */
  async getPrizes() {
    return await this.invoke("prizeList", "get");
  }
  /**
   * 选择奖品
   */
  async selectPrize(data) {
    return await this.invoke("userSelectionPrize", "post", data);
  }
}
