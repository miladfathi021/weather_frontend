import { CurrentWeather } from "@/services/weather/Current";

const state = {
  all: [],
};

const mutations = {
  SET_DATA(state, payload): void {
    Object.keys(payload).forEach((key) => {
      state[key] = payload[key];
    });
  },
};

const actions = {
  async setWeather(payload = null): Promise<void> {
    await CurrentWeather.getInstance().post("/current-weather", payload);
  },

  async getAll({ commit }): Promise<void> {
    await CurrentWeather.getInstance()
      .get("/current-weather")
      .then((response) => {
        commit("SET_DATA", { all: response.data });
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
