import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
//按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
import Index from '@/views/Index.vue';
// import Chuanyejj from '@/views/chuanyejj.vue';
const map = resolve => require(['@/views/map.vue'], resolve)
const Category = resolve => require(['@/components/category/category.vue'], resolve)
const member = resolve => require(['@/components/area/member.vue'], resolve)
const hot = resolve => require(['@/components/area/hot.vue'], resolve)
const duihuan = resolve => require(['@/components/area/duihuan.vue'], resolve)
// const citypir = resolve => require(['@/components/area/citypir.vue'], resolve)
// const hotspot = resolve => require(['@/components/index/hotspot.vue'], resolve)
const cunpin = resolve => require(['@/components/area/cunpin.vue'], resolve)
//发现页
const found = resolve => require(['@/components/found/found.vue'], resolve)
const indexS = resolve => require(['@/components/index/indexS.vue'], resolve)
const Car = resolve => require(['@/views/Car.vue'], resolve)
const User = resolve => require(['@/views/personaldata.vue'], resolve)
const Detail = resolve => require(['@/views/Detail.vue'], resolve)
const detailNull = resolve => require(['@/views/detailNull.vue'], resolve)
const Ecomarket = resolve => require(['@/views/Ecomarket.vue'], resolve)
const Login = resolve => require(['@/views/login.vue'], resolve)
const register = resolve => require(['@/views/register.vue'], resolve)
const Personaldata = resolve => require(['@/views/personaldata.vue'], resolve)
const Category2 = resolve => require(['@/views/Category2.vue'], resolve)
// 钱包
const wallet = resolve => require(['@/views/wallet.vue'], resolve)
const shipping = resolve => require(['@/views/shipping.vue'], resolve)
const UserErWeiMa = resolve => require(['@/views/UserErWeiMa.vue'], resolve)
const myshop = resolve => require(['@/views/myshop.vue'], resolve)
const msg = resolve => require(['@/views/msg.vue'], resolve)
const msgInfo = resolve => require(['@/views/msgInfo.vue'], resolve)
//创业基金
const fund = resolve => require(['@/components/personal/wallet/fund.vue'], resolve)
//业绩页
const achievement = resolve => require(['@/components/personal/wallet/achievement.vue'], resolve)
//创业基金详情
const fundinfo = resolve => require(['@/components/personal/wallet/fundinfo.vue'], resolve)

//个人资料修改
const Userdata = resolve => require(['@/views/Userdata.vue'], resolve)
//积分页
const point = resolve => require(['@/components/personal/wallet/point.vue'], resolve)
//红包页
const redbag = resolve => require(['@/components/personal/wallet/redbag.vue'], resolve)
//余额页
const remainder = resolve => require(['@/components/personal/wallet/remainder.vue'], resolve)
//提现页
const getCash = resolve => require(['@/components/personal/wallet/getCash.vue'], resolve)
//提现成功页
const getCashSuccess = resolve => require(['@/components/personal/wallet/getCashSuccess.vue'], resolve)
//生态市场搜索页
const ecosearch = resolve => require(['@/views/ecosearch.vue'], resolve)
//生态市场搜索页
const cunpinsearch = resolve => require(['@/views/cunpinsearch.vue'], resolve)
//选择提现卡页
const chooseCar = resolve => require(['@/components/personal/wallet/chooseCar.vue'], resolve)
//银行卡页
const bankCard = resolve => require(['@/components/personal/wallet/bankCard.vue'], resolve)
//添加银行卡页
const addCard = resolve => require(['@/components/personal/wallet/addCard.vue'], resolve)
//添加编辑收获地址页
const editAddress = resolve => require(['@/components/personal/address/editAddress.vue'], resolve)
//添加编辑收获地址页
const shopCenter = resolve => require(['@/components/personal/shopCenter/shopCenter.vue'], resolve)
const wx = resolve => require(['@/views/wx.vue'], resolve)
//售后服务
const replacement = resolve => require(['@/views/replacement/replacement.vue'], resolve)
const exchange = resolve => require(['@/views/replacement/exchange_goods.vue'], resolve)
const returnGoods = resolve => require(['@/views/replacement/return_goods.vue'], resolve)
const returnDetails = resolve => require(['@/views/replacement/return_details.vue'], resolve)
const serviceType = resolve => require(['@/views/replacement/service_type.vue'], resolve)
const representations = resolve => require(['@/views/replacement/representations.vue'], resolve)
//养殖收获
const breedingHarvest = resolve => require(['@/views/breedingHarvest/breedingHarvest.vue'], resolve)
const eatChicken = resolve => require(['@/views/breedingHarvest/eatChicken.vue'], resolve)
// 订单管理
const allOrders = resolve => require(['@/views/orderManagement/allOrders.vue'], resolve)
const orderDetails = resolve => require(['@/views/orderManagement/orderDetails.vue'], resolve)
const commodityEvaluation = resolve => require(['@/views/orderManagement/commodityEvaluation.vue'], resolve)

//twh
const carConfirm = resolve => require(['@/components/car/carConfirm.vue'], resolve)
const carYes = resolve => require(['@/components/car/carYes.vue'], resolve)
const wxYes = resolve => require(['@/components/car/wxYes.vue'], resolve)
import zfbYes from '@/components/car/zfb.vue'
const newUser = resolve => require(['@/components/car/newUser.vue'], resolve)
const passWord = resolve => require(['@/components/car/passWord.vue'], resolve)
const Operator = resolve => require(['@/components/car/Operator.vue'], resolve)
const OPagreement = resolve => require(['@/components/car/OPagreement.vue'], resolve)
const newBusiness = resolve => require(['@/components/car/newBusiness.vue'], resolve)
const NBagreement = resolve => require(['@/components/car/NBagreement.vue'], resolve)
const zhuce = resolve => require(['@/components/car/zhuce.vue'], resolve)
// 微信注册绑定手机号码
const bindPhone = resolve => require(['@/views/bindPhone.vue'], resolve)
const about = resolve => require(['@/views/about.vue'], resolve)


export default new Router({
  // mode: 'history',
  routes: [{
    path: '/',
    name: '首页',
    component: Index
  },

  {
    path: '/map',
    name: 'map',
    component: map
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/bindPhone', // 微信注册绑定手机号码
    name: 'bindPhone',
    component: bindPhone
  },
  {
    path: '/register', // 注册后下载页
    name: 'register',
    component: register
  },
  {
    path: '/Ecomarket',
    name: 'Ecomarket',
    component: Ecomarket
  },
  //生态市场搜索页
  {
    path: '/ecosearch',
    name: 'ecosearch',
    component: ecosearch,
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  //一村一品搜索页
  {
    path: '/cunpinsearch',
    name: 'cunpinsearch',
    component: cunpinsearch,
    meta: {
      keepAlive: true // 需要被缓存
    }
  },

  //一村一品搜索页
  {
    path: '/shopCenter',
    name: 'shopCenter',
    component: shopCenter
  },
  //一村一品搜索页
  {
    path: '/representations',
    name: 'representations',
    component: representations
  },

  //添加编辑收获地址页
  {
    path: '/editAddress',
    name: 'editAddress',
    component: editAddress
  },
  //银行卡页
  {
    path: '/bankCard',
    name: 'bankCard',
    component: bankCard
  },

  //添加银行卡页
  {
    path: '/addCard',
    name: 'addCard',
    component: addCard
  },

  //选择卡页
  {
    path: '/chooseCar',
    name: 'chooseCar',
    component: chooseCar
  },
  //积分页
  {
    path: '/point',
    name: 'point',
    component: point
  },
  //提现成功页
  {
    path: '/getCashSuccess',
    name: 'getCashSuccess',
    component: getCashSuccess
  },
  //发现
  {
    path: '/found',
    name: 'found',
    component: found
  },
  {
    path: '/wx',
    name: 'wx',
    component: wx
  },
  //我的店铺
  {
    name: myshop,
    path: '/myshop',
    component: myshop
  },
  {
    path: '/indexS',
    name: '店铺首页',
    component: indexS,
    children: [{
      path: '/indexS/:tab',
      component: indexS
    }]
  },
  {
    path: '/author',
    component: indexS,
  },

  // 搜索页
  {
    path: '/category',
    name: 'category',
    component: Category
  },
  // 会员专区
  {
    path: '/member',
    name: 'member',
    component: member
  },
  // 热卖专区
  {
    path: '/hot',
    name: 'hot',
    component: hot
  },
  //一村一品
  {
    path: '/cunpin',
    name: 'cunpin',
    component: cunpin
  },
  //积分兑换
  {
    path: '/duihuan',
    name: 'duihuan',
    component: duihuan
  },

  // 个人资料
  {
    path: '/Userdata',
    name: 'Userdata',
    component: Userdata
  },

  // 创业基金
  {
    path: '/fund',
    name: 'fund',
    component: fund
  },


  // 基金详细
  {
    path: '/fundinfo',
    name: 'fundinfo',
    component: fundinfo
  },


  // 业绩页
  {
    path: '/achievement',
    name: 'achievement',
    component: achievement
  },

  // 红包页
  {
    path: '/redbag',
    name: 'redbag',
    component: redbag
  },
  // 余额页
  {
    path: '/remainder',
    name: 'remainder',
    component: remainder
  },

  // 提现页
  {
    path: '/getCash',
    name: 'getCash',
    component: getCash
  },

  // 钱包
  {
    name: 'wallet',
    path: '/wallet',
    component: wallet
  },


  //消息
  {
    path: '/msg',
    name: 'msg',
    component: msg,
  },
  //消息详情
  {
    path: '/msgInfo',
    name: 'msgInfo',
    component: msgInfo,
  },

  {
    path: '/shipping',
    name: '收货地址',
    component: shipping,
  },

  {
    path: '/Personaldata',
    name: '会员中心',
    component: Personaldata,
  },

  {
    path: '/car',
    name: '购物车页',
    component: Car
  },
  // twh
  {
    path: '/carConfirm',
    name: '确认订单',
    component: carConfirm
  },
  {
    path: '/caryes',
    name: '支付成功',
    component: carYes
  },
  {
    path: '/wxyes',
    name: '微信支付',
    component: wxYes
  },
  {
    path: '/zfbyes',
    name: '支付宝支付',
    component: zfbYes
  },
  {
    path: '/newuser',
    name: '用户注册',
    component: newUser
  },

  {
    path: '/zhuce',
    name: '注册协议',
    component: zhuce
  },
  {
    path: '/password',
    name: '找回密码',
    component: passWord
  },
  {
    path: '/operator',
    name: '运营商入驻',
    component: Operator
  },
  {
    path: '/OPagreement',
    name: '运营商入驻协议',
    component: OPagreement
  },
  {
    path: '/newbusiness',
    name: '商家入驻',
    component: newBusiness
  },
  {
    path: '/NBagreement',
    name: '商家入驻协议',
    component: NBagreement
  },

  {
    path: '/user',
    name: '用户页',
    component: User,
  },

  {
    path: "/UserErWeiMa",
    name: 'UserErWeiMa',
    component: UserErWeiMa
  },


  {
    path: '/Category2',
    name: 'Category2',
    component: Category2,
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/detail',
    name: '详情页',
    component: Detail
  },
  {
    path: '/detailNull',
    name: 'detailNull',
    component: detailNull
  },
  {
    path: '/login',
    name: '登录页',
    component: Login
  },
  {
    name: 'replacement',
    path: '/replacement',
    component: replacement
  },
  {
    name: 'exchange',
    path: '/exchange',
    component: exchange
  },
  {
    name: 'returnGoods',
    path: '/returnGoods',
    component: returnGoods
  },
  {
    name: 'returnDetails',
    path: '/returnDetails',
    component: returnDetails
  },
  {
    name: 'serviceType',
    path: '/serviceType',
    component: serviceType
  },
  {
    name: 'breedingHarvest',
    path: '/breedingHarvest',
    component: breedingHarvest
  },
  {
    name: 'eatChicken',
    path: '/eatChicken',
    component: eatChicken
  },
  {
    name: 'allOrders',
    path: '/allOrders',
    component: allOrders
  },
  {
    name: 'orderDetails',
    path: '/orderDetails',
    component: orderDetails
  },
  {
    name: 'commodityEvaluation',
    path: '/commodityEvaluation',
    component: commodityEvaluation
  }
  ]
})
