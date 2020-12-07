import { StoreModule } from '@t/store/store';
import { Size } from '@t/options';
import { getInitailSize } from '@src/helpers/utils';

const root: StoreModule = {
  name: 'root',
  // 파라메터로 data 초기 데이터도 받아야 한다.
  state: ({ options }) => ({
    chart: {
      ...options.chart,
      width: getInitailSize(options?.chart?.width),
      height: getInitailSize(options?.chart?.height),
    },
    fitToContainerSize: {
      width: options.chart?.width === 'auto',
      height: options.chart?.height === 'auto',
    },
    containerSize: {},
  }),
  action: {
    setChartSize({ state }, size: Size) {
      state.chart.width = size.width;
      state.chart.height = size.height;
    },
    initChartSize({ state }, containerEl: HTMLElement) {
      if (state.chart.width === 0 || state.chart.height === 0) {
        if (containerEl.parentNode) {
          const size = {
            width: containerEl.offsetWidth,
            height: containerEl.offsetHeight,
          };
          this.dispatch('setChartSize', size);
          this.dispatch('setContainerSize', size);
        } else {
          setTimeout(() => {
            const size = {
              width: containerEl.offsetWidth,
              height: containerEl.offsetHeight,
            };
            this.dispatch('setChartSize', size);
            this.dispatch('setContainerSize', size);
          }, 0);
        }
      }
    },
    setContainerSize({ state }, size: Size) {
      state.containerSize.width = size.width;
      state.containerSize.height = size.height;
    },
    setChartHeight({ state }, height: number) {
      state.chart.height = height;
    },
    setChartWidth({ state }, width: number) {
      state.chart.width = width;
    },
    setFitToContainerWidthFlag({ state }, widthFlag: boolean) {
      state.fitToContainerSize.width = widthFlag;
    },
    setFitToContainerHeightFlag({ state }, heightFlag: boolean) {
      state.fitToContainerSize.height = heightFlag;
    },
  },
};

export default root;
