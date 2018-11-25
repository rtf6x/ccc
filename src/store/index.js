import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      currencies: [],
      currency_prices: {},
      currency_histories: {},
      currency_from: {},
      currency_from_history: {},
      currency_from_amount: 1,
      currency_to: {},
      currency_to_history: {},
      currency_selected_from: '',
      currency_selected_to: '',
    },
    actions,
    mutations
  });
}
