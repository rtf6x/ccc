export default {
  name: 'spinner',
  props: ['show'],
  serverCacheKey: props => props.show
};
