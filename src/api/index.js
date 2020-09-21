import ajax from './ajax'

// 1. 定义基础路径

const BASE_URL = 'http://jfmall.app.fuyulove.com/'

// 获取用户基本信息
export const userInfo = (params) => ajax(BASE_URL + 'api/user/self',params)
// 获取商品分类接口
export const cate = (params) => ajax(BASE_URL + 'api/goods/cate',params,'POST')
// 获取商品积分区间接口
export const sear = (params) => ajax(BASE_URL + 'api/goods/sear',params,'POST')
// 获取商品列表接口
export const list = (params) => ajax(BASE_URL + 'api/goods/list',params)
// 获取商品详情接口
export const detail = (params) => ajax(BASE_URL + 'api/goods/detail',params) 
// 发送验证码
export const getSendCode = (params) => ajax(BASE_URL + 'api/user/sendcode',params) 
// 绑定手机号码：
export const sendPhoneBound = (params) => ajax(BASE_URL + 'api/user/bindmobile',params) 
// 保存用户的修改基本信息
export const saveself = (params) => ajax(BASE_URL + 'api/user/saveself',params,'POST')
 // 兑换接口：
export const buy = (params) => ajax(BASE_URL + 'api/goods/buy',params) 