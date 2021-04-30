import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import current from "@/store/weather/Current";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    current,
  },
});
