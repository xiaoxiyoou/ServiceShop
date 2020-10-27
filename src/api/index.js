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
// 广告bannner
export const getAdver = (params) => ajax(BASE_URL + 'api/adver/getlist',params) 
// 获取完成订单详情
export const orderShow = (params) => ajax(BASE_URL + 'api/order/show',params) 
// 获取订单列表：
export const orderList = (params) => ajax(BASE_URL + 'api/order/getlist',params) 
// 积分接口：
export const score = (params) => ajax(BASE_URL + 'api/user/score',params) 
// 积分列表：
export const scorelist = (params) => ajax(BASE_URL + 'api/user/scorelist',params) 
// 获取采购商品品牌接口
export const wareCate = (params) => ajax(BASE_URL + 'api/wares/brand',params) 
// 获取采购商品接口
export const wareList = (params) => ajax(BASE_URL + 'api/wares/list',params) 
// 获取采购商品接口
export const joinSubmit = (params) => ajax(BASE_URL + 'api/wares/join',params,'POST') 
// 产品询价提交接口：
export const Inquiry = (params) => ajax(BASE_URL + 'api/wares/Inquiry',params,'POST') 