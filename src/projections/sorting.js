import { decorate, find } from '../utils';

export default function sorting({
  composeTds,
}, { state = { sortBy: null }, dispatch }) {
  return {
    composeTds(td) {
      const { col, isHeader, tr: { section: { table } } } = td;
      const decorators = [];

      if (col) {
        const {
          sorting: {
            cols = [],
            $asc = null,
            $desc = null,
            onSort = () => {},
            reducer = (s = { sortBy: null }, { key }) => ({
              sortBy: key,
              direction: key === s.sortBy ?
                find(['asc', 'desc'], d => d !== s.direction) :
                'asc',
            }),
          } = {},
        } = table;

        const isSortable = !cols || cols.length === 0 || cols.indexOf(col.key) > -1;

        if (isSortable) {
          if (state.sortBy === col.key) {
            decorators.push({ $td: state.direction === 'asc' ? $asc : $desc });
          }

          if (isHeader) {
            decorators.push({
              events: {
                click: () => onSort(dispatch(reducer, col)),
              },
            });
          }
        }
      }

      return decorate(composeTds(td), {
        context: td,
        decorators,
        hasContent: true,
      });
    },
  };
}

sorting.scope = 'projection-grid-core.sorting';
