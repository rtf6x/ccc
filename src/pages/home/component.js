import {mapActions, mapState} from 'vuex';

import HeaderComponent from '../../components/header/component.vue';
import ChartComponent from '../../components/chart/component.vue';

export default {
  components: {
    'HeaderComponent': HeaderComponent,
    'ChartComponent': ChartComponent,
  },
  computed: mapState({
    currencies: state => state.currencies,
    currency_from: state => state.currency_from,
    currency_from_amount: state => state.currency_from_amount,
    currency_to: state => state.currency_to,
  }),
  methods: mapActions({
    loadCurrencies: 'loadCurrencies',
    changeCurrency_from: 'changeCurrency_from',
    changeCurrency_from_amount: 'changeCurrency_from_amount',
    changeCurrency_to: 'changeCurrency_to',
    changeCurrency_rotate: 'changeCurrency_rotate',
    onChangeCurrency_from(store, value){
      this.changeCurrency_from(value);
    },
    onChangeCurrency_to(store, value){
      this.changeCurrency_to(value);
    },
    changeCurrencies(store, from, to){
      this.changeCurrency_from(from);
      this.changeCurrency_to(to);
    },
    amount_plus(){
      this.changeCurrency_from_amount(this.currency_from_amount + 1);
    },
    amount_minus(){
      this.changeCurrency_from_amount(this.currency_from_amount > 1 ? this.currency_from_amount - 1 : this.currency_from_amount);
    },
  }),
  created() {
    this.loadCurrencies();
  },
};
