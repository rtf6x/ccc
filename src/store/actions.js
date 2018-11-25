import fetch from 'isomorphic-fetch';

export default {
  loadCurrencies({commit, dispatch}) {
    return new Promise((resolve, reject) => {
      fetch('http://coincap.io/coins', {
        headers: {
          'Content-Type': 'application/json',
          'set-cookie': ''
        }
      }).then(response => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      }).then(response => {
        response.sort();
        commit('currenciesLoaded', response);
        dispatch('changeCurrency_from', response[0]);
        dispatch('changeCurrency_to', response[1]);
        resolve();
      }).catch(err => {
        reject(err);
      });
    });
  },

  loadCurrencyPrice({commit, dispatch, state}, cName) {
    return new Promise((resolve, reject) => {
      if (state.currency_prices[cName]) return resolve();
      dispatch('loadCurrencyHistory', cName);
      fetch(`http://coincap.io/page/${cName}`).then(response => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      }).then(response => {
        commit('currencyPriceLoaded', response);
        resolve();
      }).catch(err => {
        reject(err);
      });
    });
  },

  loadCurrencyHistory({commit, state}, cName) {
    return new Promise((resolve, reject) => {
      if (state.currency_prices[cName]) return resolve();
      fetch(`http://coincap.io/history/${cName}`).then(response => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      }).then(response => {
        if (response) commit('currencyHistoryLoaded', {id: cName, history: response.price});
        resolve();
      }).catch(err => {
        reject(err);
      });
    });
  },

  changeCurrency_from_amount({commit}, amount) {
    return new Promise((resolve) => {
      commit('currencyChanged_from_amount', amount);
      resolve();
    });
  },

  changeCurrency_from({commit, dispatch, state}, cName) {
    return new Promise((resolve) => {
      commit('currencyChanged_from', cName);
      if (state.currency_prices[cName]) {
        commit('currencyPriceLoaded', state.currency_prices[cName]);
        return resolve();
      }
      dispatch('loadCurrencyPrice', cName);
      resolve();
    });
  },

  changeCurrency_to({commit, dispatch, state}, cName) {
    return new Promise((resolve) => {
      commit('currencyChanged_to', cName);
      if (state.currency_prices[cName]) {
        commit('currencyPriceLoaded', state.currency_prices[cName]);
        return resolve();
      }
      dispatch('loadCurrencyPrice', cName);
      resolve();
    });
  },

  changeCurrency_rotate({dispatch, state}) {
    return new Promise((resolve) => {
      let to = state.currency_to.id;
      let from = state.currency_from.id;
      dispatch('changeCurrency_from', to);
      dispatch('changeCurrency_to', from);
      resolve();
    });
  },
};
