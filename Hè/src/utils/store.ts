import { createStore, Commit, Store } from 'vuex';

interface RootState {
  reportMonth: number;
  reportYear: number;
  badgeMonth: number;
  badgeYear: number;
}

const store = createStore<RootState>({
  state: {
    reportMonth: new Date().getMonth(), // Set to the previous month (0 - 11)
    reportYear: new Date().getFullYear(), // Set to the current year
    badgeMonth: new Date().getMonth(), // Set to the previous month (0 - 11)
    badgeYear: new Date().getFullYear(), // Set to the current year
  },
  mutations: {
    updateReportMonth(state: RootState, month: number) {
      state.reportMonth = month;
    },
    updateReportYear(state: RootState, year: number) {
      state.reportYear = year;
    },
    updateBadgeMonth(state: RootState, month: number) {
      state.badgeMonth = month;
    },
    updateBadgeYear(state: RootState, year: number) {
      state.badgeYear = year;
    },
  },
  actions: {
    setReportMonth({ commit }: { commit: Commit }, month: number) {
      commit('updateReportMonth', month);
    },
    setReportYear({ commit }: { commit: Commit }, year: number) {
      commit('updateReportYear', year);
    },
    setBadgeMonth({ commit }: { commit: Commit }, month: number) {
      commit('updateBadgeMonth', month);
    },
    setBadgeYear({ commit }: { commit: Commit }, year: number) {
      commit('updateBadgeYear', year);
    },
  },
  getters: {
    getReportMonth: (state: RootState) => state.reportMonth,
    getReportYear: (state: RootState) => state.reportYear,
    getBadgeMonth: (state: RootState) => state.badgeMonth,
    getBadgeYear: (state: RootState) => state.badgeYear,
  },
});

export default store;
