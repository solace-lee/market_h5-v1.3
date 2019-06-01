import Util from '../../util/common'
const state = {
  formimg:{},
  moneyimg:'',
  shopimg:''
}

const mutations = {
  getformimg (state,res) {
    state.formimg = res
  },
  getmoneyimg (state,res) {
    state.moneyimg = res
  },
  getshopimg (state,res) {
    state.shopimg = res
  }
}

export default {
  state,
  mutations
}