import _ from 'underscore';

export function composeThead({ config }) {
  return {
    attributes: {},
    trs: [{
      attributes: {},
      key: 'default',
      ths: _.chain(config.columns)
        .map(column => config.composeThs({ column, config }))
        .flatten()
        .compact()
        .value(),
    }],
  };
}