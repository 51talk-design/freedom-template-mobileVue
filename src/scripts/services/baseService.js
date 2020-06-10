import axios from 'axios';
const format = require("string-format");
const apiConf = require("../config/apiConf");

/**
 * service基类
 * @class
 */
export class BaseService {

  /**
   * 构造器
   */
  constructor() { }

  /**
   * request请求处理
   * @param {string} urlKey 请求url或者请求url的conf的配置key值
   * @param {string} method http请求谓词，比如：Get、Post、Put等
   * @param {string | object} data 请求数据，string或者object类型
   * @param {object} option 可配置项，目前提供headers的配置
   *  {
   *    headers:{}
   *  }
   * @param {boolean} isHandle 是否需要处理接口返回的数据，true表示处理，false表示不处理，默认为true
   * @return {object} 返回执行后的结果
   */
  invoke(urlKey, method, data, option, isHandle = true) {
    let _this = this;
    option = option || {};
    let headers = {
      'content-type': 'application/json;charset=UTF-8'
    };
    if (option.headers) headers = option.headers;
    let ajaxSetting = {
      url: _this.getRequestApiUrl(urlKey),
      method: method,
    };
    if (method.toLocaleLowerCase() == "get") {
      ajaxSetting.params = data;
    } else {
      ajaxSetting.data = data;
    }
    return new Promise((resolve, reject) => {
      axios.request(ajaxSetting).then(function (result) {
        if (!isHandle) {
          resolve(result.data);
          return;
        }
        (async function () {
          let handleResult = await _this._handleResponse(result.data);
          if (handleResult) {
            if (!handleResult.errorCode) resolve(handleResult);
          } else {
            resolve(handleResult);
          }
        })();
      }).catch(function (error) {
        (async function () {
          let handleResult = await _this._handleResponse({
            errorCode: 500,
            message: "网络繁忙，请稍后再试"
          });
          if (handleResult) {
            if (!handleResult.errorCode) resolve(handleResult);
          } else {
            resolve(handleResult);
          }
        })();
      });
    });
  }

  /**
   * 处理接口返回的响应数据
   * @param {object} responseData 接口返回的响应数据
   * @return {object} 返回处理后的数据结果
   */
  async _handleResponse(responseData) {
    if (responseData.errorCode) {
      return responseData;
    } else {
      return responseData;
    }
  }

  /**
   * 获取请求api地址
   * @param {string} urlKey api对应的key
   * @return {string} 返回要请求的api地址
   */
  getRequestApiUrl(urlKey) {
    //简单正则，判断是否是完整的url，如果是完整的url，则直接返回
    let regExp = /^\/api\/.*/gi;
    if (regExp.test(urlKey)) return `${urlKey}`;
    return `${apiConf[urlKey]}`;
  }
  /**
   * 获取请求api完整的地址
   * @param key api对应的key
   * @param fields api需要替换的字段
   * @return {string} 返回api完整请求地址
   */
  getRequestFullApiUrl(key, ...fields) {
    let apiUrl = this.getRequestApiUrl(key);
    return format(...[apiUrl].concat(...fields));
  }
}