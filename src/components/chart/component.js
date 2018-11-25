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
      const pointsCount = 50;
      const spaceBetweenPoints = svgWidth / pointsCount;
      let line = 'M 9.5,';

      state.currency_histories[this.cid].forEach(point => {
        if (point[0] > maxX) maxX = point[0];
        if (point[1] > maxY) maxY = point[1];
        if (point[0] < minX) minX = point[0];
        if (point[1] < minY) minY = point[1];
      });

      minY = minY - (minY / 10);
      maxY = maxY + (maxY / 10);

      state.currency_histories[this.cid].forEach((point, i) => {
        point.posX = (spaceBetweenPoints * i) + 10;
        point.posY = minYpx - ((minYpx - maxYpx) / 100 * (100 - (100 / ((maxY - minY) / (maxY - point[1])))));
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
