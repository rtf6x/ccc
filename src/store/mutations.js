import Vue from 'vue';

export default {
  currenciesLoaded(state, currencies) {
    state.currencies = currencies;
  },
  currencyPriceLoaded(state, currency) {
    if (currency.id === state.currency_selected_from) {
      state.currency_from = currency;
    }
    if (currency.id === state.currency_selected_to) {
      state.currency_to = currency;
    }
    Vue.set(state.currency_prices, currency.id, currency);
  },
  currencyHistoryLoaded(state, currency) {
    Vue.set(state.currency_histories, currency.id, currency.history.reverse().slice(0, 50).reverse());
  },
  currencyChanged_from(state, currency) {
    state.currency_selected_from = currency;
  },
  currencyChanged_from_amount(state, amount) {
    state.currency_from_amount = amount;
  },
  currencyChanged_to(state, currency) {
    state.currency_selected_to = currency;
  },
};
