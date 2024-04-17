import { createStore } from "vuex";

import router from "../router/router";
import { fetchData } from "../utils/api";

const store = createStore({
  state() {
    return {
      isError: false,
      siteId: "",
    };
  },
  mutations: {
    showError(state, isError) {
      state.isError = isError;
    },
    setSiteId(state, siteId) {
      state.siteId = siteId;
    },
  },
  actions: {
    async handleAuth({ state, commit }, inputId) {
      commit("setSiteId", inputId);
      if (state.siteId.length === 24) {
        try {
          const response = await fetchData(state.siteId);
          if (response && response.data.message === "ok") {
            localStorage.setItem("leadhit-site-id", state.siteId);
            router.push("/analytics");
          }
          commit("showError", false);
        } catch (err) {
          console.log(err);
        }
      } else {
        commit("showError", true);
      }
    },
  },
});

export default store;
