import { Options } from '@t/options';
import Plot from '@src/component/plot';
import Store from '@src/store/store';
import EventEmitter from '@src/eventEmitter';
import { deepMergedCopy } from '@src/helpers/utils';

let plot;

const seriesData = [
  { name: 'han', data: [1, 2], color: '#aaaaaa' },
  { name: 'cho', data: [4, 5], color: '#bbbbbb' },
];

const chartState = {
  chart: { width: 100, height: 100 },
  layout: {
    xAxis: { x: 10, y: 80, width: 80, height: 10 },
    yAxis: { x: 10, y: 10, width: 10, height: 80 },
    plot: { width: 80, height: 80, x: 10, y: 80 },
  },
  series: {
    area: {
      data: seriesData,
      seriesCount: seriesData.length,
      seriesGroupCount: seriesData[0].data.length,
    },
  },
  options: {
    series: {},
  },
  legend: {
    data: [
      { label: 'han', active: true, checked: true },
      { label: 'cho', active: true, checked: true },
    ],
  },
  categories: ['A', 'B'],
};

describe('plot grid lines', () => {
  beforeEach(() => {
    plot = new Plot({
      store: {} as Store<Options>,
      eventBus: new EventEmitter(),
    });
  });

  it('should be drawwn depending on the tick of the axis', () => {
    plot.render(chartState);
    expect(plot.models.plot).toEqual([]);
  });

  it('should be drawn on both sides, when using the center Y-axis', () => {
    plot.render(
      deepMergedCopy(chartState, {
        yCenterAxis: {
          visible: true,
        },
      })
    );
    expect(plot.models.plot).toEqual([]);
  });
});
