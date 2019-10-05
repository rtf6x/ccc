import {mapState} from 'vuex';

export default {
  props: {
    cname: String,
    cid: String,
  },
  computed: mapState({
    currency_line(state) {
      if (!state.currency_histories[this.cid]) return;
      let minX = new Date().getTime();
      let maxX = 0;
      let minY = 99999999999999999;
      let maxY = 0;
      const minYpx = 140;
      const maxYpx = 10;
      const svgWidth = 238;
      const pointsCount = state.currency_histories[this.cid].length;
      const spaceBetweenPoints = svgWidth / pointsCount;
      let line = 'M 9.5,';

      state.currency_histories[this.cid].forEach(point => {
        point.priceUsd = Math.floor(point.priceUsd * 1000);
        if (point.priceUsd > maxX) maxX = point.priceUsd;
        if (point.priceUsd > maxY) maxY = point.priceUsd;
        if (point.priceUsd < minX) minX = point.priceUsd;
        if (point.priceUsd < minY) minY = point.priceUsd;
      });

      minY = minY - (minY / 10);
      maxY = maxY + (maxY / 10);

      state.currency_histories[this.cid].forEach((point, i) => {
        console.log('point', point.priceUsd);
        console.log('point', point);
        point.posX = (spaceBetweenPoints * i) + 10;
        point.posY = minYpx - ((minYpx - maxYpx) / 100 * (100 - (100 / ((maxY - minY) / (maxY - point.priceUsd)))));
        if (i === 0) {
          line += point.posY;
        } else {
          line += 'L' + point.posX + ',' + point.posY;
        }
      });
      return line;
    }
  }),
};
